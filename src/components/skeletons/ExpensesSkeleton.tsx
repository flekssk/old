import { TableSkeleton } from "./TableSkeleton";

export const ExpensesSkeleton = () => {
  return (
    <div
      role="status"
      className="animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6"
    >
      <div className="mb-2">
        <div className="mb-2.5 h-5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="mb-4 h-7 w-60 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="mb-4 h-7 w-60 rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="mb-4 h-7 w-40 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
      <TableSkeleton />
    </div>
  );
};