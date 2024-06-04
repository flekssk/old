import { FiltersSkeleton, TableSkeleton } from "@/components/skeletons";

export const ReportSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 px-4 pt-6">
      <FiltersSkeleton />
      <TableSkeleton />
    </div>
  );
};
