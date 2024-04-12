import { getUserInfo, getUserList } from "@/api/usersList/api";
import { QUERY_KEYS } from "@/api/usersList/constants";
import type {
  SearchUsers,
  UserInfoBody,
  UsersListResponse,
} from "@/api/usersList/types";
import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export const useGetUserList = (
  params: SearchUsers = {},
  options: Partial<UseQueryOptions<UsersListResponse, Error>> = {},
) => {
  return useQuery({
    ...options,
    queryKey: [QUERY_KEYS.userList],
    queryFn: () => getUserList(params),
  });
};

export const useGetUserInfo = (
  id: string,
  options: Partial<UseQueryOptions<UserInfoBody, Error>> = {},
) => {
  return useQuery({
    ...options,
    queryKey: [QUERY_KEYS.userInfo],
    queryFn: () => getUserInfo(id),
  });
};
