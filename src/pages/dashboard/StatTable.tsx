import { mockByArticle } from "@/mocks/mock-by-article";
import { Card } from "flowbite-react";
import { FC, useMemo } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/components/table/Table";
import type { ProductReportItem } from "@/api/report/types";

export type StatTableProps = {
  items: ProductReportItem[];
};
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

export const StatTable: FC<StatTableProps> = ({ items }) => {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<ProductReportItem>();
    return [
      columnHelper.accessor("orders", { header: "Заказы р." }),
      columnHelper.accessor("image", {
        header: "Фото",
        cell: (row) => {
          return (
            <div>
              <img src={row.getValue()?.replace("small", "big")} alt="img" />
            </div>
          );
        },
      }),
      columnHelper.accessor("ordersCount", { header: "Заказы шт" }),
      columnHelper.accessor("name", { header: "Название" }),
      columnHelper.accessor("vendorCode", { header: "Артикул" }),
      columnHelper.accessor("brand", { header: "Бренд" }),
      columnHelper.accessor("category", { header: "Категория" }),
      columnHelper.accessor("article", { header: "Артикул" }),
      columnHelper.accessor("cost", { header: "Себистоимость" }),
      columnHelper.accessor("averagePriceBeforeSPP", {
        header: "Средняя цена до СПП",
      }),
      columnHelper.accessor("shareInTotalRevenue", {
        header: "Реализация (сумма продаж до СПП)",
      }),
      columnHelper.accessor("sale", { header: "Продажи" }),
      columnHelper.accessor("toTransfer", { header: "К перечеслению" }),
      columnHelper.accessor("returns", { header: "Возвраты" }),
      columnHelper.accessor("costOfSales", { header: "Стоимость продаж" }),
      columnHelper.accessor("fines", { header: "Штрафы" }),
      columnHelper.accessor("compensationForSubstitutedGoods", {
        header: "Компенсация подмененного товара",
      }),
      columnHelper.accessor("reimbursementOfTransportationCosts", {
        header: "Компенсация поставщика",
      }),
      columnHelper.accessor("paymentForMarriageAndLostGoods", {
        header: "Оплата брака + потерянного товара",
      }),
      columnHelper.accessor("averageLogisticsCost", {
        header: "Ср. стоимость логистики",
      }),
      columnHelper.accessor("logistics", { header: "Стоимость логистики" }),
      columnHelper.accessor("storage", { header: "Хранение" }),
      columnHelper.accessor("rejectionsAndReturns", {
        header: "Количество отказов+ возвраты",
      }),
      columnHelper.accessor("totalSales", { header: "Всего продаж" }),
      columnHelper.accessor("averageRedemption", {
        header: "Средний процент выкупа",
      }),
      columnHelper.accessor("averageProfitPerPiece", {
        header: "Средняя прибыль на 1 шт",
      }),
      columnHelper.accessor("tax", { header: "Налоги" }),
      columnHelper.accessor("profit", { header: "Прибыль" }),
      columnHelper.accessor("roi", { header: "ROI" }),
      columnHelper.accessor("profitability", { header: "Приюыльность" }),
      columnHelper.accessor("shareInTotalRevenuePart", {
        header: "Доля в общей выручке",
      }),
      columnHelper.accessor("shareInTotalProfit", {
        header: "Доля в общей прибыли",
      }),
      columnHelper.accessor("marginality", { header: "Маржинальность" }),
      columnHelper.accessor("advertisingExpenses", {
        header: "Расходы на рекламу",
      }),
      columnHelper.accessor("ddr", { header: "ДДР" }),
    ];
  }, []);

  const table = useReactTable({
    columns,
    data: items,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <Table table={table} cellRangeSelection={true} />
    </Card>
  );
};
