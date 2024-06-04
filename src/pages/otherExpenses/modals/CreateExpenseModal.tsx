import {
  useCreateExpenseMutation,
  useExpensesList,
  useUpdateExpenseMutation,
} from "@/api/otherExpenses";
import type {
  Expense,
  ExpenseCategoriesResponse,
} from "@/api/otherExpenses/types";
import { useUserProfile } from "@/api/user";
import { DatepickerControl } from "@/components/forms/DatepickerControl";
import { InputControl } from "@/components/forms/InputControl";
import { SelectControl } from "@/components/forms/SelectControl";
import { formatDateToString } from "@/helpers/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  amount: z.number(),
  category_id: z.number(),
  description: z.string(),
  date: z.string(),
  accountId: z.number(),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues = {
  amount: 0,
  category_id: 0,
  description: "",
  date: "",
  accountId: 0,
};

type Props = {
  expensesCategoriesData?: ExpenseCategoriesResponse;
  expense?: Expense;
  isOpen: boolean;
  onClose: () => void;
};

export const CreateExpenseModal = ({
  expensesCategoriesData,
  expense,
  isOpen,
  onClose,
}: Props) => {
  const [isEdit, setIsEdit] = useState(false);

  const createMutation = useCreateExpenseMutation();
  const userProfile = useUserProfile();
  const expensesList = useExpensesList();
  const updateMutation = useUpdateExpenseMutation();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const { control, watch, setValue, reset } = form;

  const expensesCategoriesOptions =
    expensesCategoriesData?.map(({ id, name }) => ({
      value: id,
      label: name,
    })) || [];

  const accountsOptions =
    userProfile?.data?.accounts.map(({ id, name }) => ({
      value: id,
      label: name,
    })) || [];

  const handleOnClose = () => {
    reset(defaultValues);
    onClose();
  };

  const onSubmit = async () => {
    const data = form.getValues();
    if (isEdit && expense) {
      await updateMutation.mutateAsync({ id: expense?.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    expensesList.refetch();
    handleOnClose();
  };

  useEffect(() => {
    if (expense) {
      setIsEdit(true);
      reset(expense);
    }
  }, [expense, form]);

  return (
    <Modal show={isOpen} onClose={handleOnClose}>
      <Modal.Header>Добавить расход</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-2">
          <FormProvider {...form}>
            <InputControl
              required
              value={watch("amount")}
              name="amount"
              label="Сумма"
              type="number"
            />
            <Controller
              name="category_id"
              control={control}
              render={({ field: { value: fieldValue } }) => (
                <SelectControl
                  label="Статья"
                  name="category_id"
                  placeholder="Статья расхода"
                  selectedOption={expensesCategoriesOptions.find(
                    ({ value }) => fieldValue === value,
                  )}
                  options={expensesCategoriesOptions}
                  setSelectedOption={(option) =>
                    setValue("category_id", Number(option.value))
                  }
                />
              )}
            />
            <InputControl
              required
              name="description"
              value={watch("description")}
              label="Описание"
            />
            <DatepickerControl
              name="date"
              label="Дата"
              onSelectedDateChanged={(date) =>
                setValue("date", formatDateToString(date))
              }
              maxDate={new Date()}
              language="ru-RU"
            />
            <Controller
              name="accountId"
              control={control}
              render={({ field: { value: fieldValue } }) => (
                <SelectControl
                  label="Аккаунт"
                  name="accountId"
                  placeholder="Аккаунт"
                  selectedOption={accountsOptions.find(
                    ({ value }) => fieldValue === value,
                  )}
                  options={accountsOptions}
                  setSelectedOption={(option) =>
                    setValue("accountId", Number(option.value))
                  }
                />
              )}
            />
          </FormProvider>
        </form>
      </Modal.Body>
      <Modal.Footer className="flex flex-col">
        <div className="flex w-full justify-between">
          <Button color="gray" onClick={handleOnClose}>
            Отменить
          </Button>
          <Button
            onClick={onSubmit}
            // disabled={!expenseCategoryName}
            isProcessing={createMutation.isPending}
          >
            {isEdit ? "Сохранить" : "Создать"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
