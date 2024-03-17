import { Card, Tooltip } from "flowbite-react";
import type { FC } from "react";
import { useMemo } from "react";
import type { CellContext } from "@tanstack/react-table";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/components/table/Table";
import type { ProductReportItem } from "@/api/report/types";
import { displayNumber } from "@/helpers/number";

export type StatTableProps = {
  items: ProductReportItem[];
};

const numberCell = (cellContext: CellContext<ProductReportItem, number>) => {
  return <span>{displayNumber(cellContext.getValue())}</span>;
};

export const StatTable: FC<StatTableProps> = ({ items }) => {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<ProductReportItem>();
    return [
      columnHelper.accessor("image", {
        header: "Фото",
        cell: (row) => {
          return (
            <div>
              <Tooltip
                style="light"
                content={
                  <img
                    className="w-28"
                    src={row.getValue()?.replace("small", "big")}
                    alt="img"
                  />
                }
              >
                <img
                  className="w-5"
                  src={row.getValue()?.replace("small", "big")}
                  alt="img"
                />
              </Tooltip>
            </div>
          );
        },
      }),
      // columnHelper.accessor("orders", { header: "Заказы р." }),
      // columnHelper.accessor("ordersCount", { header: "Заказы шт" }),
      // columnHelper.accessor("name", { header: "Название" }),
      columnHelper.accessor("vendorCode", { header: "Артикул" }),
      columnHelper.accessor("brand", { header: "Бренд" }),
      columnHelper.accessor("category", { header: "Категория" }),
      columnHelper.accessor("article", { header: "Артикул" }),
      columnHelper.accessor("cost", {
        header: "Себистоимость",
        cell: numberCell,
      }),
      columnHelper.accessor("averagePriceBeforeSPP", {
        header: "Средняя цена до СПП",
      }),
      columnHelper.accessor("shareInTotalRevenue", {
        header: "Реализация (сумма продаж до СПП)",
      }),
      columnHelper.accessor("sale", {
        header: "Продажи",
        cell: numberCell,
      }),
      columnHelper.accessor("toTransfer", {
        header: "К перечеслению",
        cell: numberCell,
      }),
      columnHelper.accessor("returns", {
        header: "Возвраты",
        cell: numberCell,
      }),
      columnHelper.accessor("costOfSales", {
        header: "Стоимость продаж",
        cell: numberCell,
      }),
      columnHelper.accessor("fines", { header: "Штрафы", cell: numberCell }),
      columnHelper.accessor("compensationForSubstitutedGoods", {
        header: "Компенсация подмененного товара",
        cell: numberCell,
      }),
      columnHelper.accessor("reimbursementOfTransportationCosts", {
        header: "Компенсация поставщика",
        cell: numberCell,
      }),
      columnHelper.accessor("paymentForMarriageAndLostGoods", {
        header: "Оплата брака + потерянного товара",
        cell: numberCell,
      }),
      columnHelper.accessor("averageLogisticsCost", {
        header: "Ср. стоимость логистики",
        cell: numberCell,
      }),
      columnHelper.accessor("logistics", {
        header: "Стоимость логистики",
        cell: numberCell,
      }),
      columnHelper.accessor("storage", {
        header: "Хранение",
        cell: numberCell,
      }),
      columnHelper.accessor("rejectionsAndReturns", {
        header: "Количество отказов+ возвраты",
        cell: numberCell,
      }),
      columnHelper.accessor("totalSales", {
        header: "Всего продаж",
        cell: numberCell,
      }),
      columnHelper.accessor("averageRedemption", {
        header: "Средний процент выкупа",
        cell: numberCell,
      }),
      columnHelper.accessor("averageProfitPerPiece", {
        header: "Средняя прибыль на 1 шт",
        cell: numberCell,
      }),
      columnHelper.accessor("tax", { header: "Налоги", cell: numberCell }),
      columnHelper.accessor("profit", { header: "Прибыль", cell: numberCell }),
      columnHelper.accessor("roi", { header: "ROI", cell: numberCell }),
      columnHelper.accessor("profitability", {
        header: "Приюыльность",
        cell: numberCell,
      }),
      columnHelper.accessor("shareInTotalRevenuePart", {
        header: "Доля в общей выручке",
        cell: numberCell,
      }),
      columnHelper.accessor("shareInTotalProfit", {
        header: "Доля в общей прибыли",
        cell: numberCell,
      }),
      columnHelper.accessor("marginality", {
        header: "Маржинальность",
        cell: numberCell,
      }),
      columnHelper.accessor("advertisingExpenses", {
        header: "Расходы на рекламу",
        cell: numberCell,
      }),
      columnHelper.accessor("ddr", { header: "ДДР", cell: numberCell }),
    ];
  }, []);

  const table = useReactTable<ProductReportItem>({
    columns,
    data: items,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <Table resizeColumns table={table} cellRangeSelection={true} />
    </Card>
  );
};
