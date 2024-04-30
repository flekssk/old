import type { SetURLSearchParams } from "react-router-dom";
import type { ChangeEvent } from "react";

type UsePaginationProps = {
  pagination: Pagination;
  searchParam: URLSearchParams;
  setSearchParam: SetURLSearchParams;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
};

export const usePagination = ({
  pagination,
  setSearchParam,
  searchParam,
}: UsePaginationProps) => {
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.limit)
    : 5;

  const changeSearchHandler = (field: string, params: string) => {
    if (!params) {
      searchParam.delete(field);
    } else {
      searchParam.set(field, params);
    }
    setSearchParam(searchParam, { replace: true });
  };

  const onChangePage = (value: number) => {
    changeSearchHandler("page", value.toString());
  };

  const onChangeSelect = (value: string) => {
    changeSearchHandler("limit", value);
  };

  const onChangeSearchUser = (e: ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value.length >= 3 &&
      changeSearchHandler("search", e.currentTarget.value);
  };

  const clearFilter = async () => {
    setSearchParam({});
  };

  return {
    totalPages,
    onChangePage,
    onChangeSelect,
    onChangeSearchUser,
    clearFilter,
  };
};
