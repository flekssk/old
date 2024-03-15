export const ENDPOINTS = {
  accountList: "wb/accounts",
  createAccount: "wb/accounts",
  updateAccount: "wb/accounts/:id",
  deleteAccount: "wb/accounts/:id",
  articles: "article",
} as const;

export const QUERY_KEYS = {
  accountList: "accountList",
  articleList: "articleList",
} as const;
