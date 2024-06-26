import type { ReportItemResponse } from "@/api/report/types";
import type { ProductStatsData } from "./StatsProduct";
import { displayNumber } from "@/helpers/number";
import { calculateDiff } from "@/helpers/calculateDiff";

export const useProductStatsData = (
  currentData?: ReportItemResponse,
  prevData?: ReportItemResponse,
): null | ProductStatsData => {
  if (!currentData?.stats) {
    return null;
  }

  const result: ProductStatsData = {
    profit: { value: displayNumber(currentData.stats.profit) },
    averageRedemption: {
      value: displayNumber(currentData.stats.averageRedemption),
    },
    roi: { value: displayNumber(currentData.stats.roi) },
    profitability: { value: displayNumber(currentData.stats.profitability) },
    drr: { value: displayNumber(currentData.stats.drr) },
    advertisingExpenses: {
      value: displayNumber(currentData.stats.advertisingExpense),
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
    returns: {
      value: displayNumber(currentData.stats.returns),
    },
    sale: {
      value: displayNumber(currentData.stats.sales),
    },
    salesCount: {
      value: displayNumber(currentData.stats.totalSales || 0),
    },
    toTransfer: {
      value: displayNumber(currentData.stats.toTransfer || 0),
    },
    logistics: {
      value: displayNumber(currentData.stats.logistics),
    },
    storage: {
      value: displayNumber(currentData.stats.storage),
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

    if (prevData.stats.advertisingExpense) {
      result.advertisingExpenses.diff = calculateDiff(
        currentData.stats.advertisingExpense,
        prevData.stats.advertisingExpense,
      );
    }
    if (prevData.stats.averageRedemption) {
      result.averageRedemption.diff = calculateDiff(
        currentData.stats.averageRedemption,
        prevData.stats.averageRedemption,
        { isPercentage: true, positiveIfGrow: true },
      );
    }

    if (prevData.stats.drr) {
      result.drr.diff = calculateDiff(
        currentData.stats.drr,
        prevData.stats.drr,
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

    if (prevData.stats.sales) {
      result.sale.diff = calculateDiff(
        currentData.stats.sales,
        prevData.stats.sales,
      );
    }

    if (prevData.stats.totalSales) {
      result.salesCount.diff = calculateDiff(
        currentData.stats.totalSales || 0,
        prevData.stats.totalSales,
      );
    }

    if (prevData.stats.toTransfer) {
      result.toTransfer.diff = calculateDiff(
        currentData.stats.toTransfer,
        prevData.stats.toTransfer,
      );
    }

    if (prevData.stats.logistics) {
      result.logistics.diff = calculateDiff(
        currentData.stats.logistics || 0,
        prevData.stats.logistics,
      );
    }

    if (prevData.stats.storage) {
      result.storage.diff = calculateDiff(
        currentData.stats.storage || 0,
        prevData.stats.storage,
      );
    }
  }
  return result;
};
