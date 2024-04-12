import { useSearchParams } from "react-router-dom";
import React, { type ReactNode, useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useGetCommands } from "@/api/taskQueue";
import TableList from "@/components/table/TableList";
import type { CommandBody } from "@/api/taskQueue/types";
import TaskQueueFilter from "@/pages/taskQueue/TaskQueueFilter";
import { Button } from "flowbite-react";
import { UniverseModalWindow } from "@/components/universalModal";
import CreateCommand from "@/pages/taskQueue/CreateCommand";

const TaskQueueTable = () => {
  const [searchParam, setSearchParam] = useSearchParams({});
  const pageValue = searchParam.get("page") || "1";
  const selectValue = searchParam.get("limit") || "10";

  const commandsResponse = useGetCommands({
    page: pageValue,
    limit: selectValue,
  });
  const { data: commandsList } = commandsResponse;
  useEffect(() => {
    const fetchData = async () => {
      await commandsResponse.refetch();
    };
    fetchData();
  }, [pageValue, selectValue]);

  useEffect(() => {
    if (commandsList?.items) {
      setData(commandsList?.items);
    }
    if (commandsList?.items.length === 0) {
      searchParam.set("page", "1");
    }
  }, [commandsList?.items]);

  const [data, setData] = useState<CommandBody[]>([]);
  const [isCreateActive, setIsCreateActive] = useState(false);
  const onCreateCommand = () => {
    setIsCreateActive(true);
  };
  const newParam: ColumnDef<CommandBody, React.ReactNode>[] = [
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
      cell: (info) => <span>{`${info.getValue()}`}</span>,
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
  ];
  const columns: ColumnDef<CommandBody, ReactNode>[] = newParam;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const { getRowModel } = table;
  const model = getRowModel();
  const rows = model.rows;
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
          <TableList table={table} rows={rows} />
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
