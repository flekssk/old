import type { FC, ReactNode } from "react";
import { Button, Dropdown, Pagination, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import type { UsersListResponse } from "@/api/usersList/types";
import type { SetURLSearchParams } from "react-router-dom";
import { usePagination } from "@/hooks/usePagination";

type UserListFiltersProps = {
  children: ReactNode;
  userList: UsersListResponse;
  searchParam: URLSearchParams;
  setSearchParam: SetURLSearchParams;
  searchValue: string;
  selectValue: string;
  pageValue: string;
};

const UserListFilters: FC<UserListFiltersProps> = ({
  children,
  userList,
  setSearchParam,
  searchParam,
  searchValue,
  selectValue,
  pageValue,
}) => {
  const { reset, register } = useForm({
    mode: "onChange",
    defaultValues: { search: searchValue },
  });
  const { pagination } = userList;
  const {
    clearFilter,
    totalPages,
    onChangePage,
    onChangeSelect,
    onChangeSearchUser,
  } = usePagination({ pagination, setSearchParam, searchParam });
  const availableSearchLength = searchValue.length >= 3;

  const clearFilterHandler = async () => {
    await clearFilter();
    reset({ search: "" });
  };
  const paginationValidation =
    totalPages && userList?.items.length !== userList?.pagination.total;
  return (
    <div>
      <div>
        <span
          className={`text-sm ${!availableSearchLength ? "opacity-100" : "opacity-0"}`}
        >
          Минимальное количество символов - 3
        </span>
        <div className="mb-3 flex justify-between">
          <TextInput
            className="mr-3 w-full"
            placeholder={"Поиск пользователей"}
            {...register("search")}
            onChange={onChangeSearchUser}
          />
          <Button onClick={clearFilterHandler}>Сбросить</Button>
        </div>
      </div>
      <div>{children}</div>
      <div className="mt-5 flex items-center gap-5 ">
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
                onChangeSelect("10");
              }}
            >
              10
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                onChangeSelect("15");
              }}
            >
              15
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default UserListFilters;
