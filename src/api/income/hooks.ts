import type {
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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

export const useInfinityIncomeList = (
  payload: IncomeListRequest,
  options: Partial<UseInfiniteQueryOptions<IncomeListResponse, Error>> = {},
) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEYS.incomeListInfinity],
    queryFn: ({ pageParam }) =>
      getIncomeList({
        ...payload,
        ...(pageParam as unknown as { page: number; limit: number }),
      }),
    getNextPageParam: () => {},
    getPreviousPageParam: () => {},
    initialPageParam: { page: payload.page, limit: payload.limit },
    ...options,
  });

export const useIncomeSyncMutation = createCustomMutation(incomeSync);
export const useIncomeCostSetBatchMutation =
  createCustomMutation(incomeCostSetBatch);
