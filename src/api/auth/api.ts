import { api } from "../instance";
import { ENDPOINTS } from "./constants";
import type {
  LoginRequest,
  LoginResponse,
  RegistrationRequest,
  RegistrationResponse,
  ResetPasswordByTokenRequest,
  ResetPasswordByTokenResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "./types";

export const registration = (
  payload: RegistrationRequest,
): Promise<RegistrationResponse> => {
  const formData = new FormData();
  formData.append("registration_form[email]", payload.email);
  formData.append("registration_form[name]", payload.name);
  formData.append("registration_form[plainPassword]", payload.plainPassword);
  return api
    .post<RegistrationResponse>(ENDPOINTS.registration, formData)
    .then((res) => res.data);
};

export const login = (payload: LoginRequest): Promise<LoginResponse> =>
  api.post<LoginResponse>(ENDPOINTS.login, payload).then((res) => res.data);

export const logout = () => api.get(ENDPOINTS.logout);

export const resetPassword = (
  payload: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
  const formData = new FormData();
  formData.append("email", payload.email);
  return api
    .post<ResetPasswordResponse>(ENDPOINTS.resetPassword, formData)
    .then((res) => res.data);
};

export const resetPasswordByToken = (
  payload: ResetPasswordByTokenRequest,
): Promise<ResetPasswordByTokenResponse> => {
  const formData = new FormData();
  formData.append("reset_password_token", payload.token);
  formData.append(
    "change_password_form[plainPassword][first]",
    payload.plainPassword.first,
  );
  formData.append(
    "change_password_form[plainPassword][second]",
    payload.plainPassword.second,
  );
  return api
    .post<ResetPasswordByTokenResponse>(
      ENDPOINTS.resetPasswordByToken,
      formData,
    )
    .then((res) => res.data);
};
