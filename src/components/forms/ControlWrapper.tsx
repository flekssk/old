import type { FC, ReactNode } from "react";
import { useFormState } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Label } from "flowbite-react";

export type ControlWrapperProps = {
  children?: ReactNode;
  className?: string;
  label?: string;
  name: string;
  withError?: boolean;
};

export const ControlWrapper: FC<ControlWrapperProps> = ({
  children,
  className,
  label,
  name,
  withError = true,
}) => {
  const { errors } = useFormState();

  return (
    <div className={className}>
      {label ? (
        <Label htmlFor={name} className="mb-2 block dark:text-white">
          {label}
        </Label>
      ) : null}
      {children}
      {withError ? (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <div className="mt-1 text-left text-sm font-normal leading-tight tracking-tight text-red-600">
              {message}
            </div>
          )}
        />
      ) : null}
    </div>
  );
};
