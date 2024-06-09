import type { SetURLSearchParams } from "react-router-dom";
import type { ChangeEvent } from "react";

type UsePaginationProps = {
  searchParam: URLSearchParams;
  setSearchParam: SetURLSearchParams;
  total?: number;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
};

export const usePagination = ({
  setSearchParam,
  searchParam,
  total,
}: UsePaginationProps) => {
  const page = parseInt(searchParam.get("page") ?? "1");
  const limit = parseInt(searchParam.get("limit") ?? "10");
  const totalPages = total ? Math.ceil(total / limit) : 1;

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
    currentPage: page,
    onPageChange: onChangePage,
    page,
    limit,
    total,
  };
};
