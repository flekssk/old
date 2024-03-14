import { api } from "../instance";
import { ENDPOINTS } from "./constants";
import type { ReportResponse } from "./types";

export const getMainReport = (): Promise<ReportResponse> =>
  api.post<ReportResponse>(ENDPOINTS.main).then((res) => res.data);
