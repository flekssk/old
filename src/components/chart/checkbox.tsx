import type { FC } from "react";
import { Checkbox, Label } from "flowbite-react";
import "./index.css";

type CheckboxChartsProps = {
  title: string;
  id: string;
  params: string[];
  defaultChecked?: boolean;
  deleteParams: (id: string) => void;
  getParams: (id: string) => void;
};

export const CheckboxCharts: FC<CheckboxChartsProps> = ({
  title,
  id,
  defaultChecked,
  params,
  getParams,
  deleteParams,
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
        id={id}
        defaultChecked={defaultChecked}
        onChange={(e) => handleChange(e)}
      />
      <Label htmlFor={id}>{title}</Label>
    </>
  );
};
