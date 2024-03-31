/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { type FC, useEffect, useMemo } from "react";
import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Stats } from "../dashboard/Stats";
import { MainChart } from "../dashboard/MainChart";
import { TopProductsChart } from "../dashboard/TopProductsChart";
import { StructureOfIncomeChart } from "../dashboard/StructureOfIncomeChart";
import { StatTable } from "../dashboard/StatTable";
// import { useArticleReport, useMainReport } from "@/api/report";
import { useMainReport } from "@/api/report";
import type { ReportRequest } from "@/api/report/types";
import { useParams, useSearchParams } from "react-router-dom";
import { Filters } from "../dashboard/Filters";
import ProductInfo from "./ProductInfo";
import { mockData } from "@/data/table";
import ProductAvailability from "./ProductAvailability";
import SizeComparison from "./SizeComparison";
import ComparisonByOption from "./ComparisonByOption";

const Product: FC = function () {
  const { entityId } = useParams<{
    entityId: string;
  }>();
  if (!entityId) {
    throw new Error();
  }

  const product = useMemo(() => {
    return mockData[+entityId];
  }, [entityId]);

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
        <ProductInfo product={product!} />
        <Filters params={params} setSearchParams={setSearchParams} />
        <Stats />
        {/*<MainChart data={mainReportRequest.data?.chart ?? []} />*/}
        <MainChart />
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <TopProductsChart />
          <StructureOfIncomeChart />
        </div>
        <ProductAvailability />
        {mainReportRequest.data?.byProduct ? (
          /*<StatTable items={mainReportRequest.data?.byProduct} />*/
          <StatTable />
        ) : null}
        <SizeComparison />
        {mainReportRequest.data?.byProduct ? (
          /*<StatTable items={mainReportRequest.data?.byProduct} />*/
          <StatTable />
        ) : null}
        <ComparisonByOption />
      </div>
    </NavbarSidebarLayout>
  );
};

export default Product;
