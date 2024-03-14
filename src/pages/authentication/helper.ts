import { ENV } from "@/env";
import { v4 as uuidv4 } from "uuid";

export const getVkAuthUrl = (): string => {
  const uuid = uuidv4(); // Сгенерируйте случайную строку — рекомендуем использовать представление не менее 36 символов. Далее эта строка используется для проверки, что запрос идет именно со стороны вашего приложения.
  const appId = ENV.VK_AUTH_APP_ID; // Идентификатор вашего приложения.
  const redirectUri = ENV.VK_AUTH_REDIRECT_URL; // Адрес для перехода после авторизации, который совпадает с доверенным редиректом из настроек приложения.
  const redirect_state = "auth-vk";
  const query = `uuid=${uuid}&app_id=${appId}&response_type=silent_token&redirect_uri=${redirectUri}&redirect_state=${redirect_state}`;
  return `https://id.vk.com/auth?${query}`;
};

export const getYandexUrl = (): string => {
  const clientId = ENV.VK_YANDEX_APP_ID;
  const redirectUri = ENV.YANDEX_AUTH_REDIRECT_URL;
  const state = "auth-yandex";
  const query = `response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
  return `https://oauth.yandex.ru/authorize?${query}`;
};
