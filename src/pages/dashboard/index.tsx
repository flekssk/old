/* eslint-disable jsx-a11y/anchor-is-valid */
import { type FC, useEffect, useMemo } from "react";
import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
// import { useArticleReport, useMainReport } from "@/api/report";
import { useMainReport } from "@/api/report";
import type { ReportRequest } from "@/api/report/types";
import { useSearchParams } from "react-router-dom";
import { StatTable } from "@/pages/dashboard/StatTable";
import { Filters } from "@/pages/dashboard/Filters";
import { StatsDashBoard } from "@/pages/dashboard/StatsDashBoard";
import { TopProductsChart } from "@/pages/dashboard/TopProductsChart";
import { StructureOfIncomeChart } from "@/pages/dashboard/StructureOfIncomeChart";
import ProfileSubscriptionInfo from "@/components/ProfileSubscriptionInfo";
import { getPrevInterval } from "@/helpers/date";
import { useDashBoardStatsData } from "@/pages/dashboard/useDashBoardStatsData";
import { MainChart } from "@/pages/dashboard/MainChart";

const DashboardPage: FC = function () {
  const [searchParams, setSearchParams] = useSearchParams({});

  const { params, prevParams } = useMemo(() => {
    const result: ReportRequest = {};
    const dateFrom = searchParams.get("dateFrom");
    if (dateFrom) {
      result.dateFrom = dateFrom;
    }

    const dateTo = searchParams.get("dateTo");
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

    // todo update default dateFrom
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
  }, [searchParams]);

  useEffect(() => {
    setSearchParams(params as string);
  }, [params]);

  const mainReportRequest = useMainReport(params);
  const prevMainReportRequest = useMainReport(prevParams);
  const statsData = useDashBoardStatsData(
    mainReportRequest.data,
    prevMainReportRequest.data,
  );

  return (
    <NavbarSidebarLayout>
      <ProfileSubscriptionInfo>
        {!mainReportRequest.data?.stats ? (
          <div>NO DATA</div>
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
            {mainReportRequest.data?.byProduct ? (
              <StatTable items={mainReportRequest.data?.byProduct} />
            ) : null}
          </div>
        )}
      </ProfileSubscriptionInfo>
    </NavbarSidebarLayout>
  );
};

export default DashboardPage;
