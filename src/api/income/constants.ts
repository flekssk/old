export const ENDPOINTS = {
  incomeList: "/income/list",
  incomeSync: "/income/sync",
  incomeCostSetBatch: "/income/cost/set-batch",
  incomeCost: "/income/cost",
  incomeDiagram: "/income/diagram",
} as const;

export const QUERY_KEYS = {
  incomeList: "incomeList",
  incomeListInfinity: "incomeListInfinity",
  incomeCost: "incomeCost",
  incomeDiagram: "incomeDiagram",
} as const;
