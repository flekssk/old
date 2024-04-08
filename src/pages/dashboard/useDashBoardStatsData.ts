import type { ReportResponse } from "@/api/report/types";
import { displayNumber } from "@/helpers/number";
import type { DashBoardStatsData } from "@/pages/dashboard/StatsDashBoard";
import { calculateDiff } from "@/helpers/calculateDiff";

export const useDashBoardStatsData = (
  currentData?: ReportResponse,
  prevData?: ReportResponse,
): null | DashBoardStatsData => {
  if (!currentData?.stats) {
    return null;
  }
  const result: DashBoardStatsData = {
    advertisingExpenses: {
      value: displayNumber(currentData.stats.advertisingExpenses),
    },
    averageRedemption: {
      value: displayNumber(currentData.stats.averageRedemption),
    },
    ddr: {
      value: displayNumber(currentData.stats.ddr),
    },
    marginality: {
      value: displayNumber(currentData.stats.marginality),
    },
    orders: {
      value: displayNumber(currentData.stats.orders),
    },
    ordersCount: {
      value: displayNumber(currentData.stats.ordersCount),
    },
    profit: {
      value: displayNumber(currentData.stats.profit),
    },
    returns: {
      value: displayNumber(currentData.stats.returns),
    },
    sale: {
      value: displayNumber(currentData.stats.sale),
    },
  };
  if (prevData) {
    if (prevData.stats.advertisingExpenses) {
      result.profit.diff = calculateDiff(
        currentData.stats.advertisingExpenses,
        prevData.stats.advertisingExpenses,
      );
    }
    if (prevData.stats.averageRedemption) {
      result.profit.diff = calculateDiff(
        currentData.stats.averageRedemption,
        prevData.stats.averageRedemption,
      );
    }
    if (prevData.stats.ddr) {
      result.profit.diff = calculateDiff(
        currentData.stats.ddr,
        prevData.stats.ddr,
      );
    }
    if (prevData.stats.marginality) {
      result.profit.diff = calculateDiff(
        currentData.stats.marginality,
        prevData.stats.marginality,
      );
    }
    if (prevData.stats.orders) {
      result.profit.diff = calculateDiff(
        currentData.stats.orders,
        prevData.stats.orders,
      );
    }
    if (prevData.stats.ordersCount) {
      result.profit.diff = calculateDiff(
        currentData.stats.ordersCount,
        prevData.stats.ordersCount,
      );
    }
    if (prevData.stats.profit) {
      result.profit.diff = calculateDiff(
        currentData.stats.profit,
        prevData.stats.profit,
      );
    }
    if (prevData.stats.returns) {
      result.profit.diff = calculateDiff(
        currentData.stats.returns,
        prevData.stats.returns,
      );
    }
    if (prevData.stats.sale) {
      result.profit.diff = calculateDiff(
        currentData.stats.sale,
        prevData.stats.sale,
      );
    }
  }

  return result;
};
