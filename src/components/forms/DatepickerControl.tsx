import type { FC, RefAttributes } from "react";

import { get, useFormContext, useFormState } from "react-hook-form";
import { Datepicker, type DatepickerProps } from "flowbite-react";
import { ControlWrapper, type ControlWrapperProps } from "./ControlWrapper";
import { ErrorMessage } from "@hookform/error-message";
import { format } from "date-fns";
import { DATE_FORMAT } from "@/helpers/date";

type InputControlProps = ControlWrapperProps &
  DatepickerProps &
  RefAttributes<HTMLInputElement>;

export const DatepickerControl: FC<InputControlProps> = ({
  name,
  className,
  label,
  ...inputProps
}) => {
  const { register, setValue, getValues } = useFormContext();
  const { errors } = useFormState();

  const error = get(errors, name);
  const value = getValues(name);
  const field = register(name);
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
        {...field}
        onSelectedDateChanged={(date) => {
          setValue(name, date, { shouldValidate: true });
          field.onBlur({ target: { value: date } });
        }}
        defaultDate={value}
        color={error ? "failure" : undefined}
        helperText={<ErrorMessage errors={errors} name={name} />}
      />
    </ControlWrapper>
  );
};
