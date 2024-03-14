import {
  login,
  logout,
  registration,
  resetPassword,
  resetPasswordByToken,
  vk,
  yandex,
} from "./api";
import { createCustomMutation } from "../helper";

export const useLoginMutation = createCustomMutation(login);

export const useRegistrationMutation = createCustomMutation(registration);

export const useResetPasswordMutation = createCustomMutation(resetPassword);

export const useResetPasswordByTokenMutation =
  createCustomMutation(resetPasswordByToken);

export const useLogoutMutation = createCustomMutation(logout);

export const useVkAuthMutation = createCustomMutation(vk);

export const useYandexAuthNutation = createCustomMutation(yandex);
