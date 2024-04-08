import { displayNumber } from "@/helpers/number";

export const calculateDiff = (
  current: number,
  prev: number,
  {
    positiveIfGrow,
    isPercentage,
  }: {
    positiveIfGrow: boolean;
    isPercentage?: boolean;
  } = { positiveIfGrow: true },
): {
  value: string;
  percentage?: string;
  direction?: "up" | "down";
  isPositive: boolean;
} => {
  if (current === prev) {
    return {
      value: displayNumber(prev),
      isPositive: true,
    };
  }

  return {
    value: displayNumber(prev),
    percentage: isPercentage
      ? displayNumber(current - prev)
      : displayNumber((current / prev) * 100 - 100),
    direction: current > prev ? "up" : "down",
    isPositive: current > prev ? positiveIfGrow : !positiveIfGrow,
  };
};
