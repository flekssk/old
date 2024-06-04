import type { ExpenseCategory } from "@/api/otherExpenses/types";
import TableList from "@/components/table/TableList";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { HiOutlinePencil } from "react-icons/hi";

type Props = {
  data: Array<ExpenseCategory>;
};

export const ExpenseCategoriesTable = ({ data }: Props) => {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<ExpenseCategory>();

    return [
      columnHelper.accessor("name", {
        header: "Название",
      }),
      columnHelper.accessor("id", {
        header: "Действия",
        cell: () => (
          <div className="flex gap-2">
            <HiOutlinePencil size="20" style={{ cursor: "pointer" }} />
          </div>
        ),
      }),
    ];
  }, []);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const { getRowModel } = table;
  const model = getRowModel();
  const rows = model.rows;

  return <TableList table={table} rows={rows} />;
};
