import {
  useCreateOtherDeductionMutation,
  useUpdateOtherDeductionMutation,
} from "@/api/otherDeduction";
import type { OtherDeduction } from "@/api/otherDeduction/types";
import type { UserProfileAccount } from "@/api/user/types";

import { DatepickerControl } from "@/components/forms/DatepickerControl";
import { InputControl } from "@/components/forms/InputControl";
import { SelectControl } from "@/components/forms/SelectControl";
import { DATE_FORMAT } from "@/helpers/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { Button, Modal } from "flowbite-react";
import { type FC, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

// validation for OtherDeduction
const formSchema = z.object({
  value: z.string().min(0, "Сумма должна быть числом"),
  wbAccountId: z.object({
    value: z.number().min(1, "Необходимо выбрать аккаунт"),
  }),
  description: z.string().min(1, "Описание не может быть пустым"),
  date: z.date(),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  otherDeduction?: OtherDeduction;
  isOpen: boolean;
  accounts: Array<UserProfileAccount>;
  onClose: () => void;
  onSuccess: () => void;
};

export const CreateOtherDeductionModal: FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  accounts,
  otherDeduction,
}) => {
  const isEdit = !!otherDeduction;

  const accountOptions = useMemo(() => {
    if (!accounts) return [];

    return accounts.map(({ name, id }) => ({
      value: id,
      label: name,
    }));
  }, [accounts]);

  const selectedAccount = (otherDeduction?.wbAccountId
    ? accountOptions.find(
        (account) => account.value === otherDeduction?.wbAccountId,
      )
    : accountOptions[0]) || { value: 0, label: "" };

  const defaultValues: FormSchema = otherDeduction
    ? {
        ...otherDeduction,
        value: otherDeduction.value.toString(),
        date: parseISO(otherDeduction.date),
        wbAccountId: selectedAccount,
      }
    : {
        value: "0",
        wbAccountId: selectedAccount,
        description: "",
        date: new Date(),
      };

  const createMutation = useCreateOtherDeductionMutation();
  const updateMutation = useUpdateOtherDeductionMutation();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onTouched",
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    form.reset(defaultValues);
  };

  const onSubmit = async (values: FormSchema) => {
    const sendData = {
      ...values,
      wbAccountId: values.wbAccountId?.value,
      value: +values.value,
      date: format(values.date, DATE_FORMAT.SERVER_DATE),
    };
    try {
      if (isEdit && otherDeduction) {
        await updateMutation.mutateAsync({
          id: otherDeduction?.id,
          ...sendData,
        });
        toast.success("Удержание обновлено");
        onSuccess();
      } else {
        await createMutation.mutateAsync(sendData);
        toast.success("Удержание добавлено");
        onSuccess();
      }
    } catch {
      toast.error("Ошибка, запрос не выполнен");
    }
  };
  return (
    <Modal show={isOpen} onClose={handleClose}>
      <form className="" onSubmit={form.handleSubmit(onSubmit)}>
        <Modal.Header>Добавить расход</Modal.Header>

        <Modal.Body className="overflow-visible">
          <FormProvider {...form}>
            <div className="flex flex-col gap-2">
              <InputControl name="value" label="Сумма" type="number" />
              <InputControl name="description" label="Описание" />
              <DatepickerControl
                name="date"
                label="Дата"
                maxDate={new Date()}
                language="ru-RU"
              />
              <SelectControl
                name="wbAccountId"
                label="Аккаунт"
                placeholder="Аккаунт"
                options={accountOptions}
              />
            </div>
          </FormProvider>
        </Modal.Body>
        <Modal.Footer className="flex flex-col">
          <div className="flex w-full justify-between">
            <Button color="gray" onClick={handleClose}>
              Отменить
            </Button>
            <Button
              type="submit"
              isProcessing={
                createMutation.isPending || updateMutation.isPending
              }
            >
              {isEdit ? "Сохранить" : "Создать"}
            </Button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
