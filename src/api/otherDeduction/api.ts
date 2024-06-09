import { api } from "../instance";
import { ENDPOINTS } from "./constants";

import type {
  CreateOtherDeductionRequest,
  CreateOtherDeductionResponse,
  DeleteOtherDeductionRequest,
  OtherDeductionListRequest,
  OtherDeductionListResponse,
  UpdateOtherDeductionRequest,
  UpdateOtherDeductionResponse,
} from "./types";

export const getOtherDeductionList = (
  payload: OtherDeductionListRequest,
): Promise<OtherDeductionListResponse> =>
  api
    .get<OtherDeductionListResponse>(ENDPOINTS.list, { params: payload })
    .then((res) => res.data);

export const createOtherDeduction = (
  payload: CreateOtherDeductionRequest,
): Promise<CreateOtherDeductionResponse> =>
  api
    .post<CreateOtherDeductionResponse>(ENDPOINTS.create, payload)
    .then((res) => res.data);

export const updateOtherDeduction = (
  payload: UpdateOtherDeductionRequest,
): Promise<UpdateOtherDeductionResponse> =>
  api
    .put<UpdateOtherDeductionResponse>(ENDPOINTS.update(payload.id), payload)
    .then((res) => res.data);

export const deleteOtherDeduction = async (
  payload: DeleteOtherDeductionRequest,
): Promise<void> => {
  await api.delete(ENDPOINTS.delete(payload.id));
};
