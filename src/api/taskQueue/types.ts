import type { Pagination } from "@/hooks/usePagination";

export type CommandBody = {
  id: number;
  command: string;
  priority: number;
  status: number;
  result: string;
  createdAt: string;
  updatedAt: string;
  executedAt: string;
  accountId: number | null;
};

export type CommandsBodyResponse = {
  items: CommandBody[];
  pagination: Pagination;
};

export type SearchCommand = {
  page?: string;
  limit?: string;
  search?: string;
};
