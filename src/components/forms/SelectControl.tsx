import type { FC, RefAttributes } from "react";

import { useFormContext } from "react-hook-form";
import { ControlWrapper, type ControlWrapperProps } from "./ControlWrapper";
import { Select, type SelectProps } from "../Select";

type InputControlProps = ControlWrapperProps &
  SelectProps &
  RefAttributes<HTMLInputElement>;

export const SelectControl: FC<InputControlProps> = ({
  name,
  className,
  label,
  ...selectProps
}) => {
  const { register } = useFormContext();

  return (
    <ControlWrapper
      name={name}
      className={className}
      label={label}
      withError={false}
    >
      <Select {...selectProps} {...register(name)} />
    </ControlWrapper>
  );
};
