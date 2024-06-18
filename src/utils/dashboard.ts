import type {
  ArticleFilter,
  NumberFilter,
  TextFilter,
} from "@/api/report/types";

export const isNumberFilter = (
  filter: TextFilter | NumberFilter | ArticleFilter,
): filter is NumberFilter => {
  return (
    typeof filter === "object" &&
    filter !== null &&
    ("min" in filter || "max" in filter)
  );
};

export const isTextFilter = (
  filter: TextFilter | NumberFilter | ArticleFilter,
): filter is TextFilter => {
  return typeof filter === "object" && filter !== null && "value" in filter;
};
