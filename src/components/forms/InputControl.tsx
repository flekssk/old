import type { FC, RefAttributes } from "react";

import { get, useFormContext, useFormState } from "react-hook-form";
import type { TextInputProps } from "flowbite-react";
import { TextInput } from "flowbite-react";
import { ControlWrapper, type ControlWrapperProps } from "./ControlWrapper";
import { ErrorMessage } from "@hookform/error-message";

type InputControlProps = ControlWrapperProps &
  TextInputProps &
  RefAttributes<HTMLInputElement>;

export const InputControl: FC<InputControlProps> = ({
  name,
  className,
  label,
  ...inputProps
}) => {
  const { register } = useFormContext();
  const { errors } = useFormState();

  const error = get(errors, name);

  return (
    <ControlWrapper
      name={name}
      className={className}
      label={label}
      withError={false}
    >
      <TextInput
        {...inputProps}
        {...register(name)}
        color={error ? "failure" : undefined}
        helperText={<ErrorMessage errors={errors} name={name} />}
      />
    </ControlWrapper>
  );
};
