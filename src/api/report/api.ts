import { api } from "../instance";
import { ENDPOINTS } from "./constants";
import type {
  PnLRequest,
  PnLResponse,
  ReportFilterAggregationResponse,
  ReportItemResponse,
  ReportRequest,
  ReportResponse,
  WeekReportRequest,
  WeekReportResponse,
} from "./types";

export const getMainReportV2 = (
  payload: ReportRequest = {},
): Promise<ReportResponse> => {
  let endpoint = ENDPOINTS.mainV2;
  if (payload.xls) {
    endpoint += "?xls=true";
  }
  return api.post<ReportResponse>(endpoint, payload).then((res) => {
    return res.data;
  });
};

export const getMainReport = (
  payload: ReportRequest = {},
): Promise<ReportResponse> =>
  api.post<ReportResponse>(ENDPOINTS.main, payload).then((res) => {
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

export const getArticleV2 = (
  id: number,
  payload: ReportRequest = {},
): Promise<ReportItemResponse> =>
  api
    .post<ReportItemResponse>(ENDPOINTS.articleV2(id), payload)
    .then((res) => res.data);

export const getWeekReport = (
  payload: WeekReportRequest = {},
): Promise<WeekReportResponse> =>
  api.post<WeekReportResponse>(ENDPOINTS.week, payload).then((res) => {
    return res.data;
  });

export const getPnLReport = (payload: PnLRequest = {}): Promise<PnLResponse> =>
  api.post<PnLResponse>(ENDPOINTS.pnl, payload).then((res) => res.data);
