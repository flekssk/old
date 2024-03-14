import { applyRouteParams } from "@/helpers/url";
import { api } from "../instance";
import { ENDPOINTS } from "./constants";
import type {
  WbAccountListResponse,
  WbCreateAccountRequest,
  WbCreateAccountResponse,
  WbDeleteAccountResponse,
  WbUpdateAccountRequest,
  WbUpdateAccountResponse,
} from "./types";

export const accountList = (): Promise<WbAccountListResponse> =>
  api.get<WbAccountListResponse>(ENDPOINTS.accountList).then((res) => res.data);

export const createAccount = (
  data: WbCreateAccountRequest,
): Promise<WbCreateAccountResponse> =>
  api
    .post<WbCreateAccountResponse>(ENDPOINTS.createAccount, data)
    .then((res) => res.data);

export const updateAccount = (payload: {
  id: number;
  data: WbUpdateAccountRequest;
}): Promise<WbUpdateAccountResponse> =>
  api
    .put<WbUpdateAccountResponse>(
      applyRouteParams(ENDPOINTS.updateAccount, { id: payload.id }),
      payload.data,
    )
    .then((res) => res.data);

export const deleteAccount = (id: number): Promise<WbDeleteAccountResponse> =>
  api
    .delete<WbDeleteAccountResponse>(
      applyRouteParams(ENDPOINTS.deleteAccount, { id }),
    )
    .then((res) => res.data);
