import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import {
  deleteSettings,
  getAllSettings,
  getProfile,
  getSettings,
  getSettingsByName,
  getTaxation,
  saveSettings,
} from "./api";
import { QUERY_KEYS } from "./constants";
import type {
  ReportTaxationDataResponse,
  Settings,
  SettingsResponse,
  UserProfileResponse,
} from "./types";
import { createCustomMutation } from "../helper";

export const useUserProfile = (
  options: Partial<UseQueryOptions<UserProfileResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.user],
    queryFn: getProfile,
  });

export const useSettingsAll = (
  options: Partial<
    UseQueryOptions<SettingsResponse<Record<string, unknown>>, Error>
  > = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.settingsAll],
    queryFn: getAllSettings,
  });

export function useSettingsItem<TData extends Record<string, unknown>>(
  settingsId: number,
  options: Partial<UseQueryOptions<Settings<TData>, Error>> = {},
) {
  return useQuery({
    ...options,
    queryKey: [QUERY_KEYS.settingsItem, settingsId],
    queryFn: () => getSettings<TData>(settingsId),
  });
}

export function useSettingsItemByName<TData extends Record<string, unknown>>(
  settingsName: string,
  options: Partial<UseQueryOptions<Settings<TData>, Error>> = {},
) {
  return useQuery({
    ...options,
    queryKey: [QUERY_KEYS.settingsItem, settingsName],
    queryFn: () => getSettingsByName<TData>(settingsName),
  });
}

export const useReportTaxation = (
  options: Partial<UseQueryOptions<ReportTaxationDataResponse[], Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.profile],
    queryFn: getTaxation,
  });

export const useSaveSettingsMutation = createCustomMutation(saveSettings);
export const useDeleteSettingsMutation = createCustomMutation(deleteSettings);
