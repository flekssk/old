import {
  FiltersSkeleton,
  MainChartSkeleton,
  RoundChartsSkeleton,
  StatsSkeleton,
  TableSkeleton,
  ProductInfoSkeleton,
} from "@/components/skeletons";

export const ProductSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 px-4 pt-6">
      <ProductInfoSkeleton />
      <FiltersSkeleton />
      <StatsSkeleton />
      <MainChartSkeleton />
      <RoundChartsSkeleton />
      <MainChartSkeleton />
      <TableSkeleton />
    </div>
  );
};
