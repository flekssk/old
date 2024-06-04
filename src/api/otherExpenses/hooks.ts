import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "./constants";
import type { ExpenseCategoriesResponse, ExpenseListResponse } from "./types";
import {
  createExpense,
  createExpenseCategory,
  updateExpense,
  deleteExpense,
  getExpenseCategories,
  getExpensesList,
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

export const useExpensesList = (
  options: Partial<UseQueryOptions<ExpenseListResponse, Error>> = {},
) =>
  useQuery({
    ...options,
    queryKey: [QUERY_KEYS.expenses],
    queryFn: getExpensesList,
  });

export const useCreateExpenseMutation = createCustomMutation(createExpense);
export const useUpdateExpenseMutation = createCustomMutation(updateExpense);
export const useDeleteExpense = createCustomMutation(deleteExpense);
