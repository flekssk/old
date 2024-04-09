import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/api/user/constants";
import {
  createSubscription,
  getSubscriptionList,
  updateSubscription,
} from "@/api/admin/api";
import type { AdminSubscriptionResponse } from "@/api/admin/types";
import { createCustomMutation } from "@/api/helper";

export function useGetSubscription(
  options: Partial<UseQueryOptions<AdminSubscriptionResponse, Error>> = {},
) {
  return useQuery({
    ...options,
    queryKey: [QUERY_KEYS.admin],
    queryFn: getSubscriptionList,
  });
}
export const useUpdateSubscription = createCustomMutation(updateSubscription);
export const useCreateSubscription = createCustomMutation(createSubscription);
