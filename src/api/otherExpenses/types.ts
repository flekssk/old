export type ExpenseCategory = {
  id: number;
  name: string;
};

export type ExpenseCategoriesResponse = Array<ExpenseCategory>;

export type CreateExpenseCategoryRequest = { name: string };

export type CreateExpenseCategoryResponse = ExpenseCategory;

export type Expense = {
  id: number;
  categoryId: number;
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
