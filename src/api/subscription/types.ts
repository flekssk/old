export type UserRoles = "ROLE_USER" | "ROLE_ADMIN" | "ROLE_BASIC_SUBSCRIBER";

export type Subscription = {
  title: string;
  cost: number;
  id: number;
  description: string;
  is_enabled: boolean;
  third_party_id: number;
  updated_at: string;
  created_at: string;
  user_role: UserRoles;
};

export type Order = {
  id: number;
  updated_at: string;
  created_at: string;
  expired_at: string;
  subscription: Subscription;
};

export type SubscriptionOrdersResponse = Array<Order>;

export type SubscriptionResponse = Array<Subscription>;
