import type { UserRoles } from "@/api/user/types";
import type { Pagination } from "@/hooks/usePagination";

export type UsersListResponse = {
  items: UserBody[];
  pagination: Pagination;
};

export type UserBody = {
  id: number;
  roles: UserRoles[];
  email: string;
  vk_id: string | null;
  yandex_id: string | null;
};

export type UserInfoBody = { name: string; accounts: AccountBody[] } & UserBody;

export type AccountBody = {
  id: number;
  name: string;
  deleted_at: string;
};

export type SearchUsers = {
  page?: string;
  limit?: string;
  search?: string;
};
