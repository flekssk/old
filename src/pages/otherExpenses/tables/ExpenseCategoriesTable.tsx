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
  loading?: boolean;
  onOpenEditModal: (expenseCategory: ExpenseCategory) => void;
};

export const ExpenseCategoriesTable = ({
  data,
  loading,
  onOpenEditModal,
}: Props) => {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<ExpenseCategory>();

    return [
      columnHelper.accessor("name", {
        header: "Название",
      }),
      columnHelper.accessor("id", {
        header: "Действия",
        cell: (cell) => (
          <div className="flex gap-2">
            <HiOutlinePencil
              size="20"
              style={{ cursor: "pointer" }}
              onClick={() => onOpenEditModal(cell.row.original)}
            />
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

  return <TableList table={table} loading={loading} />;
};
