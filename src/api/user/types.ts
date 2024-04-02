export type UserProfileResponse = {
  taxationTypeId?: number;
  settings?: {
    reportTableSettings?: null;
  };
  email: string;
  name: string;
  message?: string;
};

export interface Settings<TData extends Record<string, unknown>> {
  id: number;
  name: string;
  settings: TData;
}

export type SettingsResponse<TData extends Record<string, unknown>> =
  Settings<TData>[];

export type ReportTaxationDataResponse = {
  id: number;
  title: string;
};
