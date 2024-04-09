import type { FC, ReactNode } from "react";
import React, { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table as TableFlowbite } from "flowbite-react/lib/esm/components/Table/Table";
import classNames from "classnames";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { UniverseModalWindow } from "@/components/universalModal";
import EditForm from "@/pages/subPackages/EditForm";
import type { SubscriptionBody } from "@/api/admin/types";
import { Button } from "flowbite-react";
import CreateForm from "@/pages/subPackages/CreateForm";
import { HiBan, HiCheck } from "react-icons/hi";

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
      header: "Себистоимость",
      cell: (info) => <span>{`${info.getValue()} Р`}</span>,
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
        <div className={"w-[80px] p-2 text-sm font-medium text-blue-400"}>
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

  const { getRowModel } = table;

  const model = getRowModel();
  const rows = model.rows;
  return (
    <div>
      <TableFlowbite striped>
        <TableFlowbite.Head>
          {table.getHeaderGroups().map((headerGroup) => (
            <React.Fragment key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableFlowbite.HeadCell
                  key={header.id}
                  className="relative"
                  style={{
                    width: header.getSize(),
                  }}
                >
                  <p>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </p>
                  <div
                    {...{
                      onDoubleClick: () => header.column.resetSize(),
                      onMouseDown: header.getResizeHandler(),
                      onTouchStart: header.getResizeHandler(),
                      className: classNames(
                        "absolute inset-y-0 right-0 w-1 cursor-col-resize hover:bg-gray-400 active:bg-primary-400",
                        {
                          "bg-primary-400": header.column.getIsResizing(),
                        },
                      ),
                    }}
                  ></div>
                </TableFlowbite.HeadCell>
              ))}
            </React.Fragment>
          ))}
        </TableFlowbite.Head>
        <TableFlowbite.Body>
          {rows.map((row) => (
            <React.Fragment key={row.id}>
              <TableFlowbite.Row className="cursor-pointer border-b">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableFlowbite.Cell
                      style={{ width: cell.column.getSize() }}
                      key={cell.id}
                    >
                      <span
                        {...{
                          className: classNames(
                            "overflow-hidden text-ellipsis",
                            {
                              "text-[#1890FF]": cell.column.id === "vendorCode",
                            },
                          ),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </span>
                    </TableFlowbite.Cell>
                  );
                })}
              </TableFlowbite.Row>
            </React.Fragment>
          ))}
        </TableFlowbite.Body>
      </TableFlowbite>
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
      <Button onClick={onCreateNewSubscribe} className="m-2">
        Добавить
      </Button>
    </div>
  );
};

export default SubscribeTable;
