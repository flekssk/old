import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { UniverseModalWindow } from "@/components/universalModal";
import EditForm from "@/pages/subPackages/EditForm";
import type { SubscriptionBody } from "@/api/admin/types";
import { Button } from "flowbite-react";
import CreateForm from "@/pages/subPackages/CreateForm";
import { HiBan, HiCheck } from "react-icons/hi";
import TableList from "@/components/table/TableList";

type SubscribeTable = {
  items?: SubscriptionBody[];
};

const SubscribeTable: FC<SubscribeTable> = ({ items }) => {
  const [data, setData] = useState<SubscriptionBody[]>([]);
  const [isEditActive, setIsEditActive] = useState(false);
  const [isCreateActive, setIsCreateActive] = useState(false);
  const [editableData, setEditableData] = useState<SubscriptionBody>();
  useEffect(() => {
    if (items) {
      setData(items);
    }
  }, [items]);

  const onCreateNewSubscribe = () => {
    setIsCreateActive(true);
  };

  const columns: ColumnDef<SubscriptionBody, ReactNode>[] = [
    {
      accessorKey: "title",
      header: "Название",
      cell: (info) => <span>{`${info.getValue()}`}</span>,
    },
    {
      accessorKey: "cost",
      header: "Себестоимость",
      cell: (info) => <span>{`${info.getValue()} Р`}</span>,
    },
    {
      accessorKey: "user_role",
      header: "Роль",
      cell: (info) => <span>{`${info.getValue()}`}</span>,
    },
    {
      accessorKey: "description",
      header: "Описание",
      cell: (info) => <span>{`${info.getValue()}`}</span>,
    },
    {
      accessorKey: "created_at",
      header: "Дата создания",
      cell: (info) => (
        <span>{`${info.getValue()?.toString().slice(0, 10)}`}</span>
      ),
    },
    {
      accessorKey: "is_enabled",
      header: "Доступность",
      cell: (info) => {
        return info.getValue() ? <HiCheck /> : <HiBan />;
      },
    },
    {
      accessorKey: "edit",
      header: "",
      cell: (info) => (
        <div className={" w-[80px] p-2 text-sm font-medium text-blue-400"}>
          <button
            className={"flex items-center gap-0.5"}
            onClick={() => {
              const editData = data.find(
                ({ third_party_id }) =>
                  third_party_id === info.row.original.third_party_id,
              );
              if (editData) {
                setEditableData(editData);
                setIsEditActive(true);
              }
            }}
          >
            <MdOutlineModeEditOutline />
            Изменить
          </button>
        </div>
      ),
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={onCreateNewSubscribe} className="m-2">
          Добавить
        </Button>
      </div>
      <TableList table={table} />
      <UniverseModalWindow isActive={isEditActive} setActive={setIsEditActive}>
        <EditForm
          key={editableData?.third_party_id}
          data={editableData}
          setData={setData}
          setActive={setIsEditActive}
        />
      </UniverseModalWindow>
      <UniverseModalWindow
        isActive={isCreateActive}
        setActive={setIsCreateActive}
      >
        <CreateForm
          key={editableData?.third_party_id}
          setActive={setIsCreateActive}
        />
      </UniverseModalWindow>
    </div>
  );
};

export default SubscribeTable;
