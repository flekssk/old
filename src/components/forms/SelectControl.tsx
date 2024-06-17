import type { FC, RefAttributes } from "react";

import { useFormContext } from "react-hook-form";
import { ControlWrapper, type ControlWrapperProps } from "./ControlWrapper";
import { Select, type SelectOption, type SelectProps } from "../Select";

type InputControlProps = ControlWrapperProps &
  Omit<SelectProps, "setSelectedOption"> &
  RefAttributes<HTMLInputElement>;

export const SelectControl: FC<InputControlProps> = ({
  name,
  className,
  label,
  ...selectProps
}) => {
  const { register, setValue, watch } = useFormContext();

  const setSelectedOption = (option: SelectOption) => {
    setValue(name, option);
  };

  const value = watch(name);

  return (
    <ControlWrapper
      name={name}
      className={className}
      label={label}
      withError={false}
    >
      <Select
        {...selectProps}
        {...register(name)}
        selectedOption={value}
        setSelectedOption={setSelectedOption}
      />
    </ControlWrapper>
  );
};
