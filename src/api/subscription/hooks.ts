import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "./constants";
import type { SubscriptionOrdersResponse, SubscriptionResponse } from "./types";
import { createCustomMutation } from "../helper";
import { getSubscriptionOrders, getSubscriptions, payment } from "./api";

export const useSubscriptionList = (
  options: Partial<UseQueryOptions<SubscriptionResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.subscriptionList],
    queryFn: getSubscriptions,
  });

export const useSubscriptionOrders = (
  options: Partial<UseQueryOptions<SubscriptionOrdersResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.subscriptionOrders],
    queryFn: getSubscriptionOrders,
  });

export const usePaymentMutation = createCustomMutation(payment);
