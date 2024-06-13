import { useSearchParams } from "react-router-dom";
import React, { type ReactNode, useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useGetCommands } from "@/api/taskQueue";
import TableList from "@/components/table/TableList";
import type { CommandBody } from "@/api/taskQueue/types";
import TaskQueueFilter from "@/pages/taskQueue/TaskQueueFilter";
import { Button } from "flowbite-react";
import { UniverseModalWindow } from "@/components/universalModal";
import CreateCommand from "@/pages/taskQueue/CreateCommand";
import { DeleteTask } from "./TaskDelete";
import { STATUSES } from "./constant";
import { useDebounce } from "@/hooks/useDebounce";

const TaskQueueTable = () => {
  const [searchParam, setSearchParam] = useSearchParams({});
  const pageValue = searchParam.get("page") || "1";
  const selectValue = searchParam.get("limit") || "10";
  const id = searchParam.get("id") || undefined;
  const command = searchParam.get("command") || undefined;
  const status = searchParam.get("status") || undefined;

  const filterParams = useMemo(() => {
    return {
      page: pageValue,
      limit: selectValue,
      id,
      command,
      status,
    };
  }, [pageValue, selectValue, id, command, status]);

  const params = useDebounce(filterParams, 700);

  const commandsResponse = useGetCommands(params);
  const { data: commandsList } = commandsResponse;

  const data: CommandBody[] = useMemo(() => {
    return commandsList?.items ?? [];
  }, [commandsList]);
  const [isCreateActive, setIsCreateActive] = useState(false);
  const onCreateCommand = () => {
    setIsCreateActive(true);
  };

  console.log("🚀 ~ TaskQueueTable ~ commandsResponse:", commandsResponse, {
    page: pageValue,
    limit: selectValue,
    // id: searchParam.get("id") || undefined,
    // command: searchParam.get("command") || undefined,
    // status: searchParam.get("status") || undefined,
  });

  const newParam: ColumnDef<CommandBody, React.ReactNode>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (info) => {
        return <span>{info.getValue()}</span>;
      },
    },
    {
      accessorKey: "command",
      header: "Команда",
      cell: (info) => {
        return <span>{info.getValue()}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Статус",
      cell: (info) => (
        <span>{`${STATUSES[info.getValue() as keyof typeof STATUSES]}`}</span>
      ),
    },
    {
      accessorKey: "priority",
      header: "Приоритет",
      cell: (info) => <span>{`${info.getValue()}`}</span>,
    },
    {
      accessorKey: "result",
      header: "Результат",
      cell: (info) => (
        <span>{`${info.getValue() ? info.getValue() : "Нет"}`}</span>
      ),
    },
    {
      accessorKey: "account_id",
      header: "Идентификатор аккаунта",
      cell: (info) => (
        <span>{`${info.getValue() ? info.getValue() : "Нет"}`}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Дата создания",
      cell: (info) => <span>{`${info.getValue()}`}</span>,
    },
    {
      accessorKey: "updatedAt",
      header: "Дата обновления",
      cell: (info) => <span>{`${info.getValue()}`}</span>,
    },
    {
      accessorKey: "executeAt",
      header: "Дата выполнения",
      cell: (info) => <span>{`${info.getValue()}`}</span>,
    },
    {
      accessorKey: "actions",
      header: "Действия",
      cell: (info) => {
        return (
          <DeleteTask
            refetch={commandsResponse.refetch}
            id={info.row.original.id}
          />
        );
      },
    },
  ];
  const columns: ColumnDef<CommandBody, ReactNode>[] = newParam;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="flex w-full justify-end">
        <Button onClick={onCreateCommand}>Добавить</Button>
      </div>
      {commandsList ? (
        <TaskQueueFilter
          commandList={commandsList}
          searchParam={searchParam}
          setSearchParam={setSearchParam}
          selectValue={selectValue}
          pageValue={pageValue}
        >
          <TableList table={table} />
        </TaskQueueFilter>
      ) : (
        <div>Loading ...</div>
      )}
      <UniverseModalWindow
        isActive={isCreateActive}
        setActive={setIsCreateActive}
      >
        <CreateCommand setActive={setIsCreateActive} />
      </UniverseModalWindow>
    </div>
  );
};

export default TaskQueueTable;
