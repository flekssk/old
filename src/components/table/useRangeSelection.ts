import { useMemo, useRef, useState } from "react";
import type { Table as TanstackTable, Cell, Row } from "@tanstack/react-table";
import classNames from "classnames";

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

export const useCellRangeSelection = <T extends Record<string, unknown>>(
  table: TanstackTable<T>,
  enabled: boolean = true,
) => {
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
  }, [selectedStartCell, selectedEndCell, table]);

  const model = table.getRowModel();
  const cellKeysByIndex: Record<number, string> =
    model.rows[0]?.getVisibleCells().reduce(
      (acc, cell) => {
        const cellId = cell.id.split("_")[1] as string;
        acc[cell.column.getIndex()] = cellId;

        return acc;
      },
      {} as Record<number, string>,
    ) ?? {};

  const getCellProps = (cell: Cell<T, unknown>, row: Row<T>, index: number) => {
    const onPointerEnter = () => {
      if (isSelectionEnabled.current) {
        setSelectedEndCell(cell.id);
      }
    };
    const onMouseDown = (e: React.MouseEvent) => {
      if (e.shiftKey && selectedStartCell) {
        setSelectedEndCell(cell.id);
      } else {
        setSelectedStartCell(cell.id);
        setSelectedEndCell(cell.id);
      }

      setTimeout(() => {
        isSelectionEnabled.current = true;
      }, 50);
    };
    const className = classNames("select-none", {
      "bg-primary-100": cellsSelected[cell.id],
      "hover:bg-primary-100": isSelectionEnabled.current,
      "border-r border-primary-300":
        `${row.id}_${cellKeysByIndex[endCellIndex]}` === cell.id &&
        row.index >= startRowIndex &&
        row.index <= endRowIndex,
      "border-l border-primary-300":
        `${row.id}_${cellKeysByIndex[startCellIndex]}` === cell.id &&
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
    });

    return enabled
      ? {
          onPointerEnter,
          onMouseDown,
          className,
        }
      : {};
  };

  const getBodyProps = () => {
    return enabled
      ? {
          onMouseDown: () => {
            isSelectionEnabled.current = true;
          },
          onMouseUp: () => {
            isSelectionEnabled.current = false;
          },
          onMouseLeave: () => {
            isSelectionEnabled.current = false;
          },
        }
      : {};
  };

  const calculatedCellValues = useMemo(() => {
    const result: { avg: number; count: number; sum: number } = {
      avg: 0,
      sum: 0,
      count: 0,
    };

    if (enabled) {
      const cells = Object.keys(cellsSelected);
      const model = table.getRowModel();
      const rows = model.rows;
      const avg: number[] = [];

      for (const cellId of cells) {
        const [rowId] = cellId.split("_");
        const row = rows.find((row) => row.id === rowId);
        const cell = row?.getAllCells().find((cell) => cell.id === cellId);

        const value = cell?.getValue();
        result.count++;
        if (value && !isNaN(Number(value))) {
          result.sum += Number(value);
          avg.push(Number(value));
        }
      }
      result.avg = avg.length ? result.sum / avg.length : 0;
    }
    return result;
  }, [table, cellsSelected, enabled]);

  return { getBodyProps, getCellProps, cellsSelected, calculatedCellValues };
};