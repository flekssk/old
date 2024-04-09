import { api } from "../instance";
import { ENDPOINTS } from "./constants";
import type { SubscriptionOrdersResponse, SubscriptionResponse } from "./types";

export * from "./hooks";

export const getSubscriptions = (): Promise<SubscriptionResponse> => {
  return api
    .get<SubscriptionResponse>(ENDPOINTS.subscriptionList)
    .then((res) => res.data);
};

export const getSubscriptionOrders =
  (): Promise<SubscriptionOrdersResponse> => {
    return api
      .get<SubscriptionOrdersResponse>(ENDPOINTS.subscriptionOrders)
      .then((res) => res.data);
  };

export const payment = (
  subscriptionId: number,
): Promise<{ message: string }> => {
  return api
    .get<{
      message: string;
    }>(ENDPOINTS.pay.replace("{subscriptionId}", subscriptionId.toString()))
    .then((res) => res.data);
};
