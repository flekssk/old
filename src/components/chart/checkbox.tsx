import type { FC } from "react";
import { Checkbox, Label } from "flowbite-react";

type CheckboxChartsProps = {
  title: string;
  id: string;
  params: string[];
  defaultChecked?: boolean;
  deleteParams: (id: string) => void;
  getParams: (id: string) => void;
  color?: string;
};

export const CheckboxCharts: FC<CheckboxChartsProps> = ({
  title,
  id,
  defaultChecked,
  params,
  getParams,
  deleteParams,
  color,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    if (checked && !params.includes(id)) {
      getParams(id);
    } else if (!checked && params.includes(id)) {
      deleteParams(id);
    }
  };

  return (
    <>
      <Checkbox
        style={{ color: color }}
        id={id}
        defaultChecked={defaultChecked}
        onChange={(e) => handleChange(e)}
      />
      <Label htmlFor={id}>{title}</Label>
    </>
  );
};
