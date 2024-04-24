export const RoundChartsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div
        role="status"
        className="animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6"
      >
        <div className="mb-8 h-4 w-48 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex size-32 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="relative size-28">
            <div className="absolute inset-0 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="absolute inset-0 animate-pulse rounded-full bg-gray-400 dark:bg-gray-500"></div>
          </div>
        </div>
      </div>
      <div
        role="status"
        className="animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6"
      >
        <div className="mb-8 h-4 w-48 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex size-32 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="relative size-28">
            <div className="absolute inset-0 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="absolute inset-0 animate-pulse rounded-full bg-gray-400 dark:bg-gray-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
