import { api } from "@/api/instance";
import { ENDPOINTS } from "@/api/admin/constants";
import type {
  AdminSubscriptionResponse,
  CreateSubscription,
  SubscriptionBody,
} from "@/api/admin/types";
import { applyRouteParams } from "@/helpers/url";

export const getSubscriptionList = (): Promise<AdminSubscriptionResponse> => {
  return api
    .get<AdminSubscriptionResponse>(ENDPOINTS.main)
    .then((res) => res.data);
};

export const createSubscription = (
  data: CreateSubscription,
): Promise<AdminSubscriptionResponse> => {
  return api
    .post<AdminSubscriptionResponse>(ENDPOINTS.main, { ...data })
    .then((res) => res.data);
};

export const updateSubscription = (payload: {
  id: number;
  data: SubscriptionBody;
}): Promise<AdminSubscriptionResponse> => {
  return api
    .put<AdminSubscriptionResponse>(
      applyRouteParams(ENDPOINTS.update, { id: payload.id }),
      payload.data,
    )
    .then((res) => res.data);
};
