import { Card, Tooltip } from "flowbite-react";
import type { FC } from "react";
import { useMemo } from "react";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import type { ProductReportItem } from "@/api/report/types";
import { displayNumber } from "@/helpers/number";
import { DataTable } from "@/components/table/DataTable";

export type StatTableProps = {
  items: ProductReportItem[];
};

const numberCell = (cellContext: CellContext<ProductReportItem, number>) => {
  return <span>{displayNumber(cellContext.getValue())}</span>;
};

export const StatTable: FC<StatTableProps> = ({ items }) => {
  const columns = useMemo<Array<ColumnDef<ProductReportItem>>>(() => {
    const columnHelper = createColumnHelper<ProductReportItem>();
    return [
      columnHelper.accessor("image", {
        id: "photo",
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
      columnHelper.accessor("vendorCode", {
        id: "vendorCode",
        header: "Артикул",
      }),
      columnHelper.accessor("brand", { id: "brand", header: "Бренд" }),
      columnHelper.accessor("category", {
        id: "category",
        header: "Категория",
      }),
      columnHelper.accessor("article", { id: "article", header: "Артикул" }),
      columnHelper.accessor("cost", {
        id: "cost",
        header: "Себистоимость",
        cell: numberCell,
      }),
      columnHelper.accessor("averagePriceBeforeSPP", {
        id: "averagePriceBeforeSPP",
        header: "Средняя цена до СПП",
        cell: numberCell,
      }),
      columnHelper.accessor("realisation", {
        id: "realisation",
        header: "Реализация (сумма продаж до СПП)",
        cell: numberCell,
      }),
      columnHelper.accessor("sale", {
        id: "sale",
        header: "Продажи",
        cell: numberCell,
      }),
      columnHelper.accessor("toTransfer", {
        id: "toTransfer",
        header: "К перечеслению",
        cell: numberCell,
      }),
      columnHelper.accessor("returns", {
        id: "returns",
        header: "Возвраты",
        cell: numberCell,
      }),
      columnHelper.accessor("costOfSales", {
        id: "costOfSales",
        header: "Стоимость продаж",
        cell: numberCell,
      }),
      columnHelper.accessor("fines", {
        id: "fines",
        header: "Штрафы",
        cell: numberCell,
      }),
      columnHelper.accessor("compensationForSubstitutedGoods", {
        id: "compensationForSubstitutedGoods",
        header: "Компенсация подмененного товара",
        cell: numberCell,
      }),
      columnHelper.accessor("reimbursementOfTransportationCosts", {
        id: "reimbursementOfTransportationCosts",
        header: "Компенсация поставщика",
        cell: numberCell,
      }),
      columnHelper.accessor("paymentForMarriageAndLostGoods", {
        id: "paymentForMarriageAndLostGoods",
        header: "Оплата брака + потерянного товара",
        cell: numberCell,
      }),
      columnHelper.accessor("averageLogisticsCost", {
        id: "averageLogisticsCost",
        header: "Ср. стоимость логистики",
        cell: numberCell,
      }),
      columnHelper.accessor("logistics", {
        id: "logistics",
        header: "Стоимость логистики",
        cell: numberCell,
      }),
      columnHelper.accessor("storage", {
        id: "storage",
        header: "Хранение",
        cell: numberCell,
      }),
      columnHelper.accessor("rejectionsAndReturns", {
        header: "Количество отказов+ возвраты",
        cell: numberCell,
      }),
      columnHelper.accessor("totalSales", {
        id: "totalSales",
        header: "Всего продаж",
        cell: numberCell,
      }),
      columnHelper.accessor("averageRedemption", {
        id: "averageRedemption",
        header: "Средний процент выкупа",
        cell: numberCell,
      }),
      columnHelper.accessor("averageProfitPerPiece", {
        id: "averageProfitPerPiece",
        header: "Средняя прибыль на 1 шт",
        cell: numberCell,
      }),
      columnHelper.accessor("tax", {
        id: "tax",
        header: "Налоги",
        cell: numberCell,
      }),
      columnHelper.accessor("profit", {
        id: "profit",
        header: "Прибыль",
        cell: numberCell,
      }),
      columnHelper.accessor("roi", {
        id: "roi",
        header: "ROI",
        cell: numberCell,
      }),
      columnHelper.accessor("profitability", {
        id: "profitability",
        header: "Приюыльность",
        cell: numberCell,
      }),
      columnHelper.accessor("shareInTotalRevenuePart", {
        id: "shareInTotalRevenuePart",
        header: "Доля в общей выручке",
        cell: numberCell,
      }),
      columnHelper.accessor("shareInTotalProfit", {
        id: "shareInTotalProfit",
        header: "Доля в общей прибыли",
        cell: numberCell,
      }),
      columnHelper.accessor("marginality", {
        id: "marginality",
        header: "Маржинальность",
        cell: numberCell,
      }),
      columnHelper.accessor("advertisingExpenses", {
        id: "advertisingExpenses",
        header: "Расходы на рекламу",
        cell: numberCell,
      }),
      columnHelper.accessor("ddr", {
        id: "ddr",
        header: "ДДР",
        cell: numberCell,
      }),
    ];
  }, []);

  return (
    <Card>
      <DataTable
        resizeColumns
        columnSettings
        storedSettingsName="main-report-table"
        columns={columns}
        data={items}
        cellRangeSelection={true}
      />
    </Card>
  );
};
