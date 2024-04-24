export const MainChartSkeleton = () => {
  return (
    <div
      role="status"
      className="animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6"
    >
      <div className="mb-2">
        <div className="mb-2.5 h-5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex gap-2">
          <div className="flex">
            <div className="size-5 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="ml-2 h-5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="flex">
            <div className="size-5 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="ml-2 h-5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="flex">
            <div className="size-5 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="ml-2 h-5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="flex">
            <div className="size-5 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="ml-2 h-5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-baseline">
        <div className="h-72 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="ms-6 h-56 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="ms-6 h-72 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="ms-6 h-64 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="ms-6 h-80 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="ms-6 h-72 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="ms-6 h-80 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};
