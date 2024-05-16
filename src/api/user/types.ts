export type UserProfileResponse = {
  accountsCount: number;
  taxationTypeId?: number;
  orders: Orders[];
  roles: UserRoles[];
  settings?: {
    reportTableSettings?: null;
  };
  onboardings: OnBoardings[];
  accounts: Array<{ id: number; name: string }>;
  email: string;
  name: string;
  message?: string;
};

export type OnBoardings = {
  id: number;
  name: string;
  settings: OnBoardingsSettings;
};

type OnBoardingsSettings = {
  allSteps: number;
  commandIds: number[];
  completeSteps: number;
  failSteps: 0;
  status: OnBoardingStatusType;
  accountId?: number;
};

type OnBoardingStatusType = "in-process" | "finished" | "failed";

export type UserRoles =
  | "ROLE_USER"
  | "ROLE_ADMIN"
  | "ROLE_SUPER_PACAN"
  | "ROLE_BASIC_SUBSCRIBER";

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
