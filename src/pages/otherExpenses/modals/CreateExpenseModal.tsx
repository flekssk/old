import {
  useCreateExpenseMutation,
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
import { DATE_FORMAT } from "@/helpers/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  amount: z
    .string()
    .nonempty("Сумма не может быть пустой")
    .refine((value) => !isNaN(parseFloat(value)), {
      message: "Сумма должна быть числом",
    })
    .transform((value) => parseFloat(value)),
  categoryId: z.object({
    value: z.number().min(1, "Необходимо выбрать категорию"),
  }),
  description: z.string().nonempty("Описание не может быть пустым"),
  date: z.date(),
  accountId: z.object({
    value: z.number().min(1, "Необходимо выбрать аккаунт"),
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues = {
  amount: undefined,
  categoryId: { value: 0 },
  description: "",
  date: new Date(),
  accountId: { value: 0 },
};

type Props = {
  expensesList: Expense[];
  expensesCategoriesData?: ExpenseCategoriesResponse;
  expenseId?: number;
  isOpen: boolean;
  onClose: () => void;
};

export const CreateExpenseModal = ({
  expensesList,
  expensesCategoriesData,
  expenseId,
  isOpen,
  onClose,
}: Props) => {
  const [isEdit, setIsEdit] = useState(false);

  const createMutation = useCreateExpenseMutation();
  const userProfile = useUserProfile();
  const updateMutation = useUpdateExpenseMutation();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onTouched",
  });

  const { reset, formState, watch } = form;

  const { isDirty, isValid } = formState;
  const values = watch();
  console.log("🚀 ~ formState:", formState, isDirty, isValid, values);

  const isButtonDisabled = isEdit ? !isDirty : !isValid;

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
    try {
      if (isEdit && expenseId) {
        await updateMutation.mutateAsync({
          id: expenseId,
          data: {
            ...data,
            date: format(data.date, DATE_FORMAT.SERVER_DATE),
            categoryId: data.categoryId.value,
            accountId: data.accountId.value,
          },
        });
        toast.success("Данные обновлены");
      } else {
        await createMutation.mutateAsync({
          ...data,
          date: format(data.date, DATE_FORMAT.SERVER_DATE),
          categoryId: data.categoryId.value,
          accountId: data.accountId.value,
        });
        toast.success("Данные добавлены");
      }
    } catch {
      toast.error("Ошибка, запрос не выполнен");
    }
    handleOnClose();
  };

  useEffect(() => {
    if (expenseId) {
      const expenseEditData = expensesList.find(({ id }) => expenseId === id);
      if (expenseEditData) {
        setIsEdit(true);
        reset({
          ...expenseEditData,
          date: parseISO(expenseEditData.date),
          categoryId: expensesCategoriesOptions?.find(
            ({ value }) => value === expenseEditData.categoryId,
          ),
          accountId: accountsOptions?.find(
            ({ value }) => value === expenseEditData.accountId,
          ),
        });
      }
    }
  }, [expenseId, form, expensesList, reset]);

  return (
    <Modal show={isOpen} onClose={handleOnClose}>
      <Modal.Header>Добавить расход</Modal.Header>
      <Modal.Body className="overflow-visible">
        <form className="flex flex-col gap-2">
          <FormProvider {...form}>
            <InputControl required name="amount" label="Сумма" type="number" />
            <SelectControl
              label="Статья"
              name="categoryId"
              placeholder="Статья расхода"
              options={expensesCategoriesOptions}
            />
            <InputControl required name="description" label="Описание" />
            <DatepickerControl
              name="date"
              label="Дата"
              maxDate={new Date()}
              language="ru-RU"
            />
            <SelectControl
              label="Аккаунт"
              name="accountId"
              placeholder="Аккаунт"
              options={accountsOptions}
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
            disabled={isButtonDisabled}
            isProcessing={createMutation.isPending || updateMutation.isPending}
          >
            {isEdit ? "Сохранить" : "Создать"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
