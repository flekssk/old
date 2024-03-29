export const ENDPOINTS = {
  main: "report",
  filterAggregation: "report/filter-aggregation",
  article: (id: number) => `report/article/${id}`,
} as const;

export const QUERY_KEYS = {
  main: "main",
  filterAggregation: "filterAggregation",
  article: "article",
} as const;
