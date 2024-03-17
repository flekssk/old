/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, type FC, useMemo } from "react";
import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Filters, dateFilters } from "./Filters";
import { Stats } from "./Stats";
import { MainChart } from "./MainChart";
import { TopProductsChart } from "./TopProductsChart";
import { StructureOfIncomeChart } from "./StructureOfIncomeChart";
import { StatTable } from "./StatTable";
import { useMainReport } from "@/api/report";
import type { SelectOption } from "@/components/Select";
import type { ReportRequest } from "@/api/report/types";

const DashboardPage: FC = function () {
  const [filterState, setFilterState] = useState<
    Record<string, string | SelectOption>
  >({
    dateFilter: { value: "lastWeek", label: "Последняя неделя" },
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
      }
    }
    return result;
  }, [filterState]);

  const mainReportRequest = useMainReport(params);

  return (
    <NavbarSidebarLayout>
      <div className="flex flex-col gap-4 px-4 pt-6">
        <Filters filterState={filterState} setFilterState={setFilterState} />
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
