import { QUERY_KEYS } from "@/api/usersList/constants";
import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type {
  CommandsBodyResponse,
  SearchCommand,
} from "@/api/taskQueue/types";
import {
  createCommand,
  deleteCommand,
  getCommandList,
} from "@/api/taskQueue/api";
import { createCustomMutation } from "@/api/helper";

export const useGetCommands = (
  params: SearchCommand = {},
  options: Partial<UseQueryOptions<CommandsBodyResponse, Error>> = {},
) => {
  return useQuery({
    ...options,
    queryKey: [QUERY_KEYS.userList, params],
    queryFn: () => getCommandList(params),
  });
};

export const useCreateCommand = createCustomMutation(createCommand);
export const useDeleteCommand = createCustomMutation(deleteCommand);
