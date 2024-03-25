/* eslint-disable jsx-a11y/anchor-is-valid */
import { type FC, useEffect, useMemo, useState } from "react";
import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { dateFilters, Filters } from "./Filters";
import { Stats } from "./Stats";
import { MainChart } from "./MainChart";
import { TopProductsChart } from "./TopProductsChart";
import { StructureOfIncomeChart } from "./StructureOfIncomeChart";
import { StatTable } from "./StatTable";
import { useMainReport } from "@/api/report";
import type { SelectOption } from "@/components/Select";
import type { ReportRequest } from "@/api/report/types";
import { useSearchParams } from "react-router-dom";
import { getLabelDateFilter, getValueDateFilter } from "@/utils/dashboard";

const DashboardPage: FC = function () {
  const [searchParams, setSearchParams] = useSearchParams({});

  const [filterState, setFilterState] = useState<
    Record<string, string | SelectOption>
  >({
    dateFilter: {
      value: getValueDateFilter(searchParams) || "lastWeek",
      label: getLabelDateFilter(searchParams) || "Последняя неделя",
    },
    category: {
      value: searchParams.get("category") || "",
      label: searchParams.get("category") || "",
    },
    brand: {
      value: searchParams.get("brand") || "",
      label: searchParams.get("brand") || "",
    },
  });

  const params = useMemo<ReportRequest>(() => {
    const result: ReportRequest = {};
    if (filterState["dateFilter"]) {
      const filterValue = dateFilters.find(
        (item) =>
          item.value === (filterState["dateFilter"] as SelectOption)?.value,
      );

      if (filterValue && filterValue.dateFrom && filterValue.dateTo) {
        result.dateFrom = filterValue.dateFrom;
        result.dateTo = filterValue.dateTo;
      } else {
        result.dateFrom = searchParams.get("dateFrom") as string;
        result.dateTo = searchParams.get("dateTo") as string;
      }
    }

    (filterState["category"] as SelectOption).value
      ? (result.category = (filterState["category"] as SelectOption)
          ?.value as string)
      : "";

    (filterState["brand"] as SelectOption).value
      ? (result.brand = (filterState["brand"] as SelectOption)?.value as string)
      : "";

    return result;
  }, [filterState]);

  useEffect(() => {
    setSearchParams(params as string);
  }, [params]);

  const mainReportRequest = useMainReport(params);

  return (
    <NavbarSidebarLayout>
      <div className="flex flex-col gap-4 px-4 pt-6">
        <Filters
          filterState={filterState}
          setFilterState={setFilterState}
          searchParams={searchParams}
        />
        <Stats />
        <MainChart data={mainReportRequest.data?.chart ?? []} />
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <TopProductsChart />
          <StructureOfIncomeChart />
        </div>
        {mainReportRequest.data?.byProduct ? (
          <StatTable items={mainReportRequest.data?.byProduct} />
        ) : null}
      </div>
    </NavbarSidebarLayout>
  );
};

export default DashboardPage;
