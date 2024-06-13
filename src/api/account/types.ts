/**
 * {
	"taxes": [
		{
			"id": 2,
			"accountId": 2,
			"name": "Гардеробов",
			"year": 2024,
			"quarter": 1,
			"taxTypeId": 1
		},
		{
			"id": 1,
			"accountId": 1,
			"name": "Ожиганов",
			"year": 2024,
			"quarter": 1,
			"taxTypeId": 1
		}
	],
	"pagination": {
		"page": 1,
		"limit": 100,
		"total": 2
	}
}
 */

export interface AccountTaxItem {
  id: number;
  accountId: number;
  year: number;
  quarter: number;
  taxTypeId: number;
}

export interface AccountTaxListRequest {
  page?: number;
  limit?: number;
}

export interface AccountTaxListResponse {
  taxes: AccountTaxItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export type AccountTaxSetBatchItem = Omit<AccountTaxItem, "id">;

export interface AccountTaxSetBatchRequest {
  taxes: AccountTaxSetBatchItem[];
}

export interface AccountTaxSetBatchResponse {
  message: string;
}
