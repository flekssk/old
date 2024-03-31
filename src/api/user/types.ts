export type UserProfileResponse = {
  taxationTypeId?: number;
  settings?: {
    reportTableSettings?: null;
  };
  email: string;
  name: string;
};
