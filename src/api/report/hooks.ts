import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "./constants";
import type {
  ReportFilterAggregationResponse,
  ReportItemResponse,
  ReportRequest,
  ReportResponse,
  WeekReportRequest,
  WeekReportResponse,
} from "./types";
import {
  getArticle,
  getArticleV2,
  getMainReport,
  getMainReportV2,
  getReportFilterAggregation,
  getWeekReport,
} from "./api";

export const useMainReport = (
  payload: ReportRequest = {},
  options: Partial<UseQueryOptions<ReportResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.main, payload],
    queryFn: () => getMainReport(payload),
  });

export const useMainReportV2 = (
  payload: ReportRequest = {},
  options: Partial<UseQueryOptions<ReportResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.mainV2, payload],
    queryFn: () => getMainReportV2(payload),
  });

export const useReportFilterAggregation = (
  options: Partial<
    UseQueryOptions<ReportFilterAggregationResponse, Error>
  > = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.filterAggregation],
    queryFn: getReportFilterAggregation,
  });

export const useArticleReport = (
  id: number,
  payload: ReportRequest = {},
  options: Partial<UseQueryOptions<ReportItemResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.article, id, payload],
    queryFn: () => getArticle(id, payload),
  });

export const useArticleV2Report = (
  id: number,
  payload: ReportRequest = {},
  options: Partial<UseQueryOptions<ReportItemResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.articleV2, id, payload],
    queryFn: () => getArticleV2(id, payload),
  });

export const useWeekReport = (
  payload: WeekReportRequest = {},
  options: Partial<UseQueryOptions<WeekReportResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.week, payload],
    queryFn: () => getWeekReport(payload),
  });
