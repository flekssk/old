import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { useCellRangeSelection } from "./useRangeSelection";
import { displayNumber } from "@/helpers/number";
import { Table as TableFlowbite } from "flowbite-react";
import { ColumnSettings } from "./ColumnSettings";
import { cn } from "@/utils/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  cellRangeSelection?: boolean;
  className?: string;
  resizeColumns?: boolean;
  columnSettings?: boolean;
  storedSettingsName?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  cellRangeSelection,
  className,
  resizeColumns,
  columnSettings,
  storedSettingsName = "default-data-table-settings",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(() => {
      return columns.reduce((acc, column) => {
        acc[column.id as string] = true;
        return acc;
      }, {} as VisibilityState);
    });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const { getRowModel } = table;

  // getCellsBetweenId returns all cell Ids between two cell Id, and then setState for selectedCellIds

  const model = getRowModel();
  const rows = model.rows;

  const { getBodyProps, getCellProps, calculatedCellValues } =
    useCellRangeSelection(table, cellRangeSelection);

  return (
    <div>
      <div className="flex justify-between py-2">
        <div></div>
        <div>
          {columnSettings ? (
            <ColumnSettings
              storedSettingsName={storedSettingsName}
              table={table}
              visibilityState={columnVisibility}
            />
          ) : null}
        </div>
      </div>
      <div className="overflow-auto">
        <TableFlowbite
          className={className}
          striped
          {...{
            style: {
              width: resizeColumns ? table.getCenterTotalSize() : undefined,
            },
          }}
        >
          <TableFlowbite.Head>
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableFlowbite.HeadCell
                    key={header.id}
                    className="relative"
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    <div
                      {...{
                        onDoubleClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: cn(
                          "absolute inset-y-0 right-0 w-1 cursor-col-resize hover:bg-gray-400 active:bg-primary-400",
                          {
                            "bg-primary-400": header.column.getIsResizing(),
                          },
                        ),
                      }}
                    ></div>
                  </TableFlowbite.HeadCell>
                ))}
              </React.Fragment>
            ))}
          </TableFlowbite.Head>
          <TableFlowbite.Body {...getBodyProps()}>
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableFlowbite.Row className=" border-b">
                  {row.getVisibleCells().map((cell, index) => {
                    return (
                      <TableFlowbite.Cell
                        {...getCellProps(cell, row, index)}
                        style={{ width: cell.column.getSize() }}
                        key={cell.id}
                      >
                        <span className="overflow-hidden text-ellipsis">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </span>
                      </TableFlowbite.Cell>
                    );
                  })}
                </TableFlowbite.Row>
              </React.Fragment>
            ))}
          </TableFlowbite.Body>
        </TableFlowbite>
      </div>
      {cellRangeSelection ? (
        <div className="flex justify-end gap-2 p-4">
          <span>
            <span className="font-bold">Количество:</span>{" "}
            {displayNumber(calculatedCellValues.count)}{" "}
          </span>
          <span>
            <span className="font-bold">Средее:</span>{" "}
            {displayNumber(calculatedCellValues.avg)}{" "}
          </span>
          <span>
            <span className="font-bold">Сумма:</span>{" "}
            {displayNumber(calculatedCellValues.sum)}{" "}
          </span>
        </div>
      ) : null}
    </div>
  );
}
