import { api } from "../instance";
import { ENDPOINTS } from "./constants";

import type {
  AccountTaxListRequest,
  AccountTaxListResponse,
  AccountTaxSetBatchRequest,
  AccountTaxSetBatchResponse,
} from "./types";

export const getAccountTaxList = (
  payload: AccountTaxListRequest,
): Promise<AccountTaxListResponse> =>
  api
    .get<AccountTaxListResponse>(ENDPOINTS.accountTaxList, { params: payload })
    .then((res) => res.data);

export const setAccountTaxSetBatch = (
  payload: AccountTaxSetBatchRequest,
): Promise<AccountTaxSetBatchResponse> =>
  api
    .post<AccountTaxSetBatchResponse>(ENDPOINTS.accountTaxSetBatch, payload)
    .then((res) => res.data);
