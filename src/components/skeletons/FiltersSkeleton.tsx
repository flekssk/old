export const FiltersSkeleton = () => {
  return (
    <div className="flex w-full justify-between">
      <div role="status" className="max-w-lg animate-pulse">
        <div className="mb-4 h-5 w-40 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex gap-2">
          <div className="mb-4 h-7 w-80 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-4 h-7 w-80 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-4 h-7 w-80 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
      <div role="status" className="max-w-lg animate-pulse">
        <div className="mb-4 h-5 w-40 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex gap-2">
          <div className="mb-4 h-7 w-80 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-4 h-7 w-80 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-4 h-7 w-80 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};
