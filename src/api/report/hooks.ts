import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "./constants";
import type {
  ReportFilterAggregationResponse,
  ReportItemResponse,
  ReportRequest,
  ReportResponse,
} from "./types";
import { getArticle, getMainReport, getReportFilterAggregation } from "./api";

export const useMainReport = (
  payload: ReportRequest = {},
  options: Partial<UseQueryOptions<ReportResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.main, payload],
    queryFn: () => getMainReport(payload),
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
