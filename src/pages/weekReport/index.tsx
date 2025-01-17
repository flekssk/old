/* eslint-disable jsx-a11y/anchor-is-valid */
import { type FC, useMemo } from "react";
import "svgmap/dist/svgMap.min.css";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useWeekReport } from "@/api/report";
import type {
  ArticleFilter,
  NumberFilter,
  TextFilter,
  WeekReportRequest,
} from "@/api/report/types";
import { useSearchParams } from "react-router-dom";
import { StatTable } from "@/pages/weekReport/StatTable";
import { Filters } from "@/pages/weekReport/Filters";
import { ReportSkeleton } from "@/pages/weekReport/ReportSkeleton";
import ProfileSubscriptionInfo from "@/components/ProfileSubscriptionInfo";

import { parse as qsParse } from "qs";
import { useArticleList } from "@/api/wb";
import { format, parse } from "date-fns";
import { DATE_FORMAT } from "@/helpers/date";

const WeekReportPage: FC = function () {
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

    const accountUid = searchParams.get("accountUid");
    if (accountUid) {
      result.accountUid = accountUid;
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

  const mainReportRequest = useWeekReport(params, {
    enabled: true,
    placeholderData: (previousData) => previousData,
  });

  const articleList = useArticleList();
  const byWeekData = useMemo(() => {
    if (!mainReportRequest.data?.byWeek) {
      return null;
    }
    return mainReportRequest.data.byWeek.map((item) => ({
      ...item,
      startWeek: format(
        parse(item.startWeek, DATE_FORMAT.SERVER_DATE_TIME, new Date()),
        DATE_FORMAT.SERVER_DATE,
      ),
    }));
  }, [mainReportRequest.data?.byWeek]);

  if (!byWeekData) {
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
          <h3 className="text-2xl">Отчет по неделям</h3>
          <Filters
            params={params}
            setSearchParams={setSearchParams}
            articles={articleList.data?.items}
          />

          {byWeekData && <StatTable items={byWeekData} />}
        </div>
      </ProfileSubscriptionInfo>
    </NavbarSidebarLayout>
  );
};

export default WeekReportPage;
