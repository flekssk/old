import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "./constants";
import type {
  ReportFilterAggregationResponse,
  ReportRequest,
  ReportResponse,
} from "./types";
import { getMainReport, getReportFilterAggregation } from "./api";

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
