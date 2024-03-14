export type WbAccount = {
  id: number;
  accountNumber: string;
  name: string;
  deletedAt: string;
};

export type WbAccountListResponse = WbAccount[];

export type WbCreateAccountRequest = {
  accountNumber: string;
  name: string;
};

export type WbCreateAccountResponse = {
  message: string;
};

export type WbUpdateAccountRequest = {
  accountNumber: string;
  name: string;
};

export type WbUpdateAccountResponse = {
  message: string;
};

export type WbDeleteAccountResponse = {
  message: string;
};
