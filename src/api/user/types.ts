export type UserProfileResponse = {
  accountsCount: number;
  taxationTypeId?: number;
  orders: Orders[];
  roles: UserRoles[];
  settings?: {
    reportTableSettings?: null;
  };
  email: string;
  name: string;
  message?: string;
};

export type UserRoles = "ROLE_USER" | "ROLE_ADMIN" | "ROLE_SUPER_PACAN";

export type Orders = {
  id: number;
  uid: string;
  subscriptionTitle: string;
  createdAt: Date;
  updateAt: Date;
  expiredAt: Date;
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
