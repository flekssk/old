import { useState } from "react";
import { Button, Card } from "flowbite-react";
import { EditExpenseCategoryModal } from "./modals/EditExpenseCategoryModal";
import { ExpenseCategoriesTable } from "./tables/ExpenseCategoriesTable";
import { useExpenseCategories } from "@/api/otherExpenses";
import { ExpensesCategoriesSkeleton } from "@/components/skeletons";
import { ExpenseCategory } from "@/api/otherExpenses/types";

export const ExpensesCategories = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState<
    ExpenseCategory | undefined
  >();

  const onOpenEditModal = (expenseCategory: ExpenseCategory) => {
    setSelectedExpenseCategory(expenseCategory);
    setIsOpenModal(true);
  };

  const onCloseEditModal = () => {
    setIsOpenModal(false);
    setSelectedExpenseCategory(undefined);
  };

  const expenseCategories = useExpenseCategories();

  const isExpenseCategoriesLoading = expenseCategories.isLoading;

  if (isExpenseCategoriesLoading) {
    return <ExpensesCategoriesSkeleton />;
  }

  return (
    <>
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="mb-4 text-2xl font-bold dark:text-white">Статьи</h3>
          <Button onClick={() => setIsOpenModal(true)}>Добавить</Button>
        </div>

        <ExpenseCategoriesTable
          data={expenseCategories.data || []}
          onOpenEditModal={onOpenEditModal}
          loading={isExpenseCategoriesLoading}
        />
      </Card>
      <EditExpenseCategoryModal
        isOpen={isOpenModal}
        onClose={onCloseEditModal}
        refresh={expenseCategories.refetch}
        expenseCategory={selectedExpenseCategory}
      />
    </>
  );
};
