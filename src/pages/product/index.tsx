/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { type FC, useEffect, useMemo } from "react";
import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { StatsProduct } from "./StatsProduct";

import { StructureOfIncomeChart } from "../dashboard/StructureOfIncomeChart";
// import { useArticleReport, useMainReport } from "@/api/report";
import { useArticleReport, useArticleV2Report } from "@/api/report";
import type { ReportRequest } from "@/api/report/types";
import { useParams, useSearchParams } from "react-router-dom";

import ProductInfo from "./ProductInfo";
import ProductAvailability from "./ProductAvailability";
import { StatTable } from "./StatTable";
import { getPrevInterval } from "@/helpers/date";
import { useProductStatsData } from "./useProductStatsData";
import { Filters } from "./Filters";
import { ProductSkeleton } from "./ProductSkeleton";
import { SizesChart } from "./SizesChart";
import { DisplayDateRange } from "@/components/DisplayDateRange";
import { MainChartNew } from "../dashboard/MainChartNew";
import { Accordion } from "@/components/Accordion";

const Product: FC = function () {
  const { entityId } = useParams<{
    entityId: string;
  }>();
  if (!entityId) {
    throw new Error();
  }

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
        ? getPrevInterval(result.dateFrom!, result.dateTo!)
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
  //const mainReportRequest = useMainReport(params);

  const articleRequest = useArticleReport(+entityId, params);
  const articleV2Request = useArticleV2Report(+entityId, params);
  console.log("🚀 ~ articleV2Request:", articleV2Request);
  const prevArticleRequest = useArticleReport(+entityId, prevParams);

  const statsData = useProductStatsData(
    articleRequest.data,
    prevArticleRequest.data,
  );

  if (articleRequest.isLoading) {
    return (
      <NavbarSidebarLayout>
        <ProductSkeleton />
      </NavbarSidebarLayout>
    );
  }

  return (
    <NavbarSidebarLayout>
      <div className="flex flex-col gap-4 px-4 pt-6">
        {articleRequest.data && (
          <ProductInfo product={articleRequest.data.productData} />
        )}
        <Filters params={params} setSearchParams={setSearchParams} />
        <DisplayDateRange dateFrom={params.dateFrom} dateTo={params.dateTo} />
        {statsData && <StatsProduct data={statsData} />}
        <Accordion title="Период в графике" id="chart-period-of-product">
          <MainChartNew
            data={articleRequest.data?.chart ?? []}
            prevData={prevArticleRequest.data?.chart}
          />
        </Accordion>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {articleRequest.data?.byBarcode && (
            <Accordion title="Размеры по прибыли" id="chart-profit-sizes">
              <SizesChart data={Object.values(articleRequest.data.byBarcode)} />
            </Accordion>
          )}
          <Accordion title="Структура выручки" id="chart-product-availability">
            <StructureOfIncomeChart />
          </Accordion>
        </div>
        {articleRequest.data?.stocks && (
          <Accordion
            title="Наличие товара на складах"
            id="chart-availability-warehouses"
          >
            <ProductAvailability stocks={articleRequest.data?.stocks} />
          </Accordion>
        )}
        {articleRequest.data?.byBarcode && (
          <StatTable
            image={articleRequest.data.productData.image || null}
            items={Object.values(articleRequest.data.byBarcode)}
            prevItems={
              prevArticleRequest.data?.byBarcode
                ? Object.values(prevArticleRequest.data.byBarcode)
                : undefined
            }
          />
        )}
        {/*<SizeComparison />*/}

        {/*<ComparisonByOption />*/}
      </div>
    </NavbarSidebarLayout>
  );
};

export default Product;
