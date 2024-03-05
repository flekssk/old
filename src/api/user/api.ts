import { api } from "../instance";
import { ENDPOINTS } from "./constants";
import type { UserProfileResponse } from "./types";

export const getProfile = (): Promise<UserProfileResponse> =>
  api.get<UserProfileResponse>(ENDPOINTS.profile).then((res) => res.data);
