import type { Pagination } from "../types";

export type OtherDeduction = {
  date: string;
  value: number;
  wbAccountId: number;
  description: string;
  id: number;
};

export type OtherDeductionListResponse = {
  items: OtherDeduction[];
  pagination: Pagination;
};

export type OtherDeductionListRequest = {
  page?: number;
  limit?: number;
  dateFrom?: string;
  dateTo?: string;
  wbAccountId?: number;
};

export type CreateOtherDeductionRequest = {
  description: string;
  wbAccountId: number;
};

export type CreateOtherDeductionResponse = {
  message: string;
};

export type UpdateOtherDeductionRequest = {
  description: string;
  id: number;
  wbAccountId: number;
};

export type UpdateOtherDeductionResponse = {
  message: string;
};

export type DeleteOtherDeductionRequest = {
  id: number;
};
