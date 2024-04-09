import type { UserRoles } from "@/api/user/types";

export type AdminSubscriptionResponse = SubscriptionBody[];

export type SubscriptionBody = {
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

export type CreateSubscription = Pick<
  SubscriptionBody,
  | "title"
  | "cost"
  | "description"
  | "is_enabled"
  | "third_party_id"
  | "user_role"
>;
