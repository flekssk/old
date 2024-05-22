import type {
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { CSSProperties } from "react";
import React from "react";
import { useCellRangeSelection } from "./useRangeSelection";
import { displayNumber } from "@/helpers/number";
import { Table as TableFlowbite, Button, Checkbox } from "flowbite-react";
import { ColumnSettings } from "./ColumnSettings";
import { cn } from "@/utils/utils";
import { GroupSettings } from "./GroupSettings";
import { SaveGroupModal } from "./SaveGroupModal";
import { useSaveSettingsMutation } from "@/api/user";
import { ServerSuccess } from "../ServerSuccess";
import { ServerError } from "../ServerError";
import type { StoredGroupSettings } from "@/types/types";
import { TableFilters } from "./TableFilters";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  cellRangeSelection?: boolean;
  className?: string;
  wrapperClassName?: string;
  resizeColumns?: boolean;
  columnSettings?: boolean;
  groupSettings?: boolean;
  groupSettingsName?: string;
  storedSettingsName?: string;
}

const getCommonPinningStyles = (
  column: Column<unknown, unknown>,
  isHeader?: boolean,
): CSSProperties => {
  const isPinned = column.getIsPinned();
  return {
    background: isHeader ? "white" : "inherit",
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

export function DataTable<TData, TValue>({
  columns: initialColumns,
  data,
  cellRangeSelection,
  className,
  wrapperClassName,
  resizeColumns,
  columnSettings,
  groupSettings,
  groupSettingsName = "default-group-settings",
  storedSettingsName = "default-data-table-settings",
}: DataTableProps<TData, TValue>) {
  const [visibleFilterColumn, setVisibleFilterColumn] =
    React.useState<string>();
  const [columns, setColumns] = React.useState<ColumnDef<TData, TValue>[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
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
  const saveSettingsMutation =
    useSaveSettingsMutation<Record<string, StoredGroupSettings>>();

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    enableMultiSort: false,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnPinning: {
        left: ["select", "vendorCode"],
      },
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
          //@ts-expect-error TODO-mchuev: Types
          rows.find((selectedRow) => row === selectedRow.id)?.original.article,
      )
      .filter((article): article is number => !!article) || [];

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
    <div className={cn("flex flex-col", wrapperClassName)}>
      <div className="flex shrink-0 items-center justify-end gap-2 pb-2">
        <div>
          {groupSettings && (
            <GroupSettings groupSettingsName={groupSettingsName} />
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
          <TableFlowbite.Head className="sticky top-0 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableFlowbite.HeadCell
                    key={header.id}
                    className="relative"
                    style={{
                      width: header.getSize(),
                      ...getCommonPinningStyles(
                        header.column as Column<unknown, unknown>,
                        true,
                      ),
                    }}
                  >
                    <div className="relative flex items-center justify-between">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      <TableFilters
                        column={header.column}
                        visibleFilterColumn={visibleFilterColumn}
                        setVisibleFilterColumn={setVisibleFilterColumn}
                      />
                    </div>
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
                        style={{
                          width: cell.column.getSize(),
                          ...getCommonPinningStyles(
                            cell.column as Column<unknown, unknown>,
                          ),
                        }}
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
        className={`${isEmptyRowSelection ? "justify-end" : "justify-between"} flex shrink-0 items-center p-4`}
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
      <div className="mt-1 w-full">
        {/* @ts-expect-error TODO-mchuev: Types meessage */}
        <ServerSuccess message={saveSettingsMutation.data?.meessage} />
        <ServerError mutation={saveSettingsMutation} className="mt-3" />
      </div>
      <SaveGroupModal
        saveSettingsMutation={saveSettingsMutation}
        groupSettingsName={groupSettingsName}
        rowsSelected={rowsSelected}
        isOpen={isOpenGroupSettingsModal}
        onClose={() => setIsOpenGroupSettingsModal(false)}
      />
    </div>
  );
}
