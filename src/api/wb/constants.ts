export const ENDPOINTS = {
  accountList: "wb/accounts",
  createAccount: "wb/accounts",
  updateAccount: "wb/accounts/:id",
  deleteAccount: "wb/accounts/:id",
} as const;

export const QUERY_KEYS = {
  accountList: "accountList",
} as const;
