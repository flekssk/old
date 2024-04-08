import type { FC } from "react";
import type { StatCardProps } from "../dashboard/StatCard";
import { StatCard } from "../dashboard/StatCard";

export type ProductStatsData = {
  profit: Omit<StatCardProps, "title">;
  averageRedemption: Omit<StatCardProps, "title">;
  roi: Omit<StatCardProps, "title">;
  profitability: Omit<StatCardProps, "title">;
  drr: Omit<StatCardProps, "title">;
};

type StatProps = {
  data: ProductStatsData;
};

export const StatsProduct: FC<StatProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 2xl:grid-cols-5">
      <StatCard title="Чистая прибыль" {...data.profit} />
      <StatCard title="Процент выкупа" {...data.averageRedemption} />
      <StatCard title="ROI" {...data.roi} />
      <StatCard title="Маржинальность" {...data.profitability} />
      <StatCard title="ДРР" {...data.drr} />
    </div>
  );
};
