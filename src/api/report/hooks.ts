import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "./constants";
import type { ReportResponse } from "./types";
import { getMainReport } from "./api";

export const useMainReport = (
  options: Partial<UseQueryOptions<ReportResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.main],
    queryFn: getMainReport,
  });
