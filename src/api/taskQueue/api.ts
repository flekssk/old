import type { CommandsBodyResponse, SearchCommand } from "./types";
import { api } from "@/api/instance";
import { ENDPOINTS } from "@/api/taskQueue/constants";

export const getCommandList = (
  params: SearchCommand = {},
): Promise<CommandsBodyResponse> => {
  return api
    .get<CommandsBodyResponse>(ENDPOINTS.taskList, { params: params })
    .then((res) => res.data);
};

export const createCommand = (
  command: string,
): Promise<{ message: string }> => {
  return api
    .post<{ message: string }>(ENDPOINTS.taskCreate, { command: command })
    .then((res) => res.data);
};

export const deleteCommand = (id: number): Promise<{ message: string }> => {
  return api
    .delete<{
      message: string;
    }>(ENDPOINTS.delete.replace("{id}", id.toString()))
    .then((res) => res.data);
};
