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
  api.post<ReportResponse>(ENDPOINTS.main, payload).then((res) => {
    console.log("🚀 ~ api.post<ReportResponse> ~ res:", payload, res.data);

    return res.data;
  });

export const getReportFilterAggregation =
  (): Promise<ReportFilterAggregationResponse> =>
    api
      .get<ReportFilterAggregationResponse>(ENDPOINTS.filterAggregation)
      .then((res) => res.data);

export const getArticle = (
  id: number,
  payload: ReportRequest = {},
): Promise<ReportItemResponse> =>
  api
    .post<ReportItemResponse>(ENDPOINTS.article(id), payload)
    .then((res) => res.data);
