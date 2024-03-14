import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import {
  accountList,
  createAccount,
  deleteAccount,
  updateAccount,
} from "./api";
import { QUERY_KEYS } from "./constants";
import type { WbAccountListResponse } from "./types";
import { createCustomMutation } from "../helper";

export const useAccountList = (
  options: Partial<UseQueryOptions<WbAccountListResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.accountList],
    queryFn: accountList,
  });

export const useCreateAccountMutation = createCustomMutation(createAccount);
export const useUpdateAccountMutation = createCustomMutation(updateAccount);
export const useDeleteAccountMutation = createCustomMutation(deleteAccount);
