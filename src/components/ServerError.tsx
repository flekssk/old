import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Alert } from "flowbite-react";
import type { FC } from "react";

type ServerErrorProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutation: UseMutationResult<any, AxiosError<{ message: string }>, any, any>;
  className?: string;
};

export const ServerError: FC<ServerErrorProps> = ({ mutation, className }) => {
  return mutation.isError ? (
    <Alert color="failure" className={className}>
      {mutation.error.response?.data?.message ?? mutation.error.message}
    </Alert>
  ) : null;
};
