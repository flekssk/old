import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { Breadcrumb, Button, Card } from "flowbite-react";
import { useEffect, useMemo, useState, type FC } from "react";
import { HiHome } from "react-icons/hi";
import ProfileSubscriptionInfo from "@/components/ProfileSubscriptionInfo";
import { useArticleList } from "@/api/wb";
import { usePagination } from "@/hooks/usePagination";
import { useSearchParams } from "react-router-dom";
import { CostTable } from "./CostTable";
import { useIncomeCost } from "@/api/income";
import type { ArticleWithCost } from "./type";
import { Pagination } from "@/components/Pagination";

export const Cost: FC = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [localPagination, setLocalPagination] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 20,
  });

  const articlesRequest = useArticleList({
    page: localPagination.page,
    limit: localPagination.limit,
  });

  const pagination = usePagination({
    searchParam,
    setSearchParam,
    total: articlesRequest.data?.pagination.total,
  });

  useEffect(() => {
    setLocalPagination({
      page: pagination.currentPage,
      limit: pagination.limit,
    });
  }, [pagination.currentPage, pagination.limit]);

  const nmIds = (
    articlesRequest.data?.items?.map((article) => article.nmId) ?? []
  ).join(",");

  const costRequest = useIncomeCost(
    {
      nmIds,
    },
    {
      enabled: !!nmIds.length,
    },
  );

  const articlesWithCost = useMemo<ArticleWithCost[]>(() => {
    return (
      articlesRequest.data?.items?.map((article) => ({
        ...article,
        cost: costRequest.data?.items?.find(
          (cost) => cost.nm_id.toString() === article.nmId.toString(),
        ),
      })) ?? []
    );
  }, [articlesRequest.data, costRequest.data]);

  const loading = costRequest.isLoading || articlesRequest.isLoading;

  return (
    <NavbarSidebarLayout>
      <ProfileSubscriptionInfo>
        <div className="mb-6 grid grid-cols-1 gap-y-6 dark:border-gray-700 dark:bg-gray-900 xl:grid-cols-2 xl:gap-4">
          <div className="col-span-full">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="/">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Себестоимость</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Card>
          <CostTable
            articles={articlesWithCost ?? []}
            refresh={costRequest.refetch}
            loading={loading}
          />
          <Pagination {...pagination} showLimitSelector={true} />
        </Card>
      </ProfileSubscriptionInfo>
    </NavbarSidebarLayout>
  );
};
