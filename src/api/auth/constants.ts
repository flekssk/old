export const ENDPOINTS = {
  registration: "/register",
  login: "/login",
  logout: "/logout",
  resetPassword: "/reset-password",
  resetPasswordByToken: "/reset-password/reset-by-token",
  vk: "/connect/vk/check",
  yandex: "/connect/yandex/check",
} as const;

export const QUERY_KEYS = {
  registration: "registration",
  login: "login",
  logout: "logout",
  resetPassword: "resetPassword",
  resetPasswordByToken: "resetPasswordByToken",
} as const;
