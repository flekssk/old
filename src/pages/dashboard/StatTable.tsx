import { Card, Pagination, Tooltip } from "flowbite-react";
import type { FC } from "react";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import type { ProductReportItem } from "@/api/report/types";
import { DataTable } from "@/components/table/DataTable";
import { Link, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { DiffNumberCell } from "@/components/table/DiffNumberCell";
import {
  usePagination,
  type Pagination as PaginationType,
} from "@/hooks/usePagination";
import { Select } from "@/components/Select";
import { SIZES_ROWS_FOR_REPORT_TABLE } from "@/constants/constants";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

export type StatTableProps = {
  items: ProductReportItem[];
  pagination: PaginationType;
  prevItems?: ProductReportItem[];
  redirectFilters?: string;
};

export const StatTable: FC<StatTableProps> = ({
  items,
  pagination,
  prevItems,
  redirectFilters,
}) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const pageValue = searchParam.get("page") || "1";

  const { totalPages, onChangePage, onChangeSelect } = usePagination({
    pagination,
    setSearchParam,
    searchParam,
  });

  const isPaginationVisible = totalPages && items.length !== pagination.total;

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

  // @ts-expect-error fix ts error
  const columns = useMemo<Array<ColumnDef<ProductReportItem>>>(() => {
    const columnHelper = createColumnHelper<ProductReportItem>();
    return [
      columnHelper.accessor("image", {
        id: "photo",
        header: "Фото",
        cell: (row) => {
          const img = row.getValue() ? (
            <img className="w-full" src={row.getValue()} alt="img" />
          ) : (
            <HiOutlineQuestionMarkCircle />
          );
          return (
            <div>
              <Tooltip
                style="light"
                content={
                  <div className="inline-flex w-28 justify-center text-3xl">
                    {img}
                  </div>
                }
              >
                <div className="w-5 text-center text-xl">{img}</div>
              </Tooltip>
            </div>
          );
        },
      }),

      columnHelper.accessor("vendorCode", {
        id: "vendorCode",
        header: "Артикул",
        meta: {
          filterType: "string",
        },
        cell: ({ cell }) => (
          <Link
            to={`${ROUTES.product}/${cell.row.original.article}?${redirectFilters}`}
            className="underline"
          >
            {cell.getValue()}
          </Link>
        ),
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("brand", {
        id: "brand",
        header: "Бренд",
        meta: {
          filterType: "string",
        },
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("category", {
        id: "category",
        header: "Категория",
        meta: {
          filterType: "string",
        },
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("article", {
        id: "article",
        header: "Артикул WB",
        meta: {
          filterType: "string",
        },
        cell: ({ cell }) => {
          return (
            <a
              className="underline"
              href={`https://www.wildberries.ru/catalog/${cell.row.original.article}/detail.aspx`}
              target="_blank"
              rel="noreferrer"
            >
              {cell.getValue()}
            </a>
          );
        },
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("cost", {
        id: "cost",
        header: "Себестоимость",
        meta: {
          suffix: "₽",
          positiveIfGrow: false,
          filterType: "number",
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
          suffix: "₽",
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("sale", {
        id: "sale",
        header: "Продажи",
        meta: {
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
          filterType: "number",
        },
        header: "Всего продаж",
        cell: DiffNumberCell,
      }),
      columnHelper.accessor("averageRedemption", {
        id: "averageRedemption",
        header: "Средний процент выкупа",
        meta: {
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
          suffix: "%",
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),

      columnHelper.accessor("shareInTotalRevenue", {
        id: "shareInTotalRevenue",
        header: "Доля в общей выручке",
        meta: {
          suffix: "%",
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("shareInTotalProfit", {
        id: "shareInTotalProfit",
        header: "Доля в общей прибыли",
        meta: {
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
          suffix: "%",
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("advertisingExpenses", {
        id: "advertisingExpenses",
        header: "Расходы на рекламу",
        meta: {
          suffix: "₽",
          filterType: "number",
          positiveIfGrow: false,
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor("ddr", {
        id: "ddr",
        header: "ДРР",
        meta: {
          suffix: "%",
          positiveIfGrow: false,
          filterType: "number",
        },
        cell: DiffNumberCell,
        enableSorting: true,
        enableColumnFilter: true,
      }),
    ];
  }, [redirectFilters]);

  return (
    <Card>
      <DataTable
        resizeColumns
        columnSettings
        groupSettings
        small
        wrapperClassName="max-h-statTable"
        groupSettingsName="main-report-user-groups"
        storedSettingsName="main-report-table"
        columns={columns}
        data={data}
        columnPinning={{
          left: ["select", "photo", "vendorCode"],
        }}
        cellRangeSelection={true}
      />
      {isPaginationVisible && (
        <div className="flex items-center gap-2">
          <Pagination
            currentPage={Number(pageValue)}
            totalPages={totalPages}
            onPageChange={onChangePage}
            nextLabel=""
            previousLabel=""
            showIcons
            className="mt-0"
          />
          <div className="mt-2">
            <Select
              placeholder="Отображать по"
              options={SIZES_ROWS_FOR_REPORT_TABLE}
              setSelectedOption={(option) =>
                onChangeSelect(String(option.value))
              }
            />
          </div>
        </div>
      )}
    </Card>
  );
};
