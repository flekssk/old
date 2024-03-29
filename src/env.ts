export const ENV = {
  // @ts-expect-error for some reason typescript doesn't like the import
  API_URL: import.meta.env.VITE_API_URL,
  // @ts-expect-error for some reason typescript doesn't like the import
  VK_AUTH_REDIRECT_URL: import.meta.env.VITE_VK_AUTH_REDIRECT_URL,
  // @ts-expect-error for some reason typescript doesn't like the import
  VK_AUTH_APP_ID: import.meta.env.VITE_VK_AUTH_APP_ID,
  // @ts-expect-error for some reason typescript doesn't like the import
  VK_YANDEX_APP_ID: import.meta.env.VITE_VK_YANDEX_APP_ID,
  // @ts-expect-error for some reason typescript doesn't like the import
  YANDEX_AUTH_REDIRECT_URL: import.meta.env.VITE_YANDEX_AUTH_REDIRECT_URL,
} as const;
