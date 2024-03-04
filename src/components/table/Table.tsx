import React, { useMemo, useRef, useState } from "react";
import type { Row, Table as TanstackTable } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { Table as TableFlowbite } from "flowbite-react";
import classNames from "classnames";

type TableProps<T extends Record<string, unknown>> = {
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

function getCellsBetweenId<T extends Record<string, unknown>>(
  table: TanstackTable<T>,
  startSelectedCellId: string,
  endSelectedCellId: string,
): {
  cells: string[];
  startRowIndex: number;
  endRowIndex: number;
  startCellIndex: number;
  endCellIndex: number;
} {
  const model = table.getRowModel();
  const [startRowId, startCellId] = startSelectedCellId.split("_") as [
    string,
    string,
  ];
  const [endRowId, endCellId] = endSelectedCellId.split("_") as [
    string,
    string,
  ];

  const rows = model.rowsById ?? {};

  const cellsIndexes: Record<string, number> =
    model.rows[0]?.getVisibleCells().reduce(
      (acc, cell) => {
        const cellId = cell.id.split("_")[1] as string;
        acc[cellId] = cell.column.getIndex();

        return acc;
      },
      {} as Record<string, number>,
    ) ?? {};

  const cellKeysByIndex: Record<number, string> =
    model.rows[0]?.getVisibleCells().reduce(
      (acc, cell) => {
        const cellId = cell.id.split("_")[1] as string;
        acc[cell.column.getIndex()] = cellId;

        return acc;
      },
      {} as Record<number, string>,
    ) ?? {};

  const startRowIndex = Math.min(
    rows[startRowId]?.index ?? 0,
    rows[endRowId]?.index ?? 0,
  );

  const endRowIndex = Math.max(
    rows[startRowId]?.index ?? 0,
    rows[endRowId]?.index ?? 0,
  );

  const startCellIndex = Math.min(
    cellsIndexes[startCellId] ?? 0,
    cellsIndexes[endCellId] ?? 0,
  );

  const endCellIndex = Math.max(
    cellsIndexes[startCellId] ?? 0,
    cellsIndexes[endCellId] ?? 0,
  );

  const cells: string[] = [];

  for (let i = startRowIndex; i <= endRowIndex; i++) {
    for (let j = startCellIndex; j <= endCellIndex; j++) {
      cells.push(`${i}_${cellKeysByIndex[j]}`);
    }
  }

  return {
    cells,
    startRowIndex,
    endRowIndex,
    startCellIndex,
    endCellIndex,
  };
}

export const Table = <T extends Record<string, unknown>>({
  table,
  renderAdditionalRowBefore,
  renderAdditionalRowAfter,
}: TableProps<T>) => {
  const { getRowModel } = table;
  const isSelectionEnabled = useRef(false);

  const [selectedStartCell, setSelectedStartCell] = useState<string | null>();
  const [selectedEndCell, setSelectedEndCell] = useState<string | null>();

  const {
    cellsSelected,
    startRowIndex,
    endRowIndex,
    startCellIndex,
    endCellIndex,
  } = useMemo(() => {
    const result: Record<string, boolean> = {};
    const pointers = {
      startRowIndex: 0,
      endRowIndex: 0,
      startCellIndex: 0,
      endCellIndex: 0,
    };

    if (selectedStartCell && selectedEndCell) {
      const { cells, ...other } = getCellsBetweenId(
        table,
        selectedStartCell,
        selectedEndCell,
      );

      pointers.startRowIndex = other.startRowIndex;
      pointers.endRowIndex = other.endRowIndex;
      pointers.startCellIndex = other.startCellIndex;
      pointers.endCellIndex = other.endCellIndex;
      for (const cellId of cells) {
        result[cellId] = true;
      }
    }

    return {
      cellsSelected: result,
      ...pointers,
    };
  }, [selectedStartCell, selectedEndCell]);

  // getCellsBetweenId returns all cell Ids between two cell Id, and then setState for selectedCellIds

  const model = getRowModel();
  const rows = model.rows;

  const cellKeysByIndex: Record<number, string> = useMemo(() => {
    return (
      model.rows[0]?.getVisibleCells().reduce(
        (acc, cell) => {
          const cellId = cell.id.split("_")[1] as string;
          acc[cell.column.getIndex()] = cellId;

          return acc;
        },
        {} as Record<number, string>,
      ) ?? {}
    );
  }, [model]);

  return (
    <TableFlowbite striped>
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
      <TableFlowbite.Body
        onMouseDown={() => {
          isSelectionEnabled.current = true;
        }}
        onMouseUp={() => {
          isSelectionEnabled.current = false;
        }}
        onMouseLeave={() => {
          isSelectionEnabled.current = false;
        }}
      >
        {rows.map((row) => (
          <React.Fragment key={row.id}>
            {renderAdditionalRowBefore?.(row)}
            <TableFlowbite.Row className=" border-b">
              {row.getVisibleCells().map((cell, index) => {
                return (
                  <TableFlowbite.Cell
                    onPointerEnter={() => {
                      if (isSelectionEnabled.current) {
                        setSelectedEndCell(cell.id);
                      }
                    }}
                    onMouseDown={(e) => {
                      if (e.shiftKey && selectedStartCell) {
                        setSelectedEndCell(cell.id);
                      } else {
                        setSelectedStartCell(cell.id);
                        setSelectedEndCell(cell.id);
                      }

                      setTimeout(() => {
                        isSelectionEnabled.current = true;
                      }, 50);
                    }}
                    className={classNames("select-none", {
                      "bg-primary-100": cellsSelected[cell.id],
                      "hover:bg-primary-100": isSelectionEnabled.current,
                      "border-r border-primary-300":
                        `${row.id}_${cellKeysByIndex[endCellIndex]}` ===
                          cell.id &&
                        row.index >= startRowIndex &&
                        row.index <= endRowIndex,
                      "border-l border-primary-300":
                        `${row.id}_${cellKeysByIndex[startCellIndex]}` ===
                          cell.id &&
                        row.index >= startRowIndex &&
                        row.index <= endRowIndex,
                      "border-t border-primary-300":
                        row.index === startRowIndex &&
                        index >= startCellIndex &&
                        index <= endCellIndex,
                      "border-b border-primary-300":
                        row.index === endRowIndex &&
                        index >= startCellIndex &&
                        index <= endCellIndex,
                    })}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableFlowbite.Cell>
                );
              })}
            </TableFlowbite.Row>
            {renderAdditionalRowAfter?.(row)}
          </React.Fragment>
        ))}
      </TableFlowbite.Body>
    </TableFlowbite>
  );
};
