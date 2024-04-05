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
}

export const StatCard: FC<StatCardProps> = ({ title, value, diff }) => {
  return (
    <Card
      theme={{
        root: { children: "flex h-full flex-col justify-center gap-1 p-3" },
      }}
    >
      <p className="text-sm">{title}</p>
      <p className="text-xl font-bold">{value}</p>
      {diff ? (
        <div className="flex items-center gap-1">
          <span>{diff.value}</span>
          {diff.direction ? (
            <p
              className={`flex items-center gap-1 text-sm ${
                diff.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              <>{diff.direction === "up" ? <HiArrowUp /> : <HiArrowDown />}</>

              {diff.percentage ? `${diff.percentage}%` : null}
            </p>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
};
