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
): Promise<RegistrationResponse> =>
  api
    .post<RegistrationResponse>(ENDPOINTS.registration, payload)
    .then((res) => res.data);

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
