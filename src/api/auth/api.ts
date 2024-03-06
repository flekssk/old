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
): Promise<ResetPasswordResponse> =>
  api
    .post<ResetPasswordResponse>(ENDPOINTS.resetPassword, payload)
    .then((res) => res.data);

export const resetPasswordByToken = (
  payload: ResetPasswordByTokenRequest,
): Promise<ResetPasswordByTokenResponse> =>
  api
    .post<ResetPasswordByTokenResponse>(ENDPOINTS.resetPasswordByToken, payload)
    .then((res) => res.data);
