export const ENDPOINTS = {
  expenseCategories: "/expense-categories",
  expenses: "/expenses",
  update: "/expenses/{id}",
  delete: "/expenses/{id}",
} as const;

export const QUERY_KEYS = {
  expenseCategories: "expenseCategories",
  expenses: "expenses",
} as const;
