import React from "react";
import { Row, Table as TanstackTable, flexRender } from "@tanstack/react-table";
import { Table as TableFlowbite } from "flowbite-react";

type TableProps<T extends Record<string, any>> = {
  table: TanstackTable<T>;
  className?: string;
  loading?: boolean;
  showFooter?: boolean;
  loadingRows?: number;
  renderAdditionalRowBefore?: (row: Row<T>) => React.ReactNode;
  renderAdditionalRowAfter?: (row: Row<T>) => React.ReactNode;
  getRowClassName?: (row: T) => string;
  renderEmpty?: () => React.ReactNode;
};

export const Table = <T extends Record<string, any>>({
  table,
  renderAdditionalRowBefore,
  renderAdditionalRowAfter,
}: TableProps<T>) => {
  const rows = table.getRowModel().rows;
  return (
    <TableFlowbite>
      <TableFlowbite.Head>
        {table.getHeaderGroups().map((headerGroup) => (
          <React.Fragment key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableFlowbite.HeadCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableFlowbite.HeadCell>
            ))}
          </React.Fragment>
        ))}
      </TableFlowbite.Head>
      <TableFlowbite.Body>
        {rows.map((row) => (
          <React.Fragment key={row.id}>
            {renderAdditionalRowBefore?.(row)}
            <TableFlowbite.Row className={"border-b border-neutral-200"}>
              {row.getVisibleCells().map((cell) => (
                <TableFlowbite.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableFlowbite.Cell>
              ))}
            </TableFlowbite.Row>
            {renderAdditionalRowAfter?.(row)}
          </React.Fragment>
        ))}
      </TableFlowbite.Body>
    </TableFlowbite>
  );
};
