import React from "react";
import type { Row, Table as TanstackTable } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { Table as TableFlowbite } from "flowbite-react";
import { useCellRangeSelection } from "./useRangeSelection";
import { displayNumber } from "@/helpers/number";
import classNames from "classnames";

type TableProps<T extends Record<string, unknown>> = {
  table: TanstackTable<T>;
  className?: string;
  loading?: boolean;
  showFooter?: boolean;
  loadingRows?: number;
  resizeColumns?: boolean;
  renderAdditionalRowBefore?: (row: Row<T>) => React.ReactNode;
  renderAdditionalRowAfter?: (row: Row<T>) => React.ReactNode;
  getRowClassName?: (row: T) => string;
  renderEmpty?: () => React.ReactNode;
  cellRangeSelection?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Table = <T extends Record<string, any>>({
  table,
  renderAdditionalRowBefore,
  renderAdditionalRowAfter,
  cellRangeSelection = false,
  resizeColumns = false,
  className,
}: TableProps<T>) => {
  const { getRowModel } = table;

  // getCellsBetweenId returns all cell Ids between two cell Id, and then setState for selectedCellIds

  const model = getRowModel();
  const rows = model.rows;

  const { getBodyProps, getCellProps, calculatedCellValues } =
    useCellRangeSelection(table, cellRangeSelection);

  return (
    <div>
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
                        className: classNames(
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
                {renderAdditionalRowBefore?.(row)}
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
                {renderAdditionalRowAfter?.(row)}
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
};
