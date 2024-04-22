/* eslint-disable jsx-a11y/anchor-is-valid */
import { type FC, useEffect, useMemo } from "react";
import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useMainReport, useReportFilterAggregation } from "@/api/report";
import type {
  ArticleFilter,
  ReportFilterAggregationResponse,
  ReportRequest,
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
import { MainChart } from "@/pages/dashboard/MainChart";
import { format, parse, sub } from "date-fns";
import { Spinner } from "flowbite-react";

const mapQueryParamsToString = (
  reportRequest: ReportRequest,
): URLSearchParams => {
  const urlSearchParams = new URLSearchParams();

  for (const key in reportRequest) {
    if (Object.prototype.hasOwnProperty.call(reportRequest, key)) {
      const value = reportRequest[key as keyof ReportRequest];

      if (typeof value !== "string" && value !== null) {
        urlSearchParams.set(key, JSON.stringify(value));
      } else {
        urlSearchParams.set(key, value);
      }
    }
  }

  return urlSearchParams;
};

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
    const result: ReportRequest = {
      filters: {},
    };
    const dateFrom = searchParams.get("dateFrom") ?? defaultDates?.dateFrom;
    if (dateFrom) {
      result.dateFrom = dateFrom;
    }

    const dateTo = searchParams.get("dateTo") ?? defaultDates?.dateTo;
    if (dateTo) {
      result.dateTo = dateTo;
    }

    const category = searchParams.get("category");
    if (category) {
      result.category = category;
    }

    const brand = searchParams.get("brand");
    if (brand) {
      result.brand = brand;
    }

    const article = searchParams.get("article");
    if (article && result.filters) {
      result.filters["article"] = JSON.parse(article) as ArticleFilter;
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

  const mainReportRequest = useMainReport(params, {
    enabled: !!reportFilterAggregatedRequest.data,
  });
  const prevMainReportRequest = useMainReport(prevParams, {
    enabled: !!reportFilterAggregatedRequest.data,
  });
  const statsData = useDashBoardStatsData(
    mainReportRequest.data,
    prevMainReportRequest.data,
  );

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

  return (
    <NavbarSidebarLayout>
      <ProfileSubscriptionInfo>
        {!mainReportRequest.data?.stats ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-4 px-4 pt-6">
            <Filters params={params} setSearchParams={setSearchParams} />
            {statsData && <StatsDashBoard data={statsData} />}
            <MainChart
              data={mainReportRequest.data?.chart ?? []}
              prevData={prevMainReportRequest.data?.chart}
            />
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <TopProductsChart
                data={mainReportRequest.data?.topFiveProducts}
              />
              <StructureOfIncomeChart />
            </div>
            {mainReportRequest.data?.byProduct && (
              <StatTable
                redirectFilters={filtersForRedirect}
                items={mainReportRequest.data?.byProduct}
                prevItems={prevMainReportRequest.data?.byProduct}
              />
            )}
          </div>
        )}
      </ProfileSubscriptionInfo>
    </NavbarSidebarLayout>
  );
};

export default DashboardPage;
