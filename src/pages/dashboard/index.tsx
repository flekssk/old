/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from "react";
import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Filters } from "./Filters";
import { Stats } from "./Stats";
import { MainChart } from "./MainChart";
import { TopProductsChart } from "./TopProductsChart";
import { StructureOfIncomeChart } from "./StructureOfIncomeChart";
import { StatTable } from "./StatTable";

const DashboardPage: FC = function () {
  return (
    <NavbarSidebarLayout>
      <div className="flex flex-col gap-4 px-4 pt-6">
        <Filters />
        <Stats />
        <MainChart />
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <TopProductsChart />
          <StructureOfIncomeChart />
        </div>
        <StatTable />
      </div>
    </NavbarSidebarLayout>
  );
};

export default DashboardPage;
