import React, { type ReactNode, useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useGetUserList } from "@/api/usersList";
import type { UserBody } from "@/api/usersList/types";
import { Link, useSearchParams } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { HiHome, HiUser } from "react-icons/hi";
import { ROUTES } from "@/constants/routes";
import UserListFilters from "@/pages/userList/UserListFilters";
import TableList from "@/components/table/TableList";
import { Breadcrumb, Card } from "flowbite-react";

const UserListTable = () => {
  const [searchParam, setSearchParam] = useSearchParams({});
  const pageValue = searchParam.get("page") || "1";
  const selectValue = searchParam.get("limit") || "10";
  const searchValue = searchParam.get("search") || "";
  const debounceSearchValue = useDebounce(searchValue, 700);

  const userListData = useGetUserList({
    page: pageValue,
    search: debounceSearchValue,
    limit: selectValue,
  });

  const { data: userList } = userListData;
  useEffect(() => {
    const fetchData = async () => {
      await userListData.refetch();
    };
    fetchData();
  }, [pageValue, selectValue, debounceSearchValue]);

  useEffect(() => {
    if (userList?.items) {
      setData(userList?.items);
    }
    if (userList?.items.length === 0) {
      searchParam.set("page", "1");
    }
  }, [userList?.items]);

  const [data, setData] = useState<UserBody[]>([]);
  const newParam: ColumnDef<UserBody, React.ReactNode>[] = [
    {
      accessorKey: "id",
      header: "Ссылка на профиль",
      cell: (info) => {
        return (
          <Link
            to={`${ROUTES.userInfo}/${info.getValue()}`}
            className="group flex w-1/2  content-center "
          >
            <HiUser className="m-auto size-10 transition group-hover:fill-black " />
          </Link>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Почта",
      cell: (info) => <span>{`${info.getValue()}`}</span>,
    },
    {
      accessorKey: "vk_id",
      header: "Идентификатор ВК",
      cell: (info) => (
        <span>{`${info.getValue() ? info.getValue() : "Нет"}`}</span>
      ),
    },
    {
      accessorKey: "yandex_id",
      header: "Идентификатор Яндекса",
      cell: (info) => (
        <span>{`${info.getValue() ? info.getValue() : "Нет"}`}</span>
      ),
    },
    {
      accessorKey: "roles",
      header: "Возможности",
      cell: (info) => {
        const roles = info.getValue() as string[];
        return roles?.map((role, index) => <p key={index}>{role}</p>);
      },
    },
  ];
  const columns: ColumnDef<UserBody, ReactNode>[] = newParam;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const noUsers = userList?.items.length === 0;

  return (
    <div className="m-3">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/">
          <div className="flex items-center gap-x-3">
            <HiHome className="text-xl" />
          </div>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <span className="dark:text-white">Пользователи</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <h3 className="mb-4 text-2xl font-bold dark:text-white">
          Пользователи
        </h3>
        {userList ? (
          <UserListFilters
            searchValue={searchValue}
            selectValue={selectValue}
            searchParam={searchParam}
            totalPages={userList.pagination.total}
            setSearchParam={setSearchParam}
          >
            {noUsers ? (
              <span className="flex justify-center text-2xl">
                Пользователи не найдены
              </span>
            ) : (
              <TableList table={table} />
            )}
          </UserListFilters>
        ) : (
          <div>Loading...</div>
        )}
      </Card>
    </div>
  );
};

export default UserListTable;
