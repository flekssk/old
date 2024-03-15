import type { Pagination } from "../types";

export type BatchIncome = {
  incomeId: string;
  nmId: string;
  barcode: string;
  cost: number;
};

export type Income = {
  barcode: string;
  cost: number | null;
  date: string;
  incomeId: string;
  quantity: number;
  status: string;
  supplierArticle: string;
  totalPrice: number;
};

export type IncomeListResponse = {
  items: Income[];
  pagination: Pagination;
};
export type IncomeListRequest = {
  page: number;
  limit: number;
  barcodes: string;
};

export type IncomeSyncResponse = {
  message: string;
};

export type IncomeCostSetBatchRequest = {
  items: Income[];
};

export type IncomeCostSetBatchResponse = {
  message: string;
};
