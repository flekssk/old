import type { FC } from "react";
import type { StatCardProps } from "../dashboard/StatCard";
import { StatCard } from "../dashboard/StatCard";

export type ProductStatsData = {
  profit: Omit<StatCardProps, "title">;
  averageRedemption: Omit<StatCardProps, "title">;
  roi: Omit<StatCardProps, "title">;
  profitability: Omit<StatCardProps, "title">;
  drr: Omit<StatCardProps, "title">;
  advertisingExpenses: Omit<StatCardProps, "title">;
  marginality: Omit<StatCardProps, "title">;
  orders: Omit<StatCardProps, "title">;
  ordersCount: Omit<StatCardProps, "title">;
  returns: Omit<StatCardProps, "title">;
  sale: Omit<StatCardProps, "title">;
  salesCount: Omit<StatCardProps, "title">;
  toTransfer: Omit<StatCardProps, "title">;
  logistics: Omit<StatCardProps, "title">;
  storage: Omit<StatCardProps, "title">;
};

type StatProps = {
  data: ProductStatsData;
};

export const StatsProduct: FC<StatProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 2xl:grid-cols-5">
      <StatCard title="Чистая прибыль" {...data.profit} />
      <StatCard title="К перечислению" {...data.toTransfer} />
      <StatCard title="Процент выкупа" {...data.averageRedemption} />
      <StatCard
        title="Продажи"
        value={data.sale.value}
        diff={data.sale.diff}
        secondaryValue={data.salesCount.value}
        secondaryDiff={data.salesCount.diff}
        unitForValue="р"
        unitForSecondaryValue="шт"
        isCombined
      />
      <StatCard title="Маржинальность" {...data.profitability} />
      <StatCard title="ROI" {...data.roi} />
      <StatCard
        title="ДРР"
        value={data.drr.value}
        diff={data.drr.diff}
        secondaryValue={data.advertisingExpenses.value}
        secondaryDiff={{
          ...data.advertisingExpenses.diff,
          isPositive: !data.advertisingExpenses.diff?.isPositive,
        }}
        unitForValue="%"
        unitForSecondaryValue="р"
        isCombined
      />
      <StatCard title="Логистика" {...data.logistics} />
      <StatCard title="Хранение" {...data.storage} />
    </div>
  );
};
