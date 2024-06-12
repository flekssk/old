import type { Pagination } from "../types";

export type BatchIncome = {
  nm_id: string;
  cost: number;
  fulfillment: number;
  date_from?: string;
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
  costs: BatchIncome[];
};

export type IncomeCostSetBatchResponse = {
  message: string;
};

export type IncomeCostRequest = {
  nmIds: string;
  dateFrom?: string;
};

export type IncomeCostItem = {
  nm_id: string;
  date_from: string;
  cost: number;
  fulfillment: number;
};

export type IncomeCostResponse = {
  items: IncomeCostItem[];
};

export type IncomeDiagramRequest = {
  nmIds: string;
  dateFrom?: string;
  xls?: boolean;
};

export type IncomeDiagramItem = {
  nm_id: string;
  date_from: string;
  cost: number;
  fulfillment: number;
};

export type IncomeDiagramResponse = {
  items: IncomeDiagramItem[];
};
