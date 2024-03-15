import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import {
  accountList,
  articleList,
  createAccount,
  deleteAccount,
  updateAccount,
} from "./api";
import { QUERY_KEYS } from "./constants";
import type {
  ArticleListRequest,
  ArticleListResponse,
  WbAccountListResponse,
} from "./types";
import { createCustomMutation } from "../helper";

export const useAccountList = (
  options: Partial<UseQueryOptions<WbAccountListResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.accountList],
    queryFn: accountList,
  });

export const useCreateAccountMutation = createCustomMutation(createAccount);
export const useUpdateAccountMutation = createCustomMutation(updateAccount);
export const useDeleteAccountMutation = createCustomMutation(deleteAccount);

export const useArticleList = (
  params: ArticleListRequest,
  options: Partial<UseQueryOptions<ArticleListResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.articleList, params],
    queryFn: () => articleList(params),
  });
