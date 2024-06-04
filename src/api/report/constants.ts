export const ENDPOINTS = {
  main: "report",
  mainV2: "report/v2",
  week: "report/week",
  filterAggregation: "report/filter-aggregation",
  article: (id: number) => `report/article/${id}`,
  articleV2: (id: number) => `report/article/v2/${id}`,
} as const;

export const QUERY_KEYS = {
  main: "main",
  mainV2: "mainV2",
  filterAggregation: "filterAggregation",
  article: "article",
  articleV2: "articleV2",
  week: "week",
} as const;
