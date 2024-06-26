import { displayNumber } from "@/helpers/number";

export const calculateDiff = (
  current: number,
  prev: number,
  {
    positiveIfGrow,
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

  const difference = current - prev;
  const percentageChange = prev !== 0 ? (difference / prev) * 100 : 0;

  return {
    value: displayNumber(difference),
    percentage: displayNumber(percentageChange),
    direction: difference > 0 ? "up" : difference < 0 ? "down" : undefined,
    isPositive:
      difference > 0 ? positiveIfGrow : difference < 0 ? !positiveIfGrow : true,
  };
};
