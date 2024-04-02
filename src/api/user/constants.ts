export const ENDPOINTS = {
  profile: "/user/profile",
  settingsAll: "/user/settings/all",
  settingsSave: "/user/settings/save",
  settingsDelete: "/user/settings/:id",
  settingsItem: "/user/settings/:id",
  settingsItemByName: "/user/settings/by-name/:name",
  taxation: "taxation",
} as const;

export const QUERY_KEYS = {
  profile: "profile",
  settingsAll: "settingsAll",
  settingsItem: "settingsItem",
  settingsItemByName: "settingsItemByName",
  user: "user",
} as const;
