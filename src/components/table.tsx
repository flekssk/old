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
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={
                  "text-gray-400 text-sm font-gelatoBold leading-tight tracking-tight p-4 dark:text-white"
                }
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row) => (
          <React.Fragment key={row.id}>
            {renderAdditionalRowBefore?.(row)}
            <tr className={"border-b border-neutral-200"}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={
                    "text-gray-900 p-4 bg-white text-sm font-medium leading-tight tracking-tight  align-top dark:text-white dark:bg-black"
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            {renderAdditionalRowAfter?.(row)}
          </React.Fragment>
        ))}
      </tbody>
    </TableFlowbite>
  );
};
