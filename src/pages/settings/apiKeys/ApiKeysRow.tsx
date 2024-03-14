import {
  useCreateAccountMutation,
  useDeleteAccountMutation,
  useUpdateAccountMutation,
} from "@/api/wb";
import type { WbAccount } from "@/api/wb/types";
import { InputControl } from "@/components/forms/InputControl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { HiOutlineTrash, HiPencil, HiCheck, HiBan } from "react-icons/hi";
import { z } from "zod";

const formSchema = z.object({
  accountNumber: z.string(),
  name: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

type ApiKeysRowProps = {
  account?: WbAccount;
  id: string;
  onSuccess: (id: string) => void;
  onRemove: (id: string) => void;
};

export const ApiKeysRow: FC<ApiKeysRowProps> = ({
  account,
  id,
  onSuccess,
  onRemove,
}) => {
  const [isEdit, setIsEdit] = useState(() => !account);

  const createMutation = useCreateAccountMutation();
  const updateMutation = useUpdateAccountMutation();
  const deleteMutation = useDeleteAccountMutation();

  const loading =
    createMutation.status === "pending" ||
    updateMutation.status === "pending" ||
    deleteMutation.status === "pending";

  const onDelete = async () => {
    if (account) {
      await deleteMutation.mutateAsync(account.id);
      onRemove(id);
    }
  };

  const onSubmit = async (data: FormSchema) => {
    if (account) {
      await updateMutation.mutateAsync({ id: account.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    setIsEdit(false);
    onSuccess(id);
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: account,
  });

  return (
    <form
      className="mb-6 flex items-center gap-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormProvider {...form}>
        <InputControl
          name="name"
          className="grow"
          label="Название"
          disabled={!isEdit}
        />
        <InputControl
          name="accountNumber"
          className="grow"
          label="Токен"
          disabled={!isEdit}
        />
        <div className="mt-5 flex gap-2">
          {!isEdit && account ? (
            <Button type="button" onClick={() => setIsEdit(true)}>
              <HiPencil className=" mr-2" />
              Редактировать
            </Button>
          ) : null}
          {isEdit ? (
            <>
              <Button
                type="button"
                onClick={() => {
                  setIsEdit(false);
                  if (!account) {
                    onRemove(id);
                  }
                }}
                color="gray"
                disabled={loading}
              >
                <HiBan className=" cursor-pointer" />
                Отменить
              </Button>
              <Button type="submit" disabled={loading} isProcessing={loading}>
                <HiCheck className=" cursor-pointer" />
                Сохранить
              </Button>
            </>
          ) : null}
          {account && !isEdit ? (
            <Button
              onClick={onDelete}
              type="button"
              color="red"
              disabled={loading}
              isProcessing={loading}
            >
              <HiOutlineTrash className=" mr-2" />
              Удалить
            </Button>
          ) : null}
        </div>
      </FormProvider>
    </form>
  );
};
