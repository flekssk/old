import { useState } from "react";
import { Button, Card } from "flowbite-react";
import { CreateExpenseCategoryModal } from "./modals/CreateExpenseCategoryModal";
import { ExpenseCategoriesTable } from "./tables/ExpenseCategoriesTable";
import { useExpenseCategories } from "@/api/otherExpenses";
import { ExpensesCategoriesSkeleton } from "@/components/skeletons";

export const ExpensesCategories = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const expenseCategories = useExpenseCategories();

  const isExpenseCategoriesLoading = expenseCategories.isLoading;
  const isExpenseCategoriesAvailable = Boolean(expenseCategories.data?.length);

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
        {isExpenseCategoriesAvailable ? (
          <ExpenseCategoriesTable data={expenseCategories.data || []} />
        ) : (
          <div>Данных нет</div>
        )}
      </Card>
      <CreateExpenseCategoryModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </>
  );
};
