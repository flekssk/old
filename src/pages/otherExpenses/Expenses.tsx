import { useMemo, useState } from "react";
import { Button, Card } from "flowbite-react";
import { ExpensesTable } from "./tables/ExpensesTable";
import { CreateExpenseModal } from "./modals/CreateExpenseModal";
import {
  useDeleteExpense,
  useExpenseCategories,
  useExpensesList,
} from "@/api/otherExpenses";
import { DeleteExpenseModal } from "./modals/DeleteExpenseModal";
import type { Expense } from "@/api/otherExpenses/types";
import type { MultiSelectOption } from "@/components/MultiSelect";
import { MultiSelect } from "@/components/MultiSelect";
import { DatePickerWithRange } from "@/components/shadcnUi/Datepicker";
import { ExpensesSkeleton } from "@/components/skeletons";
import type { DateRange } from "react-day-picker";
import { addDays, isWithinInterval } from "date-fns";

export const Expenses = () => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const [selectedExpensesCategories, setSelectedExpensesCategories] = useState<
    MultiSelectOption[] | undefined
  >(undefined);

  const [expenseDeleteId, setExpenseDeleteId] = useState<number | undefined>(
    undefined,
  );
  const [expenseEdit, setExpenseEdit] = useState<Expense | undefined>(
    undefined,
  );
  const [isOpenCreateExpenseModal, setIsOpenCreateExpenseModal] =
    useState(false);
  const [isOpenDeleteExpenseModal, setIsOpenDeleteExpenseModal] =
    useState(false);

  const deleteExpense = useDeleteExpense();
  const expensesList = useExpensesList();
  const expenseCategories = useExpenseCategories();

  const isLoading = expensesList.isLoading;
  const isExpensesAvailable = expensesList.data?.items.length;

  const expensesCategoriesOptions = useMemo(() => {
    if (!expenseCategories.data) return [];

    return expenseCategories.data.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
  }, [expenseCategories.data]);

  const filteredExpensesData = useMemo(() => {
    if (!expensesList.data?.items) return [];

    const filteredByDate = expensesList.data?.items.filter((value) => {
      if (date && date.from && date.to)
        return isWithinInterval(value.date, {
          start: date?.from,
          end: addDays(date?.to, 1),
        });

      return value;
    });

    if (selectedExpensesCategories?.length) {
      const categoryIds = new Set(
        selectedExpensesCategories.map((category) => category.value),
      );

      const filteredExpenses = filteredByDate.filter((expense) =>
        categoryIds.has(expense.categoryId),
      );

      return filteredExpenses;
    }

    return filteredByDate;
  }, [expensesList.data?.items, selectedExpensesCategories, date]);

  const handleOpenDeleteModal = (id: number) => {
    setExpenseDeleteId(id);
    setIsOpenDeleteExpenseModal(true);
  };

  const handleOpenEditModal = (expenseId: number) => {
    const expenseEditData = expensesList.data?.items.find(
      ({ id }) => expenseId === id,
    );

    if (expenseEditData) {
      setExpenseEdit(expenseEditData);
      setIsOpenCreateExpenseModal(true);
    }
  };

  const handleResetFilters = () => {
    setDate(undefined);
    setSelectedExpensesCategories(undefined);
  };

  const handleConfirmDeleteExpense = async () => {
    if (expenseDeleteId) {
      await deleteExpense.mutateAsync(expenseDeleteId);
      expensesList.refetch();
    }
    setIsOpenDeleteExpenseModal(false);
  };

  const handleCloseCreateExpenseModal = () => {
    setIsOpenCreateExpenseModal(false);
    setExpenseEdit(undefined);
  };

  const handleCloseDeleteExepenseModal = () => {
    setIsOpenDeleteExpenseModal(false);
    setExpenseDeleteId(undefined);
  };

  if (isLoading) {
    return <ExpensesSkeleton />;
  }

  return (
    <>
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="mb-4 text-2xl font-bold dark:text-white">Расходы</h3>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <DatePickerWithRange date={date} onChangeDate={setDate} />
            <MultiSelect
              placeholder="Выберите статьи"
              options={expensesCategoriesOptions}
              selectedOptions={selectedExpensesCategories}
              setSelectedOptions={setSelectedExpensesCategories}
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
          {isExpensesAvailable ? (
            <ExpensesTable
              data={filteredExpensesData}
              onOpenDeleteModal={handleOpenDeleteModal}
              onOpenEditModal={handleOpenEditModal}
            />
          ) : (
            <div>Данных нет</div>
          )}
        </div>
      </Card>
      <CreateExpenseModal
        expensesCategoriesData={expenseCategories.data}
        expense={expenseEdit}
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
