import {
  useIncomeCostSetBatchMutation,
  useIncomeSyncMutation,
  useInfinityIncomeList,
} from "@/api/income";
import type {
  BatchIncome,
  Income,
  IncomeListResponse,
} from "@/api/income/types";
import { useArticleList } from "@/api/wb";
import type { Article } from "@/api/wb/types";
import { Table } from "@/components/table/Table";
import usePagination from "@/hooks/pagination";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button, TextInput } from "flowbite-react";
import { useMemo, type FC, useEffect, useState } from "react";

type SubRow = Partial<Article> & { cost: number };
type ArticleExtended = Article & {
  cost: number;
  subRows: Array<SubRow>;
};

export const CostByArticle: FC = () => {
  const { page, limit } = usePagination({ defaultLimit: 100 });
  const [iccomeCost, setIncomeCost] = useState<Record<string, BatchIncome>>({});
  console.log("🚀 ~ iccomeCost:", iccomeCost);

  const articlesQuery = useArticleList({
    limit,
    page,
    withBarcodes: 1,
  });

  const barcodes = useMemo(() => {
    const items = articlesQuery.data?.items ?? [];
    return (
      items
        .reduce((acc, item) => {
          acc.push(...(item.barcodes ?? []).map((barcode) => barcode.barcode));
          return acc;
        }, [] as string[])
        .join(",") ?? ""
    );
  }, [articlesQuery.data]);

  const icomeQuery = useInfinityIncomeList(
    {
      page: 1,
      limit: 1000,
      barcodes,
    },
    {
      enabled: !!barcodes,
      getNextPageParam: (lastPage) => {
        if (
          lastPage.pagination.page * lastPage.pagination.limit <
          lastPage.pagination.total
        ) {
          return {
            page: lastPage.pagination.page + 1,
            limit: lastPage.pagination.limit,
          };
        }
        return undefined;
      },
    },
  );

  const incomeData = useMemo(() => {
    return (
      (
        icomeQuery.data as unknown as { pages: Array<IncomeListResponse> }
      )?.pages.reduce((acc, page) => {
        acc.push(...page.items);
        return acc;
      }, [] as Income[]) ?? []
    );
  }, [icomeQuery.data]);

  useEffect(() => {
    if (icomeQuery.hasNextPage) {
      icomeQuery.fetchNextPage();
    }
  }, [icomeQuery.data]);

  const data = useMemo(() => {
    const result =
      articlesQuery.data?.items.map((item) => ({
        ...item,
        cost: 0,
        subRows: [] as SubRow[],
      })) ?? ([] as ArticleExtended[]);

    if (incomeData) {
      const incomesByArticle = incomeData.reduce(
        (acc, income) => {
          if (!acc[income.supplierArticle]) {
            acc[income.supplierArticle] = {};
          }

          const icomesByArticle = acc[income.supplierArticle] as Record<
            string,
            SubRow
          >;

          if (!icomesByArticle[income.incomeId]) {
            icomesByArticle[income.incomeId] = {
              vendorCode: income.supplierArticle,
              id: +income.incomeId,
              cost: 0,
            };
          }
          const icome = icomesByArticle[income.incomeId] as SubRow;
          icome.cost = income.cost ?? 0;

          return acc;
        },
        {} as Record<string, Record<string, SubRow>>,
      );

      result.forEach((article) => {
        if (incomesByArticle[article.vendorCode]) {
          const incomes = incomesByArticle[article.vendorCode] as Record<
            string,
            SubRow
          >;
          article.subRows = Object.values(incomes);
          const costs = article.subRows.map((subRow) => subRow.cost);
          // console.log(
          //   "🚀 ~ result.forEach ~ costs:",
          //   costs,
          //   costs.reduce((acc, cost) => acc + cost, 0) / costs.length,
          // );
          article.cost =
            costs.reduce((acc, cost) => acc + cost, 0) / costs.length;
        }
      });
    }

    return result;
  }, [articlesQuery.data, incomeData]);

  const updateByArticle = (vendorCode: string, cost: number) => {
    const incomes = incomeData.filter(
      (income) => income.supplierArticle === vendorCode,
    );
    const article = data.find((article) => article.vendorCode === vendorCode);
    if (article) {
      setIncomeCost((current) => {
        const result = { ...current };
        incomes.forEach((income) => {
          result[income.incomeId + "_" + income.barcode] = {
            incomeId: income.incomeId,
            nmId: article.nmId,
            barcode: income.barcode,
            cost,
          };
        });
        return result;
      });
    }
  };

  const incomeSyncMutation = useIncomeSyncMutation();
  const incomeCostSetBatchMutation = useIncomeCostSetBatchMutation();

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<ArticleExtended>();

    return [
      columnHelper.accessor("photos", {
        header: "Фото",
        cell: (cell) => {
          const val = cell.row.original.photos["big"];
          return <img className="w-7" src={val} alt="img" />;
        },
      }),
      columnHelper.accessor("vendorCode", { header: "Артикул" }),
      columnHelper.accessor("brand", { header: "Бренд" }),
      columnHelper.accessor("id", {
        header: "Себистоимость",
        cell: (cell) => {
          return (
            <TextInput
              type="number"
              defaultValue={cell.row.original.cost}
              min={0}
              onChange={(e) => {
                updateByArticle(
                  cell.row.original.vendorCode,
                  e.target.valueAsNumber,
                );
              }}
            />
          );
        },
      }),
      columnHelper.accessor("barcodes", {
        header: "Размеры",
        cell: (cell) => {
          const barcodes = cell.row.original.barcodes;
          return barcodes?.map((barcode) => barcode.size).join(", ");
        },
      }),
    ];
  }, []);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  if (articlesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-end px-2">
        <Button
          color="blue"
          isProcessing={incomeSyncMutation.isPending}
          disabled={incomeSyncMutation.isPending}
          onClick={() => {
            incomeSyncMutation.mutate({});
          }}
        >
          Обновить поставки
        </Button>
      </div>
      <Table
        className="w-full"
        table={table}
        showControllers={false}
        showTableTitle={false}
      />
      {Object.keys(iccomeCost).length ? (
        <div className="flex justify-end px-2">
          <Button
            color="blue"
            isProcessing={incomeCostSetBatchMutation.isPending}
            disabled={incomeCostSetBatchMutation.isPending}
            onClick={() => {
              incomeCostSetBatchMutation.mutate({
                incomes: Object.values(iccomeCost),
              });
            }}
          >
            Сохранить
          </Button>
        </div>
      ) : null}
    </div>
  );
};
