import { SearchUsers, UserInfoBody, UsersListResponse } from "./types";
import { api } from "@/api/instance";
import { ENDPOINTS } from "@/api/usersList/constants";
import { applyRouteParams } from "@/helpers/url";

export const getUserList = (
  params: SearchUsers = {},
): Promise<UsersListResponse> => {
  return api
    .get<UsersListResponse>(ENDPOINTS.userList, { params: params })
    .then((res) => res.data);
};

export const getUserInfo = (id: string): Promise<UserInfoBody> => {
  return api
    .get<UserInfoBody>(applyRouteParams(ENDPOINTS.userInfo, { id }))
    .then((res) => res.data);
};
