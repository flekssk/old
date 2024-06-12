import { cn } from "@/utils/utils";
import type { PaginationProps as FlowbitePaginationProps } from "flowbite-react";
import { Pagination as FlowbitePagination } from "flowbite-react";
import type { FC } from "react";
import { Select } from "./Select";

type PaginationProps = FlowbitePaginationProps & {
  showLimitSelector?: boolean;
  limitSelectorOptions?: number[];
  className?: string;
  limit?: number;
  onPerPageChange?: (limit: number) => void;
};

export const Pagination: FC<PaginationProps> = (props) => {
  const {
    showLimitSelector,
    limit,
    onPerPageChange,
    limitSelectorOptions = [10, 50, 100],
  } = props;
  return (
    <div
      className={cn("flex justify-start items-center gap-2", props.className)}
    >
      {showLimitSelector && limit && onPerPageChange ? (
        <Select
          selectedOption={{
            value: limit,
            label: limit.toString() || "",
          }}
          options={
            limitSelectorOptions?.map((option) => ({
              value: option,
              label: option.toString() || "",
            })) || []
          }
          setSelectedOption={(option) => {
            onPerPageChange(option.value as number);
          }}
        ></Select>
      ) : null}
      <FlowbitePagination
        theme={{
          pages: {
            base: "inline-flex items-center -space-x-px",
          },
        }}
        className=""
        {...props}
        nextLabel="Следующая"
        previousLabel="Предыдущая"
      />
    </div>
  );
};
