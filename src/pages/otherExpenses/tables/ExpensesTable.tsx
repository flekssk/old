import { useExpenseCategories } from "@/api/otherExpenses";
import type { Expense } from "@/api/otherExpenses/types";
import { useUserProfile } from "@/api/user";
import TableList from "@/components/table/TableList";
import { formatCurrency } from "@/helpers/common";
import { parseIsoDateString } from "@/helpers/date";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

type OverrideExpenes = Omit<Expense, "category_id"> & { categoryId: number };

type Props = {
  data: Array<Expense>;
  onOpenDeleteModal: (id: number) => void;
  onOpenEditModal: (id: number) => void;
};

export const ExpensesTable = ({
  data,
  onOpenDeleteModal,
  onOpenEditModal,
}: Props) => {
  const expenseCategories = useExpenseCategories();
  const userProfile = useUserProfile();
  const expenseCategoriesList = expenseCategories.data;
  const accountList = userProfile.data?.accounts;

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<OverrideExpenes>();

    return [
      columnHelper.accessor("date", {
        header: "Дата",
        cell: (cell) => parseIsoDateString(cell.getValue()),
      }),
      columnHelper.accessor("description", {
        header: "Описание",
      }),
      columnHelper.accessor("amount", {
        header: "Сумма",
        cell: (cell) => formatCurrency(cell.getValue()),
      }),
      columnHelper.accessor("categoryId", {
        header: "Статья расходов",
        cell: (cell) => {
          const expenseCategoryName = expenseCategoriesList?.find(
            ({ id }) => id === cell.getValue(),
          )?.name;
          return expenseCategoryName;
        },
      }),
      columnHelper.accessor("accountId", {
        header: "Аккаунт",
        cell: (cell) => {
          const accountName = accountList?.find(
            ({ id }) => id === cell.getValue(),
          )?.name;
          return accountName;
        },
      }),
      columnHelper.accessor("id", {
        header: "Действия",
        cell: (cell) => (
          <div className="flex gap-2">
            <HiOutlinePencil
              size="20"
              style={{ cursor: "pointer" }}
              onClick={() => onOpenEditModal(cell.getValue())}
            />
            <HiOutlineTrash
              size="20"
              style={{ cursor: "pointer" }}
              onClick={() => onOpenDeleteModal(cell.getValue())}
            />
          </div>
        ),
      }),
    ];
  }, [accountList, expenseCategoriesList]);

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
