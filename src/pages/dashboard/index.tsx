/* eslint-disable jsx-a11y/anchor-is-valid */
import { type FC, useEffect, useMemo } from "react";
import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Filters } from "./Filters";
import { Stats } from "./Stats";
import { MainChart } from "./MainChart";
import { TopProductsChart } from "./TopProductsChart";
import { StructureOfIncomeChart } from "./StructureOfIncomeChart";
import { StatTable } from "./StatTable";
// import { useArticleReport, useMainReport } from "@/api/report";
import { useMainReport } from "@/api/report";
import type { ReportRequest } from "@/api/report/types";
import { useSearchParams } from "react-router-dom";

const DashboardPage: FC = function () {
  const [searchParams, setSearchParams] = useSearchParams({});

  const params = useMemo<ReportRequest>(() => {
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

    return result;
  }, [searchParams]);

  useEffect(() => {
    setSearchParams(params as string);
  }, [params]);

  const mainReportRequest = useMainReport(params);

  // const articleRequest = useArticleReport(5);

  return (
    <NavbarSidebarLayout>
      <div className="flex flex-col gap-4 px-4 pt-6">
        <Filters params={params} setSearchParams={setSearchParams} />
        <Stats />
        {/*<MainChart data={mainReportRequest.data?.chart ?? []} />*/}
        <MainChart />
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <TopProductsChart />
          <StructureOfIncomeChart />
        </div>
        {mainReportRequest.data?.byProduct ? (
          /*<StatTable items={mainReportRequest.data?.byProduct} />*/
          <StatTable items={mainReportRequest.data?.byProduct} />
        ) : null}
      </div>
    </NavbarSidebarLayout>
  );
};

export default DashboardPage;
