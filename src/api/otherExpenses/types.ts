export type ExpenseCategory = {
  id: number;
  name: string;
};

export type ExpenseCategoriesResponse = Array<ExpenseCategory>;

export type CreateExpenseCategoryRequest = { name: string };

export type CreateExpenseCategoryResponse = ExpenseCategory;

// TODO: поправить на беке category_id, т.к. отправялется category_id, а приходит categoryId
export type Expense = {
  id: number;
  category_id: number;
  amount: number;
  description: string;
  date: string;
  accountId: number;
};

export type CreateExpenseRequest = Omit<Expense, "id">;

export type ExpenseListResponse = {
  items: Array<Expense>;
  limit: number;
  page: number;
  total: number;
};
