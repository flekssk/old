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
    profitability: {
      value: displayNumber(currentData.stats.profitability),
    },
    roi: {
      value: displayNumber(currentData.stats.roi),
    },
    salesCount: {
      value: displayNumber(currentData.stats.totalSales || 0),
    },
  };
  if (prevData) {
    if (prevData.stats.profitability) {
      result.profitability.diff = calculateDiff(
        currentData.stats.profitability,
        prevData.stats.profitability,
        { isPercentage: true, positiveIfGrow: true },
      );
    }

    if (prevData.stats.roi) {
      result.roi.diff = calculateDiff(
        currentData.stats.roi,
        prevData.stats.roi,
        { isPercentage: true, positiveIfGrow: true },
      );
    }
    if (prevData.stats.advertisingExpenses) {
      result.advertisingExpenses.diff = calculateDiff(
        currentData.stats.advertisingExpenses,
        prevData.stats.advertisingExpenses,
      );
    }
    if (prevData.stats.averageRedemption) {
      result.averageRedemption.diff = calculateDiff(
        currentData.stats.averageRedemption,
        prevData.stats.averageRedemption,
        { isPercentage: true, positiveIfGrow: true },
      );
    }
    if (prevData.stats.ddr) {
      result.ddr.diff = calculateDiff(
        currentData.stats.ddr,
        prevData.stats.ddr,
        { isPercentage: true, positiveIfGrow: false },
      );
    }
    if (prevData.stats.marginality) {
      result.marginality.diff = calculateDiff(
        currentData.stats.marginality,
        prevData.stats.marginality,
      );
    }
    if (prevData.stats.orders) {
      result.orders.diff = calculateDiff(
        currentData.stats.orders,
        prevData.stats.orders,
      );
    }
    if (prevData.stats.ordersCount) {
      result.ordersCount.diff = calculateDiff(
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
      result.returns.diff = calculateDiff(
        currentData.stats.returns,
        prevData.stats.returns,
      );
    }
    if (prevData.stats.sale) {
      result.sale.diff = calculateDiff(
        currentData.stats.sale,
        prevData.stats.sale,
      );
    }

    if (prevData.stats.totalSales) {
      result.salesCount.diff = calculateDiff(
        currentData.stats.totalSales || 0,
        prevData.stats.totalSales,
      );
    }
  }
  console.log("🚀 ~ result:", currentData, prevData, result);
  return result;
};
