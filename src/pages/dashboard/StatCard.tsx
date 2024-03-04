import { Card } from "flowbite-react";
import type { FC } from "react";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";

export interface StatCardProps {
  title: string;
  value: string;
  diff?: {
    value: string;
    percentage?: string;
    direction: "up" | "down";
    isPositive: boolean;
  };
}

export const StatCard: FC<StatCardProps> = ({ title, value, diff }) => {
  return (
    <Card>
      <h2>{title}</h2>
      <p className="text-3xl">{value}</p>
      {diff ? (
        <div className="flex items-center gap-1">
          <span>{diff.value}</span>
          <p
            className={`flex items-center gap-1 text-sm ${
              diff.isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {diff.direction === "up" ? <HiArrowUp /> : <HiArrowDown />}
            {diff.percentage ? `${diff.percentage}%` : null}
          </p>
        </div>
      ) : null}
    </Card>
  );
};
