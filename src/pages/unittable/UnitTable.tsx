import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { UniverseModalWindow } from "../../components/UniversalModal/UniversalModal";
import type { EditFormType } from "./editForm/EditForm";
import EditForm from "./editForm/EditForm";

export type Person = {
  id: number;
  title: string;
  purchase: number;
  price: number;
  percentOfRedemption: number;
  x: string | null;
  delivery: number;
  tax: number;
  commission: number;
  fulfilment: number;
  marriage: number;
  profit: number | null;
  margin: number | null;
  roi: number | null;
};

const UnitTable: FC = () => {
  return (
    <NavbarSidebarLayout>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Unit экономика
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <ProductsTable />
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

const test = [
  {
    id: 1,
    title: "Джинсы",
    purchase: 1100,
    price: 4500,
    percentOfRedemption: 35,
    x: null,
    delivery: 120,
    tax: 6,
    commission: 23,
    fulfilment: 100,
    marriage: 5,
    profit: null,
    margin: null,
    roi: null,
  },
  {
    id: 2,
    title: "Юбки",
    purchase: 800,
    price: 2000,
    percentOfRedemption: 40,
    x: null,
    delivery: 120,
    tax: 6,
    commission: 23,
    fulfilment: 100,
    marriage: 5,
    profit: null,
    margin: null,
    roi: null,
  },
  {
    id: 3,
    title: "Шорты",
    purchase: 700,
    price: 1800,
    percentOfRedemption: 50,
    x: null,
    delivery: 120,
    tax: 6,
    commission: 23,
    fulfilment: 100,
    marriage: 5,
    profit: null,
    margin: null,
    roi: null,
  },
];

const ProductsTable: FC = () => {
  const [data, setData] = useState<Person[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [editableData, setEditableData] = useState<EditFormType>();

  const defaultData = useMemo(
      // @ts-ignore
    () => JSON.parse(localStorage.getItem("unitTable")),
    [],
  );

  useEffect(() => {
    if (localStorage.getItem("unitTable") === null) {
      localStorage.setItem("unitTable", JSON.stringify(test));
      setData(test);
    } else {
      setData(defaultData);
    }
  }, []);

  const columns = [
    {
      accessorKey: "title",
      header: "Название",
      cell: (info: any) => <span>{`${info.getValue()}`}</span>,
    },
    {
      accessorKey: "purchase",
      header: "Закупка",
      cell: (info: any) => <span>{`${info.getValue()} Р`}</span>,
    },
    {
      accessorKey: "price",
      header: "Цена без СПП",
      cell: (info: any) => <span>{`${info.getValue()} Р`}</span>,
    },
    {
      accessorKey: "percentOfRedemption",
      header: "% выкупа",
      cell: (info: any) => <span>{`${info.getValue()}%`}</span>,
    },
    {
      accessorKey: "x",
      header: "X",
      cell: (info: any) => (
        <span>
          {(
            +`${info.row.original.price}` / +`${info.row.original.purchase}`
          ).toFixed(1)}
        </span>
      ),
    },
    {
      accessorKey: "delivery",
      header: "Доставка МП",
      cell: (info: any) => (
        <span>
          {`${info.getValue()}Р`}
          {" ("}
          {(
            +`${info.getValue()}` /
            +`${info.row.original.percentOfRedemption / 100}`
          ).toFixed(0)}
          {"P)"}
        </span>
      ),
    },
    {
      accessorKey: "tax",
      header: "Налог",
      cell: (info: any) => (
        <span>
          {+`${info.row.original.price}` * +`${info.getValue() / 100}`}
          {"Р "}
          {`(${info.getValue()}%)`}
        </span>
      ),
    },
    {
      accessorKey: "commission",
      header: "Комиссия МП",
      cell: (info: any) => (
        <span>
          {+`${info.row.original.price}` * +`${info.getValue() / 100}`}
          {"Р "}
          {`(${info.getValue()}%)`}
        </span>
      ),
    },
    {
      accessorKey: "fulfilment",
      header: "ФулФилмент",
      cell: (info: any) => <span>{`${info.getValue()}р`}</span>,
    },
    {
      accessorKey: "marriage",
      header: "Брак",
      cell: (info: any) => (
        <span>
          {+`${info.row.original.purchase}` * +`${info.getValue() / 100}`}
          {"Р "}
          {`(${info.getValue()}%)`}
        </span>
      ),
    },
    {
      accessorKey: "profit",
      header: "Прибыль",
      cell: (info: any) => (
        <span>
          {+`${info.row.original.price}` -
            +(
              +`${info.row.original.delivery}` /
              +`${info.row.original.percentOfRedemption / 100}`
            ).toFixed(0) -
            +(
              +`${info.row.original.price}` * +`${info.row.original.tax / 100}`
            ).toFixed(0) -
            +(
              +`${info.row.original.price}` *
              +`${info.row.original.commission / 100}`
            ).toFixed(0) -
            +`${info.row.original.fulfilment}` -
            +(
              +`${info.row.original.purchase}` *
              +`${info.row.original.marriage / 100}`
            ).toFixed(0) -
            +`${info.row.original.purchase}`}
          {"Р"}
        </span>
      ),
    },
    {
      accessorKey: "margin",
      header: "Маржа",
      cell: (info: any) => (
        <span>
          {(
            ((+`${info.row.original.price}` -
              +(
                +`${info.row.original.delivery}` /
                +`${info.row.original.percentOfRedemption / 100}`
              ).toFixed(0) -
              +(
                +`${info.row.original.price}` *
                +`${info.row.original.tax / 100}`
              ).toFixed(0) -
              +(
                +`${info.row.original.price}` *
                +`${info.row.original.commission / 100}`
              ).toFixed(0) -
              +`${info.row.original.fulfilment}` -
              +(
                +`${info.row.original.purchase}` *
                +`${info.row.original.marriage / 100}`
              ).toFixed(0) -
              +`${info.row.original.purchase}`) *
              100) /
            +`${info.row.original.price}`
          ).toFixed(0)}
          {"%"}
        </span>
      ),
    },
    {
      accessorKey: "roi",
      header: "ROI",
      cell: (info: any) => (
        <span>
          {(
            ((+`${info.row.original.price}` -
              +(
                +`${info.row.original.delivery}` /
                +`${info.row.original.percentOfRedemption / 100}`
              ).toFixed(0) -
              +(
                +`${info.row.original.price}` *
                +`${info.row.original.tax / 100}`
              ).toFixed(0) -
              +(
                +`${info.row.original.price}` *
                +`${info.row.original.commission / 100}`
              ).toFixed(0) -
              +`${info.row.original.fulfilment}` -
              +(
                +`${info.row.original.purchase}` *
                +`${info.row.original.marriage / 100}`
              ).toFixed(0) -
              +`${info.row.original.purchase}`) *
              100) /
            +`${info.row.original.purchase}`
          ).toFixed(0)}
          {"%"}
        </span>
      ),
    },
    {
      accessorKey: "edit",
      cell: (info: any) => (
        <div
          style={{
            backgroundColor: "#ffffff",
            fontFamily: "Inter",
            fontSize: "12px",
            lineHeight: "18px",
            fontWeight: 500,
            color: "#7bbfff",
            width: "80px",
            padding: "10px 0 10px 10px",
          }}
        >
          <button
            style={{ display: "flex", alignItems: "center", gap: "2px" }}
            onClick={() => {
              setIsActive(true);
              setEditableData(
                data.find(({ id }) => id === info.row.original.id),
              );
            }}
          >
            <MdOutlineModeEditOutline />
            Изменить
          </button>
        </div>
      ),
    },
    {
      accessorKey: "delete",
      cell: () => (
        <div
          style={{
            backgroundColor: "#ffffff",
            fontFamily: "Inter",
            fontSize: "12px",
            lineHeight: "18px",
            fontWeight: 500,
            color: "#e96565",
            width: "80px",
            padding: "10px 10px 10px 10px",
          }}
        >
          <button style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <RiDeleteBin6Line />
            Удалить
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
      <table style={{ width: "100%" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <th
                  key={header.id}
                  style={{
                    padding: "10px 0",
                    fontFamily: "Inter",
                    fontSize: "12px",
                    lineHeight: "18px",
                    fontWeight: 600,
                    color: "#9499a3",
                    textTransform: "uppercase",
                  }}
                >
                  {header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: any) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell: any) => (
                <td
                  key={cell.id}
                  style={{
                    backgroundColor: "#ffffff",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    lineHeight: "21px",
                    fontWeight: 500,
                    color: "#111928",
                    width: "120px",
                    padding: "10px 0 10px 30px",
                    borderBottom: "#9499a3 .5px solid",
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <UniverseModalWindow isActive={isActive} setActive={setIsActive}>
        <EditForm
          key={editableData?.id}
          data={editableData!}
          setData={setData}
          setActive={setIsActive}
        />
      </UniverseModalWindow>
    </div>
  );
};

export default UnitTable;
