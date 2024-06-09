import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "./constants";
import type {
  OtherDeductionListRequest,
  OtherDeductionListResponse,
} from "./types";
import {
  createOtherDeduction,
  deleteOtherDeduction,
  getOtherDeductionList,
  updateOtherDeduction,
} from "./api";
import { createCustomMutation } from "../helper";

export const useGetOtherDeductionList = (
  payload: OtherDeductionListRequest,
  options: Partial<UseQueryOptions<OtherDeductionListResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.list, payload],
    queryFn: () => getOtherDeductionList(payload),
  });

export const useCreateOtherDeductionMutation =
  createCustomMutation(createOtherDeduction);

export const useUpdateOtherDeductionMutation =
  createCustomMutation(updateOtherDeduction);

export const useDeleteOtherDeductionMutation =
  createCustomMutation(deleteOtherDeduction);
