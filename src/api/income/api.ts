import { api } from "../instance";
import { ENDPOINTS } from "./constants";
import type {
  IncomeCostRequest,
  IncomeCostResponse,
  IncomeCostSetBatchRequest,
  IncomeCostSetBatchResponse,
  IncomeDiagramRequest,
  IncomeDiagramResponse,
  IncomeListRequest,
  IncomeListResponse,
  IncomeSyncResponse,
} from "./types";

export const getIncomeList = (
  payload: IncomeListRequest,
): Promise<IncomeListResponse> =>
  api
    .get<IncomeListResponse>(ENDPOINTS.incomeList, { params: payload })
    .then((res) => res.data);

export const incomeSync = (): Promise<IncomeSyncResponse> =>
  api.get<IncomeSyncResponse>(ENDPOINTS.incomeSync).then((res) => res.data);

export const incomeCostSetBatch = (
  payload: IncomeCostSetBatchRequest,
): Promise<IncomeCostSetBatchResponse> =>
  api
    .post<IncomeCostSetBatchResponse>(ENDPOINTS.incomeCostSetBatch, payload)
    .then((res) => res.data);

export const incomeCost = (
  payload: IncomeCostRequest,
): Promise<IncomeCostResponse> =>
  api
    .get<IncomeCostResponse>(ENDPOINTS.incomeCost, { params: payload })
    .then((res) => res.data);

export const incomeDiagram = (
  payload: IncomeDiagramRequest,
): Promise<IncomeDiagramResponse> =>
  api
    .get<IncomeDiagramResponse>(ENDPOINTS.incomeDiagram, { params: payload })
    .then((res) => res.data);
