/* eslint-disable jsx-a11y/anchor-is-valid */
import { type FC, useMemo } from "react";
import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useMainReportV2, useReportFilterAggregation } from "@/api/report";
import type {
  ArticleFilter,
  NumberFilter,
  ReportFilterAggregationResponse,
  ReportRequest,
  TextFilter,
} from "@/api/report/types";
import { useSearchParams } from "react-router-dom";
import { StatTable } from "@/pages/dashboard/StatTable";
import { Filters } from "@/pages/dashboard/Filters";
import { StatsDashBoard } from "@/pages/dashboard/StatsDashBoard";
import { TopProductsChart } from "@/pages/dashboard/TopProductsChart";
import { StructureOfIncomeChart } from "@/pages/dashboard/StructureOfIncomeChart";
import ProfileSubscriptionInfo from "@/components/ProfileSubscriptionInfo";
import { DATE_FORMAT, getPrevInterval } from "@/helpers/date";
import { useDashBoardStatsData } from "@/pages/dashboard/useDashBoardStatsData";
import { format, parse, sub } from "date-fns";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { parse as qsParse } from "qs";
import { useArticleList } from "@/api/wb";
import { DisplayDateRange } from "@/components/DisplayDateRange";
import { MainChartNew } from "./MainChartNew";
import { Accordion } from "@/components/Accordion";
import { exportMainReportV2 } from "@/api/report/api";
import { downloadFromBinary } from "@/helpers/common";
import { toast } from "react-toastify";

function getDefaultDates(
  data?: ReportFilterAggregationResponse,
): { dateFrom: string; dateTo: string } | null {
  if (!data || !data.date?.maxDate || !data.date?.minDate) {
    return null;
  }

  return {
    dateFrom: format(
      sub(
        parse(data.date?.maxDate ?? "", DATE_FORMAT.SERVER_DATE, new Date()),
        {
          days: 6,
        },
      ),
      DATE_FORMAT.SERVER_DATE,
    ),
    dateTo: data.date?.maxDate ?? "",
  };
}

const DashboardPage: FC = function () {
  const reportFilterAggregatedRequest = useReportFilterAggregation();

  const [searchParams, setSearchParams] = useSearchParams({});

  const { params, prevParams } = useMemo(() => {
    const defaultDates = getDefaultDates(reportFilterAggregatedRequest.data);
    const result: ReportRequest = {};

    const dateFrom = searchParams.get("dateFrom") ?? defaultDates?.dateFrom;
    if (dateFrom) {
      result.dateFrom = dateFrom;
    }

    const dateTo = searchParams.get("dateTo") ?? defaultDates?.dateTo;
    if (dateTo) {
      result.dateTo = dateTo;
    }

    const orderBy = searchParams.get("orderBy");
    if (orderBy) {
      result.orderBy = qsParse(orderBy) as { field: string; direction: string };
    }

    const filters = searchParams.get("filters");

    if (filters) {
      result.filters = qsParse(filters) as Record<
        string,
        NumberFilter | ArticleFilter | TextFilter
      >;
    }

    const limit = searchParams.get("limit");
    if (limit) {
      result.limit = Number(limit);
    }

    const page = searchParams.get("page");
    if (page) {
      result.page = Number(page);
    }

    const prevInterval =
      result.dateFrom && result.dateTo
        ? getPrevInterval(result.dateFrom, result.dateTo)
        : null;

    const prevParams = prevInterval
      ? {
          ...result,
          dateFrom: prevInterval.start,
          dateTo: prevInterval.end,
        }
      : { ...result };

    return { params: result, prevParams };
  }, [searchParams, reportFilterAggregatedRequest.data]);

  const mainReportRequest = useMainReportV2(params, {
    enabled: !!reportFilterAggregatedRequest.data,
    placeholderData: (previousData) => previousData,
  });

  const handleExportData = async (visibleColumns: string[]) => {
    try {
      const { data } = await exportMainReportV2({
        ...params,
        page: 1,
        limit: 1000,
        xls: true,
        columns: visibleColumns,
      });

      downloadFromBinary(data, `report_${params.dateFrom}_${params.dateTo}`);
      toast.success("Файл успешно загружен");
    } catch {
      toast.error("Произошла ошибка при загрузке файла");
    }
  };

  const prevMainReportRequest = useMainReportV2(prevParams, {
    enabled: !!reportFilterAggregatedRequest.data,
  });

  const statsData = useDashBoardStatsData(
    mainReportRequest.data,
    prevMainReportRequest.data,
  );

  const articleList = useArticleList({
    limit: 500,
  });

  const filtersForRedirect = useMemo(() => {
    const urlSearchParams = new URLSearchParams();
    if (params.dateFrom) {
      urlSearchParams.set("dateFrom", params.dateFrom);
    }
    if (params.dateTo) {
      urlSearchParams.set("dateTo", params.dateTo);
    }

    return urlSearchParams.toString();
  }, [params]);

  if (!mainReportRequest.data?.stats) {
    return (
      <NavbarSidebarLayout>
        <ProfileSubscriptionInfo>
          <DashboardSkeleton />
        </ProfileSubscriptionInfo>
      </NavbarSidebarLayout>
    );
  }

  return (
    <NavbarSidebarLayout>
      <ProfileSubscriptionInfo>
        <div className="flex flex-col gap-4 px-4 pt-6">
          <Filters
            params={params}
            setSearchParams={setSearchParams}
            articles={articleList.data?.items}
          />
          <DisplayDateRange dateFrom={params.dateFrom} dateTo={params.dateTo} />
          {statsData && <StatsDashBoard data={statsData} />}
          <Accordion title="Период в графике" id="chart-period">
            <MainChartNew
              data={mainReportRequest.data?.chart ?? []}
              prevData={prevMainReportRequest.data?.chart}
            />
          </Accordion>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <Accordion
              title="Топ 5 маржинальных товаров"
              id="chart-top-products"
            >
              <TopProductsChart
                data={mainReportRequest.data?.topFiveProducts}
              />
            </Accordion>
            <Accordion title="Структура выручки" id="chart-structure">
              {mainReportRequest.data.revenueStructure ? (
                <StructureOfIncomeChart
                  structure={mainReportRequest.data.revenueStructure}
                />
              ) : null}
            </Accordion>
          </div>
          {mainReportRequest.data?.byProduct && (
            <StatTable
              onExport={handleExportData}
              redirectFilters={filtersForRedirect}
              pagination={mainReportRequest.data?.pagination}
              items={mainReportRequest.data?.byProduct}
              prevItems={prevMainReportRequest.data?.byProduct}
            />
          )}
        </div>
      </ProfileSubscriptionInfo>
    </NavbarSidebarLayout>
  );
};

export default DashboardPage;
