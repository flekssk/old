import { useIncomeList, useIncomeSyncMutation } from "@/api/income";
import { useArticleList } from "@/api/wb";
import { Article } from "@/api/wb/types";
import { Table } from "@/components/table/Table";
import usePagination from "@/hooks/pagination";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button, TextInput } from "flowbite-react";
import { useMemo, type FC } from "react";

type SubRow = Partial<Article> & { cost: number };
type ArticleExtended = Article & {
  subRows: Array<SubRow>;
};

export const CostByArticle: FC = () => {
  const { page, limit } = usePagination({ defaultLimit: 100 });

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

  const icomeQuery = useIncomeList(
    {
      page: 1,
      limit: 2000,
      barcodes,
    },
    {
      enabled: !!barcodes,
    },
  );

  const data = useMemo(() => {
    const result =
      articlesQuery.data?.items.map((item) => ({
        ...item,
        subRows: [] as SubRow[],
      })) ?? ([] as ArticleExtended[]);

    if (icomeQuery.data?.items) {
      const incomesByArticle = icomeQuery.data.items.reduce(
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
          icome.cost += income.cost ?? 0;

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
        }
      });
    }

    return result;
  }, [articlesQuery.data, icomeQuery.data]);

  const incomeSyncMutation = useIncomeSyncMutation();

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
        cell: () => {
          return <TextInput type="number" min={0} />;
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
    columnResizeMode: "onChange",
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
      <Table className="w-full" table={table} />
    </div>
  );
};
