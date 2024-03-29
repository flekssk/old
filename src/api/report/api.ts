import { api } from "../instance";
import { ENDPOINTS } from "./constants";
import type {
  ReportFilterAggregationResponse,
  ReportItemResponse,
  ReportRequest,
  ReportResponse,
} from "./types";

export const getMainReport = (
  payload: ReportRequest = {},
): Promise<ReportResponse> =>
  api.post<ReportResponse>(ENDPOINTS.main, payload).then((res) => res.data);

export const getReportFilterAggregation =
  (): Promise<ReportFilterAggregationResponse> =>
    api
      .get<ReportFilterAggregationResponse>(ENDPOINTS.filterAggregation)
      .then((res) => res.data);

export const getArticle = (id: number): Promise<ReportItemResponse> =>
  api.post<ReportItemResponse>(ENDPOINTS.article(id)).then((res) => res.data);
