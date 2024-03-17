import { api } from "../instance";
import { ENDPOINTS } from "./constants";
import type {
  ReportFilterAggregationResponse,
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
