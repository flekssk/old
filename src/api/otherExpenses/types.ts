export type ExpenseCategory = {
  id: number;
  name: string;
};

export type ExpenseCategoriesResponse = Array<ExpenseCategory>;

export type CreateExpenseCategoryRequest = { name: string };

export type UpdateExpenseCategoryRequest = { name: string; id: number };

export type CreateExpenseCategoryResponse = ExpenseCategory;

export type UpdateExpenseCategoryResponse = ExpenseCategory;

export type Expense = {
  id: number;
  categoryId: number;
  amount: number;
  description: string;
  date: string;
  accountId: number;
};

export type CreateExpenseRequest = Omit<Expense, "id">;

export type ExpenseListRequest = {
  page?: number;
  limit?: number;
  dateFrom?: string;
  dateTo?: string;
  wbAccountId?: number;
};

export type ExpenseListResponse = {
  items: Array<Expense>;
  limit: number;
  page: number;
  total: number;
};
