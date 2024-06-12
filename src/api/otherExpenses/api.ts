import { api } from "../instance";
import { ENDPOINTS } from "./constants";
import type {
  CreateExpenseCategoryRequest,
  CreateExpenseCategoryResponse,
  CreateExpenseRequest,
  ExpenseCategoriesResponse,
  ExpenseListResponse,
  UpdateExpenseCategoryRequest,
  UpdateExpenseCategoryResponse,
} from "./types";

export const getExpenseCategories = (): Promise<ExpenseCategoriesResponse> =>
  api
    .get<ExpenseCategoriesResponse>(ENDPOINTS.expenseCategories)
    .then((res) => res.data);

export const createExpenseCategory = (
  data: CreateExpenseCategoryRequest,
): Promise<CreateExpenseCategoryResponse> =>
  api
    .post<CreateExpenseCategoryResponse>(ENDPOINTS.expenseCategories, data)
    .then((res) => res.data);

export const updateExpenseCategory = (
  data: UpdateExpenseCategoryRequest,
): Promise<UpdateExpenseCategoryResponse> =>
  api
    .put<UpdateExpenseCategoryResponse>(
      `${ENDPOINTS.expenseCategories}/${data.id}`,
      data,
    )
    .then((res) => res.data);

export const getExpensesList = (): Promise<ExpenseListResponse> =>
  api.get<ExpenseListResponse>(ENDPOINTS.expenses).then((res) => res.data);

export const createExpense = (
  data: CreateExpenseRequest,
): Promise<CreateExpenseCategoryResponse> =>
  api
    .post<CreateExpenseCategoryResponse>(ENDPOINTS.expenses, data)
    .then((res) => res.data);

export const updateExpense = (payload: {
  id: number;
  data: CreateExpenseRequest;
}): Promise<CreateExpenseCategoryResponse> =>
  api
    .put<CreateExpenseCategoryResponse>(
      ENDPOINTS.delete.replace("{id}", payload.id.toString()),
      payload.data,
    )
    .then((res) => res.data);

export const deleteExpense = (id: number): Promise<{ message: string }> => {
  return api
    .delete<{
      message: string;
    }>(ENDPOINTS.delete.replace("{id}", id.toString()))
    .then((res) => res.data);
};
