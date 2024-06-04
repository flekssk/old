import type { FC, RefAttributes } from "react";

import { get, useFormContext, useFormState } from "react-hook-form";
import { Datepicker, type DatepickerProps } from "flowbite-react";
import { ControlWrapper, type ControlWrapperProps } from "./ControlWrapper";
import { ErrorMessage } from "@hookform/error-message";

type InputControlProps = ControlWrapperProps &
  DatepickerProps &
  RefAttributes<HTMLInputElement>;

export const DatepickerControl: FC<InputControlProps> = ({
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
      <Datepicker
        id={name}
        {...inputProps}
        {...register(name)}
        color={error ? "failure" : undefined}
        helperText={<ErrorMessage errors={errors} name={name} />}
      />
    </ControlWrapper>
  );
};
