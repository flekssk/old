import { Table as TableFlowbite } from "flowbite-react/lib/esm/components/Table/Table";
import React from "react";
import type { Row, Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import classNames from "classnames";

type TableListProps<TableData, Rows> = {
  table: Table<TableData>;
  rows: Row<Rows>[];
};

const TableList = <TableData, Rows>({
  table,
  rows,
}: TableListProps<TableData, Rows>) => {
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
        {rows.map((row) => (
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
                        className: classNames("overflow-hidden text-ellipsis", {
                          "text-[#1890FF]": cell.column.id === "vendorCode",
                        }),
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
        ))}
      </TableFlowbite.Body>
    </TableFlowbite>
  );
};

export default TableList;
