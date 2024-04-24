import {
  FiltersSkeleton,
  MainChartSkeleton,
  StatsSkeleton,
  RoundChartsSkeleton,
  TableSkeleton,
} from "@/components/skeletons";

export const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 px-4 pt-6">
      <FiltersSkeleton />
      <StatsSkeleton />
      <MainChartSkeleton />
      <RoundChartsSkeleton />
      <TableSkeleton />
    </div>
  );
};
