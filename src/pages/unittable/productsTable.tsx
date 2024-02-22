import { FC, ReactNode, useEffect, useState } from "react";
import EditForm, { EditFormType } from "./editForm";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UniverseModalWindow } from "../../components/universalModal/universalModal";
import {
  getCommissionForProduct,
  getDeliveryFromPercentOfBuyout,
  getMargin,
  getProfit,
  getROI,
  getTaxOnSale,
  getX,
  priceForMarriage,
} from "../../utils/unitTable";
import { Table } from "../../components/table";

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

export type Product = {
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

const ProductsTable: FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [editableData, setEditableData] = useState<EditFormType>();

  const defaultData = JSON.parse(localStorage.getItem("unitTable") || "{}");

  useEffect(() => {
    if (localStorage.getItem("unitTable") === null) {
      localStorage.setItem("unitTable", JSON.stringify(test));
      setData(test);
    } else {
      setData(defaultData);
    }
  }, []);

  const columns: ColumnDef<Product, ReactNode>[] = [
    {
      accessorKey: "title",
      header: "НАЗВАНИЕ",
      cell: (info) => <span>{`${info.getValue()}`}</span>,
    },
    {
      accessorKey: "purchase",
      header: "ЗАКУПКА",
      cell: (info) => <span>{`${info.getValue()} Р`}</span>,
    },
    {
      accessorKey: "price",
      header: "ЦЕНА БЕЗ СПП",
      cell: (info) => <span>{`${info.getValue()} Р`}</span>,
    },
    {
      accessorKey: "percentOfRedemption",
      header: "% ВЫКУПА",
      cell: (info) => <span>{`${info.getValue()}%`}</span>,
    },
    {
      accessorKey: "x",
      header: "X",
      cell: (info) => (
        <span>{getX(info.row.original.price, info.row.original.purchase)}</span>
      ),
    },
    {
      accessorKey: "delivery",
      header: "ДОСТАВКА МП",
      cell: (info) => (
        <span>
          {`${info.getValue()}Р
          (${getDeliveryFromPercentOfBuyout(
            +`${info.getValue()}`,
            info.row.original.percentOfRedemption,
          )}P)`}
        </span>
      ),
    },
    {
      accessorKey: "tax",
      header: "НАЛОГ",
      cell: (info) => (
        <span>
          {`${getTaxOnSale(info.row.original.price, +`${info.getValue()}`)}Р 
          (${info.getValue()}%)`}
        </span>
      ),
    },
    {
      accessorKey: "commission",
      header: "КОМИССИЯ МП",
      cell: (info) => (
        <span>
          {`${getCommissionForProduct(
            info.row.original.price,
            +`${info.getValue()}`,
          )}Р 
          (${info.getValue()}%)`}
        </span>
      ),
    },
    {
      accessorKey: "fulfilment",
      header: "ФУЛФИЛМЕНТ",
      cell: (info) => <span>{`${info.getValue()}р`}</span>,
    },
    {
      accessorKey: "marriage",
      header: "БРАК",
      cell: (info) => (
        <span>
          {`${priceForMarriage(
            info.row.original.purchase,
            +`${info.getValue()}`,
          )}Р 
          (${info.getValue()}%)`}
        </span>
      ),
    },
    {
      accessorKey: "profit",
      header: "ПРИБЫЛЬ",
      cell: (info) => (
        <span>
          {`${getProfit(
            info.row.original.price,
            info.row.original.delivery,
            info.row.original.percentOfRedemption,
            info.row.original.tax,
            info.row.original.commission,
            info.row.original.fulfilment,
            info.row.original.purchase,
            info.row.original.marriage,
          )}P`}
        </span>
      ),
    },
    {
      accessorKey: "margin",
      header: "МАРЖА",
      cell: (info) => (
        <span>
          {`${getMargin(
            info.row.original.price,
            info.row.original.delivery,
            info.row.original.percentOfRedemption,
            info.row.original.tax,
            info.row.original.commission,
            info.row.original.fulfilment,
            info.row.original.purchase,
            info.row.original.marriage,
          )}%`}
        </span>
      ),
    },
    {
      accessorKey: "roi",
      header: "ROI",
      cell: (info) => (
        <span>
          {`${getROI(
            info.row.original.price,
            info.row.original.delivery,
            info.row.original.percentOfRedemption,
            info.row.original.tax,
            info.row.original.commission,
            info.row.original.fulfilment,
            info.row.original.purchase,
            info.row.original.marriage,
          )}%`}
        </span>
      ),
    },
    {
      accessorKey: "edit",
      header: "",
      cell: (info) => (
        <div className={"w-[80px] text-sm p-2 font-medium text-blue-400"}>
          <button
            className={"flex items-center gap-0.5"}
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
      header: "",
      cell: () => (
        <div className={"w-[80px] text-sm p-2 font-medium text-red-500"}>
          <button className={"flex items-center gap-0.5"}>
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
      <Table table={table} />
      <UniverseModalWindow isActive={isActive} setActive={setIsActive}>
        <EditForm
          key={editableData?.["id"]}
          data={editableData!}
          setData={setData}
          setActive={setIsActive}
        />
      </UniverseModalWindow>
    </div>
  );
};

export default ProductsTable;
