import { Table as TableFlowbite } from "flowbite-react";
import React from "react";
import type { Row, Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import classNames from "classnames";

type TableListProps<TableData> = {
  table: Table<TableData>;
  emptyMessage?: string;
  loading?: boolean;
  loadingRows?: number;
};

const TableList = <TableData extends object>({
  table,
  emptyMessage = "Нет данных для отображения",
  loading = false,
  loadingRows = 10,
}: TableListProps<TableData>) => {
  const loadingItems = Array.from({ length: loadingRows });
  const rows = table.getCoreRowModel().rows;
  return (
    <TableFlowbite striped>
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
                <p>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </p>
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
      <TableFlowbite.Body>
        {loading ? (
          <>
            {loadingItems.map((_, index) => (
              <TableFlowbite.Row key={index} className="border-b">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableFlowbite.Cell
                    key={headerGroup.id}
                    colSpan={headerGroup.headers.length}
                  >
                    <div className="h-4 w-20 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
                  </TableFlowbite.Cell>
                ))}
              </TableFlowbite.Row>
            ))}
          </>
        ) : (
          <>
            {rows.length ? (
              rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableFlowbite.Row className="border-b">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableFlowbite.Cell
                          style={{ width: cell.column.getSize() }}
                          key={cell.id}
                        >
                          <span
                            {...{
                              className: classNames(
                                "overflow-hidden text-ellipsis",
                                {
                                  "text-[#1890FF]":
                                    cell.column.id === "vendorCode",
                                },
                              ),
                            }}
                          >
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
              ))
            ) : (
              <TableFlowbite.Row className="border-b">
                <TableFlowbite.Cell colSpan={table.getHeaderGroups().length}>
                  {emptyMessage}
                </TableFlowbite.Cell>
              </TableFlowbite.Row>
            )}
          </>
        )}
      </TableFlowbite.Body>
    </TableFlowbite>
  );
};

export default TableList;
