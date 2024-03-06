import { Alert } from "flowbite-react";
import type { FC } from "react";

type ServerSuccessProps = {
  message?: string;
};

export const ServerSuccess: FC<ServerSuccessProps> = ({ message }) => {
  return message ? <Alert color="success">{message}</Alert> : null;
};
