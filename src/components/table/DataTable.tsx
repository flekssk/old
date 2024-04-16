import type {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  Row,
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
import { Table as TableFlowbite, Button, Checkbox } from "flowbite-react";
import { ColumnSettings } from "./ColumnSettings";
import { cn } from "@/utils/utils";
import { GroupSettings } from "./GroupSettings";
import { SaveGroupModal } from "./SaveGroupModal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  cellRangeSelection?: boolean;
  className?: string;
  resizeColumns?: boolean;
  columnSettings?: boolean;
  groupSettings?: boolean;
  groupSettingsName?: string;
  storedSettingsName?: string;
}

export function DataTable<TData, TValue>({
  columns: initialColumns,
  data,
  cellRangeSelection,
  className,
  resizeColumns,
  columnSettings,
  groupSettings,
  groupSettingsName = "default-group-settings",
  storedSettingsName = "default-data-table-settings",
}: DataTableProps<TData, TValue>) {
  const [columns, setColumns] = React.useState<ColumnDef<TData, TValue>[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [displayedData, setDisplayedData] = React.useState<number[]>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [isOpenGroupSettingsModal, setIsOpenGroupSettingsModal] =
    React.useState(false);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(() => {
      return initialColumns.reduce((acc, column) => {
        acc[column.id as string] = true;
        return acc;
      }, {} as VisibilityState);
    });

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

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
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const { getRowModel } = table;

  // getCellsBetweenId returns all cell Ids between two cell Id, and then setState for selectedCellIds

  const model = getRowModel();
  const rows = model.rows;
  const rowsSelected =
    Object.keys(rowSelection)
      .map(
        (row) =>
          // TODO-mchuev: Types
          rows.find((selectedRow) => row === selectedRow.id)?.original.article,
      )
      .filter((article): article is number => !!article) || [];

  const renderRows = displayedData.length
    ? displayedData
        // TODO-mchuev: Types
        ?.map((data) => rows.find((row) => data === row.original.article))
        .filter((row): row is Row<TData> => !!row)
    : rows;

  const isEmptyRowSelection = Object.keys(rowSelection).length === 0;

  const { getBodyProps, getCellProps, calculatedCellValues } =
    useCellRangeSelection(table, cellRangeSelection);

  React.useEffect(() => {
    const updatedColumns = [...initialColumns];
    if (groupSettings) {
      updatedColumns.unshift({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        size: 65,
      });
    }
    setColumns(updatedColumns);
  }, [initialColumns, groupSettings]);

  return (
    <div>
      <div className="flex items-center justify-end gap-2 py-2">
        <div>
          {groupSettings && (
            <GroupSettings
              groupSettingsName={groupSettingsName}
              setDisplayedData={setDisplayedData}
            />
          )}
        </div>
        <div>
          {columnSettings && (
            <ColumnSettings
              storedSettingsName={storedSettingsName}
              table={table}
              visibilityState={columnVisibility}
            />
          )}
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
            {renderRows.map((row) => (
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
      <div
        className={`${isEmptyRowSelection ? "justify-end" : "justify-between"} flex items-center p-4`}
      >
        {groupSettings && !isEmptyRowSelection && (
          <div>
            <Button
              color="blue"
              onClick={() => setIsOpenGroupSettingsModal(true)}
            >
              Сохранить в группу
            </Button>
          </div>
        )}
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
      <SaveGroupModal
        groupSettingsName={groupSettingsName}
        rowsSelected={rowsSelected}
        isOpen={isOpenGroupSettingsModal}
        onClose={() => setIsOpenGroupSettingsModal(false)}
      />
    </div>
  );
}
