/* eslint-disable jsx-a11y/anchor-is-valid */
import { type FC, useMemo, useEffect } from "react";
import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import {
  useMainReport,
  useMainReportV2,
  useReportFilterAggregation,
} from "@/api/report";
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

    const category = searchParams.get("category");
    if (category) {
      result.category = category;
    }

    const brand = searchParams.get("brand");
    if (brand) {
      result.brand = brand;
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

  const mainReportRequest = useMainReport(params, {
    enabled: !!reportFilterAggregatedRequest.data,
  });

  const mainReportRequestV2 = useMainReportV2(params, {
    enabled: !!reportFilterAggregatedRequest.data,
  });

  const compareFields = [
    "realisation",
    "sales",
    "toTransfer",
    "returns",
    "costOfSales",
    "fines",
    "compensationForSubstitutedGoods",
    "reimbursementOfTransportationCosts",
    "paymentForMarriageAndLostGoods",
    "logistics",
    "rejectionsAndReturns",
    "totalSales",
    "tax",
    "profit",
    "profitability",
    "ordersCount",
    "returnsCount",
    "salesCount",
    "refunds",
    "storage",
    "advertisingExpense",
    "commission",
    "cost",
    "averagePriceBeforeSPP",
    "averageLogisticsCost",
    "averageProfitPerPiece",
    "profitability",
    "marginality",
    "roi",
    "averageRedemption",
    "drr",
    "shareInTotalRevenue",
  ];
  useEffect(() => {
    if (mainReportRequestV2.data && mainReportRequest.data) {
      mainReportRequest.data.byProduct.forEach((item) => {
        const nmId = item.article;
        const sameItem = mainReportRequestV2.data.byProduct.find(
          (el) => (el as any).article.toString() === nmId.toString(),
        );
        console.log(
          "🚀 ~ mainReportRequest.data.byProduct.forEach ~ sameItem:",
          sameItem,
          nmId,
          mainReportRequestV2.data.byProduct,
        );

        if (sameItem) {
          console.log(`item diff: ${nmId} \n`);
          compareFields.forEach((field) => {
            console.log(
              // @ts-ignore asd
              `${field} : ${sameItem[field]}, ${item[field]} ${sameItem[field] - item[field]} \n`,
            );
          });
        }
      });
    }
  }, [mainReportRequestV2.data, mainReportRequest.data]);

  const prevMainReportRequest = useMainReport(prevParams, {
    enabled: !!reportFilterAggregatedRequest.data,
  });

  const statsData = useDashBoardStatsData(
    mainReportRequest.data,
    prevMainReportRequest.data,
  );

  const articleList = useArticleList();

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

  console.log(
    "by products ",
    mainReportRequest,
    mainReportRequest?.data?.byProduct,
  );
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
              <StructureOfIncomeChart />
            </Accordion>
          </div>
          {mainReportRequest.data?.byProduct && (
            <StatTable
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
