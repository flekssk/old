import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./constants";
import type { AccountTaxListRequest, AccountTaxListResponse } from "./types";
import { createCustomMutation } from "../helper";
import { getAccountTaxList, setAccountTaxSetBatch } from "./api";

export const useGetAccountTaxList = (
  payload: AccountTaxListRequest,
  options: Partial<UseQueryOptions<AccountTaxListResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.accountTaxList, payload],
    queryFn: () => getAccountTaxList(payload),
  });

export const useAccountTaxSetBatch = createCustomMutation(
  setAccountTaxSetBatch,
);
