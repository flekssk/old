import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "./constants";
import type {
  ExpenseCategoriesResponse,
  ExpenseListRequest,
  ExpenseListResponse,
} from "./types";
import {
  createExpense,
  createExpenseCategory,
  updateExpense,
  deleteExpense,
  getExpenseCategories,
  getExpensesList,
  updateExpenseCategory,
} from "./api";
import { createCustomMutation } from "../helper";

export const useExpenseCategories = (
  options: Partial<UseQueryOptions<ExpenseCategoriesResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.expenseCategories],
    queryFn: getExpenseCategories,
  });

export const useCreateExpenseCategoryMutation = createCustomMutation(
  createExpenseCategory,
);

export const useUpdateExpenseCategoryMutation = createCustomMutation(
  updateExpenseCategory,
);

export const useExpensesList = (
  payload: ExpenseListRequest,
  options: Partial<UseQueryOptions<ExpenseListResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.expenses, payload],
    queryFn: () => getExpensesList(payload),
  });

export const useCreateExpenseMutation = createCustomMutation(createExpense);
export const useUpdateExpenseMutation = createCustomMutation(updateExpense);
export const useDeleteExpense = createCustomMutation(deleteExpense);
