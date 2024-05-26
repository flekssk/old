import { Card, Tooltip } from "flowbite-react";
import type { FC } from "react";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import type { BarcodeReportItem } from "@/api/report/types";
import { DataTable } from "@/components/table/DataTable";
import { DiffNumberCell } from "@/components/table/DiffNumberCell";

export type StatTableProps = {
  items: BarcodeReportItem[];
  prevItems?: BarcodeReportItem[];
  image: string | null;
};

type BarcodeReportItemWithPrev = BarcodeReportItem & {
  prev?: BarcodeReportItem;
};

export const StatTable: FC<StatTableProps> = ({ items, prevItems, image }) => {
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

      columnHelper.accessor("image", {
        id: "photo",
        header: "Фото",
        cell: () => {
          return image ? (
            <div>
              <Tooltip
                style="light"
                content={<img className="w-28" src={image} alt="img" />}
              >
                <img className="w-5" src={image} alt="img" />
              </Tooltip>
            </div>
          ) : null;
        },
      }),

      columnHelper.accessor("barcode", { id: "barcode", header: "Баркод" }),
      columnHelper.accessor("size", { id: "size", header: "Размер" }),
      columnHelper.accessor("cost", {
        id: "cost",
        header: "Себестоимость",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("averagePriceBeforeSPP", {
        id: "averagePriceBeforeSPP",
        header: "Средняя цена до СПП",
        meta: {
          suffix: "₽",
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("realisation", {
        id: "realisation",
        header: "Реализация (сумма продаж до СПП)",
        meta: {
          suffix: "₽",
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("sale", {
        id: "sale",
        header: "Продажи",
        meta: {
          suffix: "₽",
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("toTransfer", {
        id: "toTransfer",
        header: "К перечислению",
        meta: {
          suffix: "₽",
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("returns", {
        id: "returns",
        header: "Возвраты",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("costOfSales", {
        id: "costOfSales",
        header: "Стоимость продаж",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("fines", {
        id: "fines",
        header: "Штрафы",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("compensationForSubstitutedGoods", {
        id: "compensationForSubstitutedGoods",
        header: "Компенсация подмененного товара",
        meta: {
          suffix: "₽",
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("reimbursementOfTransportationCosts", {
        id: "reimbursementOfTransportationCosts",
        header: "Компенсация поставщика",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("paymentForMarriageAndLostGoods", {
        id: "paymentForMarriageAndLostGoods",
        header: "Оплата брака + потерянного товара",
        meta: {
          suffix: "₽",
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("averageLogisticsCost", {
        id: "averageLogisticsCost",
        header: "Ср. стоимость логистики",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("logistics", {
        id: "logistics",
        header: "Стоимость логистики",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("storage", {
        id: "storage",
        header: "Хранение",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("rejectionsAndReturns", {
        header: "Количество отказов+ возвраты",
        meta: {
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("totalSales", {
        id: "totalSales",
        header: "Всего продаж",

        cell: DiffNumberCell,
      }),
      columnHelper.accessor("averageRedemption", {
        id: "averageRedemption",
        header: "Средний процент выкупа",
        meta: {
          suffix: "%",
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("averageProfitPerPiece", {
        id: "averageProfitPerPiece",
        header: "Средняя прибыль на 1 шт",
        meta: {
          suffix: "₽",
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("tax", {
        id: "tax",
        header: "Налоги",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("profit", {
        id: "profit",
        header: "Прибыль",
        meta: {
          suffix: "₽",
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("roi", {
        id: "roi",
        header: "ROI",
        meta: {
          suffix: "%",
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("profitability", {
        id: "profitability",
        header: "Прибыльность",
        meta: {
          suffix: "%",
        },
        cell: DiffNumberCell,
      }),

      columnHelper.accessor("shareInTotalProfit", {
        id: "shareInTotalProfit",
        header: "Доля в общей прибыли",
        meta: {
          suffix: "%",
        },
        cell: DiffNumberCell,
      }),

      columnHelper.accessor("advertisingExpenses", {
        id: "advertisingExpenses",
        header: "Расходы на рекламу",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("ddr", {
        id: "ddr",
        header: "ДРР",
        meta: {
          suffix: "%",
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
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
        columnPinning={{
          left: ["photo", "barcode"],
        }}
        data={data}
        cellRangeSelection={true}
      />
    </Card>
  );
};
