import { Card, Tooltip } from "flowbite-react";
import type { FC } from "react";
import { useMemo } from "react";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import type { BarcodeReportItem } from "@/api/report/types";
import { displayNumber } from "@/helpers/number";
import { DataTable } from "@/components/table/DataTable";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";

export type StatTableProps = {
  items: BarcodeReportItem[];
  prevItems?: BarcodeReportItem[];
};

type BarcodeReportItemWithPrev = BarcodeReportItem & {
  prev?: BarcodeReportItem;
};

const numberCellWithDiff = (
  cellContext: CellContext<BarcodeReportItemWithPrev, number>,
) => {
  const prev = cellContext.row.original.prev;

  const meta = (cellContext.column.columnDef.meta || {}) as {
    suffix?: string;
    positiveIfGrow?: boolean;
  };
  const positiveIfGrow = meta.positiveIfGrow ?? true;
  const suffix = meta.suffix ?? null;
  const prevValue = prev
    ? prev[cellContext.column.id as keyof BarcodeReportItem]
    : null;

  let direction: "up" | "down" | null = null;
  let isPositive = true;
  if (
    prevValue !== null &&
    typeof prevValue === "number" &&
    cellContext.getValue() !== prevValue
  ) {
    direction = cellContext.getValue() > prevValue ? "up" : "down";
    isPositive =
      cellContext.getValue() > prevValue ? positiveIfGrow : !positiveIfGrow;
  }

  const positiveClass =
    direction === null ? "" : isPositive ? "text-green-500" : "text-red-500";

  return (
    <>
      <div>
        {displayNumber(cellContext.getValue())}
        {suffix ? <>&nbsp;{suffix}</> : null}
      </div>
      {prevValue ? (
        <div className={`flex items-center gap-1 text-xs ${positiveClass}`}>
          {displayNumber(prevValue as number)}
          {suffix ? <>&nbsp;{suffix}</> : null}
          {direction === null ? null : (
            <>{direction === "up" ? <HiArrowUp /> : <HiArrowDown />}</>
          )}
        </div>
      ) : null}
    </>
  );
};

export const StatTable: FC<StatTableProps> = ({ items, prevItems }) => {
  const data = useMemo<BarcodeReportItemWithPrev[]>(() => {
    return items.map((item) => {
      return {
        ...item,
        prev: (prevItems || []).find(
          (prevItem) => item.barcode === prevItem.barcode,
        ),
      };
    });
  }, [items, prevItems]);

  const columns = useMemo<Array<ColumnDef<BarcodeReportItemWithPrev>>>(() => {
    const columnHelper = createColumnHelper<BarcodeReportItemWithPrev>();
    return [
      // columnHelper.accessor("orders", { header: "Заказы р." }),
      // columnHelper.accessor("ordersCount", { header: "Заказы шт" }),
      // columnHelper.accessor("name", { header: "Название" }),

      columnHelper.accessor("barcode", { id: "barcode", header: "Баркод" }),
      columnHelper.accessor("size", { id: "size", header: "Размер" }),
      columnHelper.accessor("cost", {
        id: "cost",
        header: "Себистоимость",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("averagePriceBeforeSPP", {
        id: "averagePriceBeforeSPP",
        header: "Средняя цена до СПП",
        meta: {
          suffix: "₽",
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("realisation", {
        id: "realisation",
        header: "Реализация (сумма продаж до СПП)",
        meta: {
          suffix: "₽",
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("sale", {
        id: "sale",
        header: "Продажи",
        meta: {
          suffix: "₽",
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("toTransfer", {
        id: "toTransfer",
        header: "К перечеслению",
        meta: {
          suffix: "₽",
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("returns", {
        id: "returns",
        header: "Возвраты",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("costOfSales", {
        id: "costOfSales",
        header: "Стоимость продаж",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("fines", {
        id: "fines",
        header: "Штрафы",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("compensationForSubstitutedGoods", {
        id: "compensationForSubstitutedGoods",
        header: "Компенсация подмененного товара",
        meta: {
          suffix: "₽",
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("reimbursementOfTransportationCosts", {
        id: "reimbursementOfTransportationCosts",
        header: "Компенсация поставщика",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("paymentForMarriageAndLostGoods", {
        id: "paymentForMarriageAndLostGoods",
        header: "Оплата брака + потерянного товара",
        meta: {
          suffix: "₽",
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("averageLogisticsCost", {
        id: "averageLogisticsCost",
        header: "Ср. стоимость логистики",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("logistics", {
        id: "logistics",
        header: "Стоимость логистики",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("storage", {
        id: "storage",
        header: "Хранение",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("rejectionsAndReturns", {
        header: "Количество отказов+ возвраты",
        meta: {
          positiveIfGrow: false,
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("totalSales", {
        id: "totalSales",
        header: "Всего продаж",

        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("averageRedemption", {
        id: "averageRedemption",
        header: "Средний процент выкупа",
        meta: {
          suffix: "%",
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("averageProfitPerPiece", {
        id: "averageProfitPerPiece",
        header: "Средняя прибыль на 1 шт",
        meta: {
          suffix: "₽",
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("tax", {
        id: "tax",
        header: "Налоги",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("profit", {
        id: "profit",
        header: "Прибыль",
        meta: {
          suffix: "₽",
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("roi", {
        id: "roi",
        header: "ROI",
        meta: {
          suffix: "%",
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("profitability", {
        id: "profitability",
        header: "Приюыльность",
        meta: {
          suffix: "%",
        },
        cell: numberCellWithDiff,
      }),

      columnHelper.accessor("shareInTotalProfit", {
        id: "shareInTotalProfit",
        header: "Доля в общей прибыли",
        meta: {
          suffix: "%",
        },
        cell: numberCellWithDiff,
      }),

      columnHelper.accessor("advertisingExpenses", {
        id: "advertisingExpenses",
        header: "Расходы на рекламу",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: numberCellWithDiff,
      }),
      columnHelper.accessor("ddr", {
        id: "ddr",
        header: "ДРР",
        meta: {
          suffix: "%",
          positiveIfGrow: false,
        },
        cell: numberCellWithDiff,
      }),
    ];
  }, []);

  return (
    <Card>
      <DataTable
        resizeColumns
        columnSettings
        storedSettingsName="barcode-report-table"
        columns={columns}
        data={data}
        cellRangeSelection={true}
      />
    </Card>
  );
};
