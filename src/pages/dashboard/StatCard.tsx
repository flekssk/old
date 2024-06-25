import { Card } from "flowbite-react";
import type { FC } from "react";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";

export interface StatCardProps {
  title: string;
  value: string;
  diff?: {
    value: string;
    percentage?: string;
    direction?: "up" | "down";
    isPositive: boolean;
  };
  isCombined?: boolean;
  secondaryValue?: string;
  secondaryDiff?: {
    value?: string;
    percentage?: string;
    direction?: "up" | "down";
    isPositive: boolean;
  };
  unitForValue?: string;
  unitForSecondaryValue?: string;
}

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  diff,
  isCombined = false,
  secondaryValue,
  secondaryDiff,
  unitForValue,
  unitForSecondaryValue,
}) => {
  if (value === "0") return null;

  return (
    <Card
      theme={{
        root: { children: "flex h-full flex-col justify-center gap-1 p-3" },
      }}
    >
      <p className="text-sm">{title}</p>
      <p className="font-bold md:text-lg xl:text-xl">
        {value} {unitForValue ? `${unitForValue}` : ""}
        {isCombined && secondaryValue
          ? ` / ${secondaryValue} ${unitForSecondaryValue ? `${unitForSecondaryValue}` : ""}`
          : ""}
      </p>
      {(diff || (isCombined && secondaryDiff)) && (
        <div className="flex items-center gap-1">
          {diff && (
            <p
              className={`flex items-center gap-1 md:text-xs xl:text-sm ${
                diff.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {diff.direction === "up" ? <HiArrowUp /> : <HiArrowDown />}
              {`${diff.value} ${diff.percentage ? `(${diff.percentage}%)` : ""}`}
            </p>
          )}
        </div>
      )}
    </Card>
  );
};
