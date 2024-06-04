import { Card } from "flowbite-react";
import type { FC } from "react";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import type { WeekReportItem } from "@/api/report/types";
import { DataTable } from "@/components/table/DataTable";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { DiffNumberCell } from "@/components/table/DiffNumberCell";
import { endOfWeek, format, parse } from "date-fns";
import { DATE_FORMAT } from "@/helpers/date";

export type StatTableProps = {
  items: WeekReportItem[];
};

export const StatTable: FC<StatTableProps> = ({ items }) => {
  const data = useMemo<WeekReportItem[]>(() => {
    return items.map((item, index) => {
      return {
        ...item,
        prev: index < items.length - 1 ? items[index + 1] : undefined,
      };
    });
  }, [items]);

  // @ts-expect-error test
  const columns = useMemo<Array<ColumnDef<WeekReportItem>>>(() => {
    const columnHelper = createColumnHelper<WeekReportItem>();
    return [
      columnHelper.accessor("startWeek", {
        id: "startWeek",
        header: "Неделя",
        meta: {
          displayDiff: true,
          filterType: "string",
        },
        cell: ({ cell }) => {
          const date = cell.getValue();
          const startOfWeek = parse(date, DATE_FORMAT.SERVER_DATE, new Date());
          const startOfWeekFormatted = format(startOfWeek, DATE_FORMAT.DATE);
          const endOfWeekFormatted = format(
            endOfWeek(startOfWeek, { weekStartsOn: 1 }),
            DATE_FORMAT.DATE,
          );

          return (
            <Link to={`${ROUTES.home}`} className="underline">
              {startOfWeekFormatted} - {endOfWeekFormatted}
            </Link>
          );
        },
        enableSorting: true,
        enableColumnFilter: true,
      }),

      columnHelper.accessor("averagePriceBeforeSPP", {
        id: "averagePriceBeforeSPP",
        header: "Средняя цена до СПП",
        meta: {
          displayDiff: true,
          suffix: "₽",
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("realisation", {
        id: "realisation",
        header: "Реализация (сумма продаж до СПП)",
        meta: {
          displayDiff: true,
          suffix: "₽",
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("sales", {
        id: "sales",
        header: "Продажи",
        meta: {
          displayDiff: true,
          suffix: "₽",
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("toTransfer", {
        id: "toTransfer",
        header: "К перечислению",
        meta: {
          displayDiff: true,
          suffix: "₽",
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("returns", {
        id: "returns",
        header: "Возвраты",
        meta: {
          displayDiff: true,
          suffix: "₽",
          positiveIfGrow: false,
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("costOfSales", {
        id: "costOfSales",
        header: "Себестоимость продаж",
        meta: {
          displayDiff: true,
          suffix: "₽",
          positiveIfGrow: false,
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("fines", {
        id: "fines",
        header: "Штрафы",
        meta: {
          displayDiff: true,
          suffix: "₽",
          positiveIfGrow: false,
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("compensationForSubstitutedGoods", {
        id: "compensationForSubstitutedGoods",
        header: "Компенсация подмененного товара",
        meta: {
          displayDiff: true,
          suffix: "₽",
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("reimbursementOfTransportationCosts", {
        id: "reimbursementOfTransportationCosts",
        header: "Компенсация поставщика",
        meta: {
          displayDiff: true,
          suffix: "₽",
          positiveIfGrow: false,
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("paymentForMarriageAndLostGoods", {
        id: "paymentForMarriageAndLostGoods",
        header: "Оплата брака + потерянного товара",
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("averageLogisticsCost", {
        id: "averageLogisticsCost",
        header: "Ср. стоимость логистики",
        meta: {
          displayDiff: true,
          suffix: "₽",
          positiveIfGrow: false,
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("logistics", {
        id: "logistics",
        header: "Стоимость логистики",
        meta: {
          displayDiff: true,
          suffix: "₽",
          positiveIfGrow: false,
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("storage", {
        id: "storage",
        header: "Хранение",
        meta: {
          displayDiff: true,
          suffix: "₽",
          positiveIfGrow: false,
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("rejectionsAndReturns", {
        header: "Количество отказов+ возвраты",
        meta: {
          displayDiff: true,
          positiveIfGrow: false,
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("totalSales", {
        id: "totalSales",
        meta: {
          displayDiff: true,
          filterType: "number",
        },
        header: "Всего продаж",
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("averageRedemption", {
        id: "averageRedemption",
        header: "Средний процент выкупа",
        meta: {
          displayDiff: true,
          suffix: "%",
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("averageProfitPerPiece", {
        id: "averageProfitPerPiece",
        header: "Средняя прибыль на 1 шт",
        meta: {
          displayDiff: true,
          suffix: "₽",
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("tax", {
        id: "tax",
        header: "Налоги",
        meta: {
          displayDiff: true,
          suffix: "₽",
          filterType: "number",
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("profit", {
        id: "profit",
        header: "Прибыль",
        meta: {
          displayDiff: true,
          suffix: "₽",
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("roi", {
        id: "roi",
        header: "ROI",
        meta: {
          displayDiff: true,
          suffix: "%",
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),

      columnHelper.accessor("profitability", {
        id: "profitability",
        header: "Маржинальность",
        meta: {
          displayDiff: true,
          suffix: "%",
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("advertisingExpense", {
        id: "advertisingExpense",
        header: "Расходы на рекламу",
        meta: {
          displayDiff: true,
          suffix: "₽",
          filterType: "number",
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("drr", {
        id: "drr",
        header: "ДРР",
        meta: {
          displayDiff: true,
          suffix: "%",
          positiveIfGrow: false,
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
    ];
  }, []);

  return (
    <Card>
      <DataTable
        resizeColumns
        columnSettings
        small
        wrapperClassName="max-h-statTable"
        storedSettingsName="week-report-table"
        columns={columns}
        data={data}
        columnPinning={{
          left: ["startWeek"],
        }}
        cellRangeSelection={true}
      />
    </Card>
  );
};
