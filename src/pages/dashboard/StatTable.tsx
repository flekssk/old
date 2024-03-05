import { mockByArticle } from "@/mocks/mock-by-article";
import { Card } from "flowbite-react";
import { useMemo } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/components/table/Table";

type ArticleData = {
  article: string;
  avgCost: number;
  AvgPrice: number;
  realezation: number;
  sales: number;
  toTransfer: number;
  Returns: number;
  costForSales: number;
  penalty: number;
  compensationReplacedProduct: number;
  compensationLogistics: number;
  logistic: number;
  tax: number;
  income: number;
  store: number;
  roi: number;
  logisticsCost: number;
  salesCount: number;
  partOfIncome: number;
  PartOfErn: number;
  compensationForReturns: number;
};

export const StatTable = () => {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<ArticleData>();
    return [
      columnHelper.accessor("article", {
        header: "article",
      }),
      columnHelper.accessor("avgCost", {
        header: "avgCost",
      }),
      columnHelper.accessor("AvgPrice", {
        header: "AvgPrice",
      }),
      columnHelper.accessor("realezation", {
        header: "realezation",
      }),
      columnHelper.accessor("sales", { header: "sales" }),
      columnHelper.accessor("toTransfer", {
        header: "toTransfer",
      }),
      columnHelper.accessor("Returns", {
        header: "Returns",
      }),
      columnHelper.accessor("costForSales", {
        header: "costForSales",
      }),
      columnHelper.accessor("penalty", {
        header: "penalty",
      }),
      columnHelper.accessor("compensationReplacedProduct", {
        header: "compensationReplacedProduct",
      }),
      columnHelper.accessor("compensationLogistics", {
        header: "compensationLogistics",
      }),
      columnHelper.accessor("logistic", {
        header: "logistic",
      }),
      columnHelper.accessor("tax", { header: "tax" }),
      columnHelper.accessor("income", { header: "income" }),
      columnHelper.accessor("store", { header: "store" }),
      columnHelper.accessor("roi", { header: "roi" }),
      columnHelper.accessor("logisticsCost", {
        header: "logisticsCost",
      }),
      columnHelper.accessor("salesCount", {
        header: "salesCount",
      }),
      columnHelper.accessor("partOfIncome", {
        header: "partOfIncome",
      }),
      columnHelper.accessor("PartOfErn", {
        header: "PartOfErn",
      }),
      columnHelper.accessor("compensationForReturns", {
        header: "compensationForReturns",
      }),
    ];
  }, []);

  const table = useReactTable({
    columns,
    data: mockByArticle as ArticleData[],
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <Table table={table} cellRangeSelection={true} />
    </Card>
  );
};
