import {
  useCreateExpenseMutation,
  useExpensesList,
  useUpdateExpenseMutation,
} from "@/api/otherExpenses";
import type { ExpenseCategoriesResponse } from "@/api/otherExpenses/types";
import { useUserProfile } from "@/api/user";
import { DatepickerControl } from "@/components/forms/DatepickerControl";
import { InputControl } from "@/components/forms/InputControl";
import { SelectControl } from "@/components/forms/SelectControl";
import { formatDateToString } from "@/helpers/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
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
  categoryId: z.number().min(1, "Необходимо выбрать категорию"),
  description: z.string().nonempty("Описание не может быть пустым"),
  date: z.string().min(1, "Дата не может быть пустой"),
  accountId: z.number().min(1, "Необходимо выбрать аккаунт"),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues = {
  amount: undefined,
  categoryId: 0,
  description: "",
  date: formatDateToString(new Date()),
  accountId: 0,
};

type Props = {
  expensesCategoriesData?: ExpenseCategoriesResponse;
  expenseId?: number;
  isOpen: boolean;
  onClose: () => void;
};

export const CreateExpenseModal = ({
  expensesCategoriesData,
  expenseId,
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
    defaultValues,
    mode: "onTouched",
  });

  const { control, watch, setValue, reset, formState } = form;
  const { isDirty } = formState;

  const watchedFields = watch();

  const isFormFilled = useMemo(
    () =>
      Object.values(watchedFields).every(
        (field) => field !== "" && field !== 0,
      ),
    [watchedFields],
  );

  const isButtonDisabled = isEdit ? !isDirty : !isFormFilled;

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
        await updateMutation.mutateAsync({ id: expenseId, data });
        toast.success("Данные обновлены");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Данные добавлены");
      }
    } catch {
      toast.error("Ошибка, запрос не выполнен");
    }
    expensesList.refetch();
    handleOnClose();
  };

  useEffect(() => {
    if (expenseId) {
      const expenseEditData = expensesList.data?.items.find(
        ({ id }) => expenseId === id,
      );
      setIsEdit(true);
      reset(expenseEditData);
    }
  }, [expenseId, form, expensesList.data?.items, reset]);

  return (
    <Modal show={isOpen} onClose={handleOnClose}>
      <Modal.Header>Добавить расход</Modal.Header>
      <Modal.Body className="overflow-visible">
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
              name="categoryId"
              control={control}
              render={({ field: { value: fieldValue } }) => (
                <SelectControl
                  label="Статья"
                  name="categoryId"
                  placeholder="Статья расхода"
                  selectedOption={expensesCategoriesOptions.find(
                    ({ value }) => fieldValue === value,
                  )}
                  options={expensesCategoriesOptions}
                  setSelectedOption={(option) =>
                    setValue("categoryId", Number(option.value))
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
