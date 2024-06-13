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
import type { MultiSelectOption } from "@/components/MultiSelect";
import { MultiSelect } from "@/components/MultiSelect";
import { DatePickerWithRange } from "@/components/shadcnUi/Datepicker";
import { ExpensesSkeleton } from "@/components/skeletons";
import type { DateRange } from "react-day-picker";
import { addDays, isWithinInterval } from "date-fns";
import { toast } from "react-toastify";

export const Expenses = () => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [selectedExpensesCategories, setSelectedExpensesCategories] = useState<
    MultiSelectOption[] | undefined
  >(undefined);
  const [expenseDeleteId, setExpenseDeleteId] = useState<number | undefined>(
    undefined,
  );
  const [expenseUpdateId, setExpenseUpdateId] = useState<number | undefined>(
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
    setExpenseUpdateId(expenseId);
    setIsOpenCreateExpenseModal(true);
  };

  const handleResetFilters = () => {
    setDate(undefined);
    setSelectedExpensesCategories(undefined);
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
              multiple
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
            data={filteredExpensesData}
            onOpenDeleteModal={handleOpenDeleteModal}
            onOpenEditModal={handleOpenEditModal}
          />
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
