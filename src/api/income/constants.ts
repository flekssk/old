export const ENDPOINTS = {
  incomeList: "/income/list",
  incomeSync: "/income/sync",
  incomeCostSetBatch: "/income/cost/set-batch",
} as const;

export const QUERY_KEYS = {
  incomeList: "incomeList",
  incomeListInfinity: "incomeListInfinity",
} as const;
