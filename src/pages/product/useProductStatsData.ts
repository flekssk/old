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
    drr: { value: displayNumber(currentData.stats.ddr) },
  };

  if (prevData) {
    if (prevData.stats.profit) {
      result.profit.diff = calculateDiff(
        currentData.stats.profit,
        prevData.stats.profit,
      );
    }

    if (prevData.stats.averageRedemption) {
      result.averageRedemption.diff = calculateDiff(
        currentData.stats.averageRedemption,
        prevData.stats.averageRedemption,
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

    if (prevData.stats.profitability) {
      result.profitability.diff = calculateDiff(
        currentData.stats.profitability,
        prevData.stats.profitability,
        { isPercentage: true, positiveIfGrow: true },
      );
    }

    if (prevData.stats.ddr) {
      result.drr.diff = calculateDiff(
        currentData.stats.ddr,
        prevData.stats.ddr,
        { isPercentage: true, positiveIfGrow: false },
      );
    }
  }
  return result;
};
