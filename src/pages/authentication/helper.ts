import { ENV } from "@/env";

export const getVkAuthUrl = (): string => {
  return `${ENV.API_URL}/connect/vk?redirect_uri=${ENV.VK_AUTH_REDIRECT_URL}`.replace(
    "//",
    "/",
  );
};

export const getYandexUrl = (): string => {
  return `${ENV.API_URL}/connect/yandex?redirect_uri=${ENV.YANDEX_AUTH_REDIRECT_URL}`.replace(
    "//",
    "/",
  );
};
