import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Alert } from "flowbite-react";
import type { FC } from "react";

type ServerErrorProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutation: UseMutationResult<any, AxiosError<{ message: string }>, any, any>;
};

export const ServerError: FC<ServerErrorProps> = ({ mutation }) => {
  return mutation.isError ? (
    <Alert color="success">
      {mutation.error.response?.data?.message ?? mutation.error.message}
    </Alert>
  ) : null;
};
