export const ENDPOINTS = {
  list: "/other-deduction/wb",
  create: "/other-deduction/wb",
  update: (id: number) => `/other-deduction/wb/${id}`,
  delete: (id: number) => `/other-deduction/wb/${id}`,
} as const;

export const QUERY_KEYS = {
  list: "list",
} as const;
