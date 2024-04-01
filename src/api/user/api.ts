import { api } from "../instance";
import { ENDPOINTS } from "./constants";
import type {
  ReportTaxationDataResponse,
  Settings,
  SettingsResponse,
  UserProfileResponse,
} from "./types";

export const getProfile = (): Promise<UserProfileResponse> =>
  api.get<UserProfileResponse>(ENDPOINTS.profile).then((res) => res.data);

export const updateUserProfile = (taxationTypeId: {
  taxationTypeId: number;
}): Promise<UserProfileResponse> =>
  api
    .put<UserProfileResponse>(ENDPOINTS.profile, taxationTypeId)
    .then((res) => res.data);

export const getAllSettings = (): Promise<
  SettingsResponse<Record<string, unknown>>
> =>
  api
    .get<SettingsResponse<Record<string, unknown>>>(ENDPOINTS.settingsAll)
    .then((res) => res.data);

export function getSettings<TData extends Record<string, unknown>>(
  settingsId: number,
): Promise<Settings<TData>> {
  return api
    .get<
      Settings<TData>
    >(ENDPOINTS.settingsItem.replace(":id", settingsId.toString()))
    .then((res) => res.data);
}

export function saveSettings<TData extends Record<string, unknown>>(
  payload: Partial<Settings<TData>>,
): Promise<{ message: string }> {
  return api.post(ENDPOINTS.settingsSave, payload).then((res) => res.data);
}

export function deleteSettings(
  settingsId: number,
): Promise<{ message: string }> {
  return api
    .delete(ENDPOINTS.settingsDelete.replace(":id", settingsId.toString()))
    .then((res) => res.data);
}

export function getSettingsByName<TData extends Record<string, unknown>>(
  settingsName: string,
): Promise<Settings<TData>> {
  return api
    .get<
      Settings<TData>
    >(ENDPOINTS.settingsItemByName.replace(":name", settingsName))
    .then((res) => res.data);
}

export const getTaxation = () =>
  api
    .get<ReportTaxationDataResponse[]>(ENDPOINTS.taxation)
    .then((res) => res.data);
