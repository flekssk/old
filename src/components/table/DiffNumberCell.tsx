import { displayNumber } from "@/helpers/number";
import type { CellContext } from "@tanstack/react-table";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const DiffNumberCell = <T extends unknown>(
  cellContext: CellContext<T, number>,
) => {
  //  @ts-expect-error types problem
  const prev = cellContext.row.original.prev;

  const meta = (cellContext.column.columnDef.meta || {}) as {
    suffix?: string;
    positiveIfGrow?: boolean;
    displayDiff?: boolean;
  };
  const positiveIfGrow = meta.positiveIfGrow ?? true;
  const suffix = meta.suffix ?? null;
  const prevValue = prev ? prev[cellContext.column.id as keyof T] : null;
  const displayDiff = meta.displayDiff ?? false;

  let direction: "up" | "down" | null = null;
  let diff: number | null = null;
  let isPositive = true;
  if (
    prevValue !== null &&
    typeof prevValue === "number" &&
    cellContext.getValue() !== prevValue
  ) {
    diff = (cellContext.getValue() as number) - prevValue;
    direction = cellContext.getValue() > prevValue ? "up" : "down";
    isPositive =
      cellContext.getValue() > prevValue ? positiveIfGrow : !positiveIfGrow;
  }

  const positiveClass =
    direction === null ? "" : isPositive ? "text-green-500" : "text-red-500";

  return (
    <>
      <div>
        {displayNumber(cellContext.getValue())}
        {suffix ? <>&nbsp;{suffix}</> : null}
      </div>
      {prevValue ? (
        <div className={`flex items-center gap-1 text-xs ${positiveClass}`}>
          {displayNumber(
            displayDiff ? (diff as number) : (prevValue as number),
          )}
          {suffix ? <>&nbsp;{suffix}</> : null}
          {direction === null ? null : (
            <>{direction === "up" ? <HiArrowUp /> : <HiArrowDown />}</>
          )}
        </div>
      ) : null}
    </>
  );
};
