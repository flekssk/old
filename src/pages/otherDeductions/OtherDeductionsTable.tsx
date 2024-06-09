import type { OtherDeduction } from "@/api/otherDeduction/types";
import type { UserProfileAccount } from "@/api/user/types";
import { DataTable } from "@/components/table/DataTable";
import { formatCurrency } from "@/helpers/common";
import { DATE_FORMAT } from "@/helpers/date";
import type { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { useMemo } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

type Props = {
  onOpenDeleteModal: (id: number) => void;
  onOpenEditModal: (id: number) => void;
  loading: boolean;
  data: Array<OtherDeduction>;
  accounts: Array<UserProfileAccount>;
};

export const OtherDeductionTable = ({
  onOpenDeleteModal,
  onOpenEditModal,
  loading,
  data,
  accounts,
}: Props) => {
  //@ts-expect-error column error
  const columns: Array<ColumnDef<OtherDeduction, string>> = useMemo(() => {
    const columnHelper = createColumnHelper<OtherDeduction>();

    return [
      columnHelper.accessor("date", {
        id: "date",
        header: "Дата",
        cell: (cell) =>
          cell.getValue() ? format(cell.getValue(), DATE_FORMAT.DATE) : "-",
        enableColumnFilter: false,
        enableSorting: false,
        meta: {},
      }),
      columnHelper.accessor("description", {
        id: "description",
        header: "Описание",
        enableColumnFilter: false,
      }),
      columnHelper.accessor("value", {
        header: "Сумма",
        cell: (cell) => formatCurrency(cell.getValue()),
        enableColumnFilter: false,
        enableSorting: false,
        meta: {},
      }),

      columnHelper.accessor("wbAccountId", {
        id: "wbAccountId",
        header: "Аккаунт",
        cell: (cell) => {
          const accountName = accounts.find(
            ({ id }) => id === cell.getValue(),
          )?.name;
          return accountName;
        },
        enableColumnFilter: false,
        enableSorting: false,
        meta: {},
      }),
      columnHelper.accessor("id", {
        id: "id",
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
        enableColumnFilter: false,
        enableSorting: false,
        meta: {},
      }),
    ];
  }, [accounts]);

  return (
    <DataTable
      className="w-full"
      cellRangeSelection={false}
      loading={loading}
      columns={columns}
      data={data || []}
    />
  );
};
