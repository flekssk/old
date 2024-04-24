export const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      <div
        role="status"
        className="animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6"
      >
        <div className="mb-2.5 h-3 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div
        role="status"
        className="animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6"
      >
        <div className="mb-2.5 h-3 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div
        role="status"
        className="animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6"
      >
        <div className="mb-2.5 h-3 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div
        role="status"
        className="animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6"
      >
        <div className="mb-2.5 h-3 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};
