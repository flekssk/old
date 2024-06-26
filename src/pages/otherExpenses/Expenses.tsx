import { useEffect, useMemo, useState } from "react";
import { Button, Card, Pagination } from "flowbite-react";
import { ExpensesTable } from "./tables/ExpensesTable";
import { CreateExpenseModal } from "./modals/CreateExpenseModal";
import {
  useDeleteExpense,
  useExpenseCategories,
  useExpensesList,
} from "@/api/otherExpenses";
import { DeleteExpenseModal } from "./modals/DeleteExpenseModal";
import { DatePickerWithRange } from "@/components/shadcnUi/Datepicker";
import { ExpensesSkeleton } from "@/components/skeletons";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { usePagination } from "@/hooks/usePagination";
import { useSearchParams } from "react-router-dom";
import type { ExpenseListRequest } from "@/api/otherExpenses/types";
import { DATE_FORMAT } from "@/helpers/date";
import type { SelectOption } from "@/components/Select";
import { Select } from "@/components/Select";

export const Expenses = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [selectExpensesCategory, setSelectExpensesCategory] = useState<
    SelectOption | undefined
  >(undefined);
  const [expenseDeleteId, setExpenseDeleteId] = useState<number | undefined>(
    undefined,
  );
  const [expenseUpdateId, setExpenseUpdateId] = useState<number | undefined>(
    undefined,
  );
  const [totalPages, setTotalPages] = useState(0);
  const [isOpenCreateExpenseModal, setIsOpenCreateExpenseModal] =
    useState(false);
  const [isOpenDeleteExpenseModal, setIsOpenDeleteExpenseModal] =
    useState(false);

  const pagination = usePagination({
    searchParam,
    setSearchParam,
    total: totalPages,
  });

  const params = useMemo<ExpenseListRequest>(() => {
    const res: ExpenseListRequest = {
      page: pagination.page,
      limit: pagination.limit,
    };
    if (date?.from) {
      res.fromDate = format(date.from, DATE_FORMAT.SERVER_DATE);
    }

    if (date?.to) {
      res.toDate = format(date.to, DATE_FORMAT.SERVER_DATE);
    }

    if (selectExpensesCategory) {
      res.categoryId = selectExpensesCategory.value as number;
    }

    return res;
  }, [date, pagination, selectExpensesCategory]);

  const expensesList = useExpensesList(params, {
    placeholderData: (previousData) => previousData,
  });

  const deleteExpense = useDeleteExpense();

  const expenseCategories = useExpenseCategories();

  const expensesListData = expensesList.data?.items ?? [];
  const isLoading = expensesList.isLoading;

  const expensesCategoriesOptions = useMemo(() => {
    if (!expenseCategories.data) return [];

    return expenseCategories.data.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
  }, [expenseCategories.data]);

  const handleOpenDeleteModal = (id: number) => {
    setExpenseDeleteId(id);
    setIsOpenDeleteExpenseModal(true);
  };

  const handleOpenEditModal = (expenseId: number) => {
    setExpenseUpdateId(expenseId);
    setIsOpenCreateExpenseModal(true);
  };

  const handleResetFilters = () => {
    setDate(undefined);
    setSelectExpensesCategory(undefined);
  };

  const handleConfirmDeleteExpense = async () => {
    try {
      if (expenseDeleteId) {
        await deleteExpense.mutateAsync(expenseDeleteId);
        expensesList.refetch();
      }
      toast.success("Данные успешно удалены");
    } catch {
      toast.error("Ошибка, запрос не выполнен");
    }
    setIsOpenDeleteExpenseModal(false);
  };

  const handleCloseCreateExpenseModal = () => {
    setIsOpenCreateExpenseModal(false);
    setExpenseUpdateId(undefined);
  };

  const handleCloseDeleteExepenseModal = () => {
    setIsOpenDeleteExpenseModal(false);
    setExpenseDeleteId(undefined);
  };

  useEffect(() => {
    if (expensesList.data?.total) {
      setTotalPages(expensesList.data.total);
    }
  }, [expensesList.data?.total]);

  if (isLoading) {
    return <ExpensesSkeleton />;
  }

  return (
    <>
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="mb-4 text-2xl font-bold dark:text-white">
            Операционные расходы
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <DatePickerWithRange date={date} onChangeDate={setDate} />
            <Select
              placeholder="Выберите статьи"
              options={expensesCategoriesOptions}
              selectedOption={selectExpensesCategory}
              setSelectedOption={setSelectExpensesCategory}
            />
            <Button color="light" onClick={handleResetFilters}>
              Сбросить
            </Button>
          </div>
          <Button onClick={() => setIsOpenCreateExpenseModal(true)}>
            Добавить
          </Button>
        </div>
        <div>
          <ExpensesTable
            data={expensesListData}
            onOpenDeleteModal={handleOpenDeleteModal}
            onOpenEditModal={handleOpenEditModal}
          />
          {pagination.totalPages > 1 ? <Pagination {...pagination} /> : null}
        </div>
      </Card>
      <CreateExpenseModal
        expensesCategoriesData={expenseCategories.data}
        expenseId={expenseUpdateId}
        isOpen={isOpenCreateExpenseModal}
        onClose={handleCloseCreateExpenseModal}
      />
      <DeleteExpenseModal
        isOpen={isOpenDeleteExpenseModal}
        onConfirmDelete={handleConfirmDeleteExpense}
        onClose={handleCloseDeleteExepenseModal}
      />
    </>
  );
};
