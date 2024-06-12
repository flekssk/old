import type { IncomeCostItem } from "@/api/income/types";
import type { Article } from "@/api/wb/types";

export type ArticleWithCost = Article & {
  cost?: IncomeCostItem;
};
