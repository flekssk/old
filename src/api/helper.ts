import type {
  MutateOptions,
  UseMutationResult,
  MutationFunction,
} from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const createCustomMutation =
  <ResponseData = unknown, RequestData = unknown>(
    mutationFn: MutationFunction<RequestData, ResponseData>,
  ) =>
  (
    options: MutateOptions<
      RequestData,
      AxiosError<{ message: string }>,
      ResponseData,
      ResponseData
    > = {},
  ): UseMutationResult<
    RequestData,
    AxiosError<{ message: string }>,
    ResponseData,
    ResponseData
  > =>
    useMutation<
      RequestData,
      AxiosError<{ message: string }>,
      ResponseData,
      ResponseData
    >({
      ...options,
      mutationFn,
    });
