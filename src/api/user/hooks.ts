import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./api";
import { QUERY_KEYS } from "./constants";
import type { UserProfileResponse } from "./types";

export const useUserProfile = (
  options: Partial<UseQueryOptions<UserProfileResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.profile],
    queryFn: getProfile,
  });
