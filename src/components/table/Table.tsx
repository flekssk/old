import React, { useState } from "react";
import type { Row, Table as TanstackTable } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import {
  Checkbox,
  Dropdown,
  Pagination,
  Table as TableFlowbite,
} from "flowbite-react";
import { useCellRangeSelection } from "./useRangeSelection";
import { displayNumber } from "@/helpers/number";
import classNames from "classnames";
import { mockData } from "@/data/table";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import { useLocation } from "react-router-dom";

type TableProps<T extends Record<string, unknown>> = {
  table: TanstackTable<T>;
  className?: string;
  loading?: boolean;
  showFooter?: boolean;
  loadingRows?: number;
  showTableTitle?: boolean;
  showControllers?: boolean;
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
  showTableTitle = true,
  showControllers = true,
  cellRangeSelection = false,
  resizeColumns = false,
  className,
}: TableProps<T>) => {
  const { getRowModel } = table;
  const navigate = useNavigate();
  const location = useLocation();

  // checks if route is /cost to hide unessesary elements
  const isCostPage = location.pathname === ROUTES.cost;

  // getCellsBetweenId returns all cell Ids between two cell Id, and then setState for selectedCellIds

  const model = getRowModel();
  const rows = model.rows;
  const { getBodyProps, getCellProps, calculatedCellValues } =
    useCellRangeSelection(table, cellRangeSelection);

  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);
  return (
    <div>
      <div className="flex justify-between">
        {showTableTitle && <p className="mb-2 text-lg">Таблица</p>}
        {showControllers && (
          <div className="flex gap-3">
            <div className="flex gap-2 bg-[#F2F2F2] px-5 py-3">
              <img alt="groups" src="/images/table/groups.svg" />
              <Dropdown label="Группы" inline size="sm">
                <Dropdown.Item>
                  <strong>пункт 1</strong>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>пункт 2</Dropdown.Item>
                <Dropdown.Item>пункт 3</Dropdown.Item>
              </Dropdown>
            </div>
            <div className="flex gap-2 bg-[#F2F2F2] px-5 py-3">
              <img alt="groups" src="/images/table/columns.svg" />
              <Dropdown label="Стобцы" inline size="sm">
                <Dropdown.Item>
                  <strong>пункт 1</strong>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>пункт 2</Dropdown.Item>
                <Dropdown.Item>пункт 3</Dropdown.Item>
              </Dropdown>
            </div>
            <div className="flex gap-2 bg-[#F2F2F2] px-5 py-3">
              <img alt="groups" src="/images/table/export.svg" />
              <Dropdown label="Экспортировать" inline size="sm">
                <Dropdown.Item>
                  <strong>пункт 1</strong>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>пункт 2</Dropdown.Item>
                <Dropdown.Item>пункт 3</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        )}
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
            {!isCostPage && (
              <TableFlowbite.HeadCell className="p-4">
                <Checkbox />
              </TableFlowbite.HeadCell>
            )}
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
          <TableFlowbite.Body {...getBodyProps()}>
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                {renderAdditionalRowBefore?.(row)}
                <TableFlowbite.Row className="cursor-pointer border-b">
                  {!isCostPage && (
                    <TableFlowbite.Cell className="p-4">
                      <Checkbox />
                    </TableFlowbite.Cell>
                  )}
                  {row.getVisibleCells().map((cell, index) => {
                    return (
                      <TableFlowbite.Cell
                        {...getCellProps(cell, row, index)}
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
                {renderAdditionalRowAfter?.(row)}
              </React.Fragment>
            ))}
          </TableFlowbite.Body>
        </TableFlowbite>
      </div>
      <div className="flex justify-between">
        <button className="mt-4 bg-primary-500 px-4 py-1 text-primary-50">
          Добавить в группу
        </button>
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
      <div className="mt-5 flex items-center gap-5">
        <p className="">Всего {mockData.length} товара</p>
        <Pagination
          currentPage={currentPage}
          totalPages={100}
          onPageChange={onPageChange}
          previousLabel=""
          nextLabel=""
          showIcons
        />
        <Dropdown label="10 на странице" inline size="sm">
          <Dropdown.Item>
            <strong>пункт 1</strong>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>пункт 2</Dropdown.Item>
          <Dropdown.Item>пункт 3</Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};
