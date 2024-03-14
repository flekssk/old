export const ROUTES = {
  login: "/login",
  registration: "/registration",
  logout: "/logout",
  resetPassword: "/reset-password",
  resetPasswordByToken: "/reset-password-with-token/:token",
  home: "/",
  authVk: "/auth/vk",
  authYandex: "/auth/yandex",
  unitTable: "/unit-table",
  settingsApiKeys: "/settings/api-keys",
  settings: "/settings/:tab?",
  settingsProfile: "/settings/profile",
} as const;