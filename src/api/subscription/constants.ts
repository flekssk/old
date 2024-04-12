export const ENDPOINTS = {
  subscriptionList: "/subscription",
  subscriptionOrders: "/subscription/orders",
  pay: "/payment/prodamus/pay-fake/{subscriptionId}",
} as const;

export const QUERY_KEYS = {
  subscriptionList: "subscriptionList",
  subscriptionOrders: "subscriptionOrders",
} as const;
