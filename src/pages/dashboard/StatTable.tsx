import { Card, Tooltip } from "flowbite-react";
import type { FC } from "react";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import type { ProductReportItem } from "@/api/report/types";
import { DataTable } from "@/components/table/DataTable";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { DiffNumberCell } from "@/components/table/DiffNumberCell";

export type StatTableProps = {
  items: ProductReportItem[];
  prevItems?: ProductReportItem[];
  redirectFilters?: string;
};

export const StatTable: FC<StatTableProps> = ({
  items,
  prevItems,
  redirectFilters,
}) => {
  const data = useMemo<ProductReportItem[]>(() => {
    return items.map((item) => {
      return {
        ...item,
        prev: (prevItems || []).find(
          (prevItem) => item.vendorCode === prevItem.vendorCode,
        ),
      };
    });
  }, [items, prevItems]);

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

      columnHelper.accessor("vendorCode", {
        id: "vendorCode",
        header: "Артикул",
        cell: ({ cell }) => (
          <Link
            to={`${ROUTES.product}/${cell.row.original.article}?${redirectFilters}`}
            className="underline"
          >
            {cell.getValue()}
          </Link>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("brand", {
        id: "brand",
        header: "Бренд",
        enableSorting: true,
      }),
      columnHelper.accessor("category", {
        id: "category",
        header: "Категория",
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("article", {
        id: "article",
        header: "Артикул",
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("cost", {
        id: "cost",
        header: "Себестоимость",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("averagePriceBeforeSPP", {
        id: "averagePriceBeforeSPP",
        header: "Средняя цена до СПП",
        meta: {
          suffix: "₽",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("realisation", {
        id: "realisation",
        header: "Реализация (сумма продаж до СПП)",
        meta: {
          suffix: "₽",
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("sale", {
        id: "sale",
        header: "Продажи",
        meta: {
          suffix: "₽",
        },
        cell: DiffNumberCell,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("toTransfer", {
        id: "toTransfer",
        header: "К перечеслению",
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

      columnHelper.accessor("shareInTotalRevenue", {
        id: "shareInTotalRevenue",
        header: "Доля в общей выручке",
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
      columnHelper.accessor("profitability", {
        id: "profitability",
        header: "Маржинальность",
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
        header: "ДДР",
        meta: {
          suffix: "%",
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
      }),
    ];
  }, [redirectFilters]);

  return (
    <Card>
      <DataTable
        resizeColumns
        columnSettings
        groupSettings
        groupSettingsName="main-report-user-groups"
        storedSettingsName="main-report-table"
        columns={columns}
        data={data}
        cellRangeSelection={true}
      />
    </Card>
  );
};
