/* eslint-disable jsx-a11y/anchor-is-valid */
import { type FC, useMemo } from "react";
import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { usePnLReport, useWeekReport } from "@/api/report";
import type {
  ArticleFilter,
  NumberFilter,
  TextFilter,
  WeekReportRequest,
} from "@/api/report/types";
import { useSearchParams } from "react-router-dom";
import { StatTable } from "@/pages/profitAndLoss/StatTable";
import { Filters } from "@/pages/weekReport/Filters";
import { ReportSkeleton } from "@/pages/weekReport/ReportSkeleton";
import ProfileSubscriptionInfo from "@/components/ProfileSubscriptionInfo";

import { parse as qsParse } from "qs";
import { useArticleList } from "@/api/wb";

const ProfitAndLossPage: FC = function () {
  const [searchParams, setSearchParams] = useSearchParams({});

  const params = useMemo(() => {
    const result: WeekReportRequest = {};

    const category = searchParams.get("category");
    if (category) {
      result.category = category;
    }

    const brand = searchParams.get("brand");
    if (brand) {
      result.brand = brand;
    }

    const filters = searchParams.get("filters");

    if (filters) {
      result.filters = qsParse(filters) as Record<
        string,
        NumberFilter | ArticleFilter | TextFilter
      >;
    }

    return result;
  }, [searchParams]);

  const pnlRequest = usePnLReport({});

  const articleList = useArticleList();

  if (!pnlRequest.data?.byMonth) {
    return (
      <NavbarSidebarLayout>
        <ProfileSubscriptionInfo>
          <ReportSkeleton />
        </ProfileSubscriptionInfo>
      </NavbarSidebarLayout>
    );
  }

  return (
    <NavbarSidebarLayout>
      <ProfileSubscriptionInfo>
        <div className="flex flex-col gap-4 px-4 pt-6">
          <h3 className="text-2xl">Отчет о пребылях и убытках</h3>
          <Filters
            params={params}
            setSearchParams={setSearchParams}
            articles={articleList.data?.items}
          />

          {pnlRequest.data?.byMonth && (
            <StatTable items={pnlRequest.data.byMonth} />
          )}
        </div>
      </ProfileSubscriptionInfo>
    </NavbarSidebarLayout>
  );
};

export default ProfitAndLossPage;
