export const ENDPOINTS = {
  userInfo: "admin/user/:id",
  userList: "admin/user/list",
} as const;

export const QUERY_KEYS = {
  userList: "userList",
  userInfo: "userInfo",
} as const;
