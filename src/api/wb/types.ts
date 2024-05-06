import type { Pagination } from "../types";

export type WbAccount = {
  id: number;
  accountNumber: string;
  name: string;
  deletedAt: string;
};

export type WbAccountListResponse = WbAccount[];

export type WbCreateAccountRequest = {
  accountNumber: string;
  name: string;
};

export type WbCreateAccountResponse = {
  message: string;
};

export type WbUpdateAccountRequest = {
  accountNumber: string;
  name: string;
};

export type WbUpdateAccountResponse = {
  message: string;
};

export type WbDeleteAccountResponse = {
  message: string;
};

export type Article = {
  id: number;
  photos: Record<string, string>;
  nmId: string;
  brand: string;
  nmUUID: string;
  subjectName: string;
  title: string;
  vendorCode: string;
  barcodes?: Array<{
    barcode: string;
    id: number;
    size: string;
  }>;
};

export type ArticleListResponse = {
  items: Article[];
  pagination: Pagination;
};

export type ArticleListRequest = {
  page?: number;
  limit?: number;
  withBarcodes?: number;
};
