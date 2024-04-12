import type { FC } from "react";
import React, { type ReactNode, useEffect, useState } from "react";
import { useGetUserInfo } from "@/api/usersList";
import type { ColumnDef } from "@tanstack/react-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import type { AccountBody } from "@/api/usersList/types";
import TableList from "@/components/table/TableList";

type UserDescriptionProps = {
  id: string;
};

const UserDescription: FC<UserDescriptionProps> = ({ id }) => {
  const { data: userInfo } = useGetUserInfo(id);
  const [data, setData] = useState<AccountBody[]>([]);
  useEffect(() => {
    userInfo?.accounts && setData(userInfo?.accounts);
  }, [userInfo?.accounts]);
  const roles = userInfo?.roles.join(", ");
  const newParam: ColumnDef<AccountBody, React.ReactNode>[] = [
    {
      accessorKey: "id",
      header: "Идентификатор",
      cell: (info) => <span>{`${info.getValue()}`}</span>,
    },
    {
      accessorKey: "name",
      header: "Имя",
      cell: (info) => (
        <span>{`${info.getValue() ? info.getValue() : "Нет"}`}</span>
      ),
    },
    {
      accessorKey: "deleted_at",
      header: "Дата удаления",
      cell: (info) => (
        <span>{`${info.getValue() ? info.getValue() : "Нет"}`}</span>
      ),
    },
  ];
  const columns: ColumnDef<AccountBody, ReactNode>[] = newParam;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const { getRowModel } = table;

  const model = getRowModel();

  const rows = model.rows;
  return (
    <div className="m-auto w-full border">
      <table className="w-full border">
        <tbody>
          <tr>
            <td className="border-b border-r p-4">
              Идентификатор пользователя
            </td>
            <td className="border-b border-r p-4">{userInfo?.id}</td>
          </tr>
          <tr>
            <td className="border-b border-r p-4">Имя пользователя</td>
            <td className="border-b p-4">{userInfo?.name}</td>
          </tr>
          <tr>
            <td className="border-b border-r p-4">Почта пользователя</td>
            <td className="border-b p-4">{userInfo?.email}</td>
          </tr>
          <tr>
            <td className="border-b border-r p-4">Роли пользователя</td>
            <td className="border-b p-4">{roles}</td>
          </tr>
          <tr>
            <td className="border-b border-r p-4">Идентификатор ВК</td>
            <td className="border-b p-4">{userInfo?.vk_id || "Нет"}</td>
          </tr>
          <tr>
            <td className="border-b border-r p-4">Идентификатор Яндекс</td>
            <td className="border-b p-4">{userInfo?.yandex_id || "Нет"}</td>
          </tr>
        </tbody>
      </table>
      <div className="m-3 text-2xl">Аккаунты :</div>
      {data.length ? (
        <TableList table={table} rows={rows} />
      ) : (
        <div className={"w-full text-center"}>Нет аккаунтов</div>
      )}
    </div>
  );
};

export default UserDescription;
