export const TableSkeleton = () => {
  return (
    <div className="rounded-lg p-4 shadow dark:bg-gray-800">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                <div className="mb-4 h-3 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                <div className="mb-4 h-3 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                <div className="mb-4 h-3 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-3">
                <div className="h-4 w-20 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-36 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-24 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <div className="h-4 w-20 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-36 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-24 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <div className="h-4 w-20 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-36 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-24 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <div className="h-4 w-20 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-36 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-24 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <div className="h-4 w-20 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-36 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-24 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <div className="h-4 w-20 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-36 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
              <td className="px-4 py-3">
                <div className="h-4 w-24 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
