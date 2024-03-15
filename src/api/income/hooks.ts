import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getIncomeList, incomeCostSetBatch, incomeSync } from "./api";
import { QUERY_KEYS } from "./constants";
import type { IncomeListRequest, IncomeListResponse } from "./types";
import { createCustomMutation } from "../helper";

export const useIncomeList = (
  payload: IncomeListRequest,
  options: Partial<UseQueryOptions<IncomeListResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.incomeList, payload],
    queryFn: () => getIncomeList(payload),
  });

export const useIncomeSyncMutation = createCustomMutation(incomeSync);
export const useIncomeCostSetBatchMutation =
  createCustomMutation(incomeCostSetBatch);
