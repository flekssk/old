import { StatCard, type StatCardProps } from "./StatCard";

export type DashBoardStatsData = {
  advertisingExpenses: Omit<StatCardProps, "title">;
  averageRedemption: Omit<StatCardProps, "title">;
  ddr: Omit<StatCardProps, "title">;
  marginality: Omit<StatCardProps, "title">;
  orders: Omit<StatCardProps, "title">;
  ordersCount: Omit<StatCardProps, "title">;
  profit: Omit<StatCardProps, "title">;
  returns: Omit<StatCardProps, "title">;
  sale: Omit<StatCardProps, "title">;
  roi: Omit<StatCardProps, "title">;
  profitability: Omit<StatCardProps, "title">;
  salesCount: Omit<StatCardProps, "title">;
};

type StatProps = {
  data: DashBoardStatsData;
};

export const StatsDashBoard = ({ data }: StatProps) => (
  <div className="grid grid-cols-2 gap-2 md:grid-cols-4 2xl:grid-cols-5">
    <StatCard title="Чистая прибыль" {...data.profit} />
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
      value={data.ddr.value}
      diff={data.ddr.diff}
      secondaryValue={data.advertisingExpenses.value}
      secondaryDiff={data.advertisingExpenses.diff}
      unitForValue="%"
      unitForSecondaryValue="р"
      isCombined
    />
  </div>
);
