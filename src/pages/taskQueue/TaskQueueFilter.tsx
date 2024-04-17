import type { FC, ReactNode } from "react";
import type { SetURLSearchParams } from "react-router-dom";
import type { CommandsBodyResponse } from "@/api/taskQueue/types";
import { Button, Dropdown, Pagination, TextInput } from "flowbite-react";
import { usePagination } from "@/hooks/usePagination";
import { STATUSES } from "./constant";
import type { SelectOption } from "@/components/Select";
import { Select } from "@/components/Select";

type TaskQueueFilterProps = {
  children: ReactNode;
  commandList: CommandsBodyResponse;
  searchParam: URLSearchParams;
  setSearchParam: SetURLSearchParams;
  selectValue: string;
  pageValue: string;
};

const statusOptions: SelectOption[] = Object.entries(STATUSES).map(
  ([statusId, statusName]) => ({
    label: statusName,
    value: statusId,
  }),
);

statusOptions.unshift({ label: "Все", value: "" });
const TaskQueueFilter: FC<TaskQueueFilterProps> = ({
  children,
  commandList,
  pageValue,
  selectValue,
  setSearchParam,
  searchParam,
}) => {
  const { pagination } = commandList;
  const { onChangeSelect, onChangePage, totalPages } = usePagination({
    pagination,
    searchParam,
    setSearchParam,
  });
  const paginationValidation =
    totalPages && commandList?.items.length !== commandList?.pagination.total;

  const currentStatus = statusOptions.find(
    (status) => status.value === searchParam.get("status"),
  );
  return (
    <div>
      <div className="mb-4 grid grid-cols-10 gap-2">
        <TextInput
          value={searchParam.get("id") ?? ""}
          placeholder="ID"
          onChange={(e) => {
            searchParam.set("id", e.target.value);
            setSearchParam(searchParam, { replace: true });
          }}
        />
        <TextInput
          value={searchParam.get("command") ?? ""}
          placeholder="Команда"
          onChange={(e) => {
            searchParam.set("command", e.target.value);
            setSearchParam(searchParam, { replace: true });
          }}
        />

        <Select
          selectedOption={currentStatus}
          isFullWidth
          setSelectedOption={(option: SelectOption) => {
            searchParam.set("status", (option?.value as string) || "");
            setSearchParam(searchParam, { replace: true });
          }}
          placeholder="Статус"
          options={statusOptions}
        />
      </div>

      <div>{children}</div>
      <div className="mt-5 flex items-center gap-5">
        {paginationValidation ? (
          <Pagination
            currentPage={Number(pageValue)}
            totalPages={totalPages}
            onPageChange={onChangePage}
            previousLabel={""}
            nextLabel={""}
            showIcons
          />
        ) : (
          <Button
            onClick={() => onChangePage(1)}
            color={"gray"}
            className="mt-2 size-10"
          >
            1
          </Button>
        )}
        <div className="mt-2">
          <Dropdown
            value={selectValue}
            label={`${selectValue} на странице`}
            inline
            placement={"bottom"}
            size="sm"
          >
            <Dropdown.Item
              onClick={() => {
                onChangeSelect("5");
              }}
            >
              5
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                onChangeSelect("50");
              }}
            >
              50
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                onChangeSelect("100");
              }}
            >
              100
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default TaskQueueFilter;
