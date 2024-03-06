import type { FC, RefAttributes } from "react";

import { get, useFormContext, useFormState } from "react-hook-form";
import type { CheckboxProps } from "flowbite-react";
import { Checkbox } from "flowbite-react";
import { ControlWrapper, type ControlWrapperProps } from "./ControlWrapper";

type CheckboxControlProps = ControlWrapperProps &
  CheckboxProps &
  RefAttributes<HTMLInputElement>;

export const CheckboxControl: FC<CheckboxControlProps> = ({
  name,
  className,
  label,
  ...inputProps
}) => {
  const { register } = useFormContext();
  const { errors } = useFormState();

  const error = get(errors, name);

  return (
    <ControlWrapper name={name} className={className} label={label}>
      <Checkbox
        id={name}
        {...inputProps}
        {...register(name)}
        color={error ? "failure" : undefined}
      />
    </ControlWrapper>
  );
};
