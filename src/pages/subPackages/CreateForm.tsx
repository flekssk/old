import type { CreateSubscription, SubscriptionBody } from "@/api/admin/types";
import type { Dispatch, SetStateAction } from "react";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useCreateSubscription, useGetSubscription } from "@/api/admin/hooks";
import { toast } from "react-toastify";

type CreateSubscribe = Pick<SubscriptionBody, "title" | "description" | "cost">;

const CreateForm = ({
  setActive,
}: {
  setActive: Dispatch<SetStateAction<boolean>>;
}) => {
  const [form, setForm] = useState<CreateSubscribe>({
    cost: 0,
    title: "",
    description: "",
  });
  const createSubscription = useCreateSubscription();
  const subscriptionList = useGetSubscription();
  const onSubmitClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Date.now().toString().slice(4, -1);
    const subscriptionBody: CreateSubscription = {
      third_party_id: Number(id),
      user_role: "ROLE_SUPER_PACAN",
      is_enabled: true,
      ...form,
    };

    await createSubscription.mutateAsync(subscriptionBody);
    await subscriptionList.refetch();
    toast.success("Подписка добавлена");

    setActive(false);
  };

  const onCancelCreate = () => {
    setActive(false);
  };

  return (
    <div className="flex min-w-[435px] flex-col">
      <div>
        <div className="p-[20px] font-sans font-bold">Создание подписки</div>
      </div>
      <form onSubmit={onSubmitClick}>
        <div className="border-y-2 pb-[15px] pt-[20px]">
          <div className="flex flex-col pl-[15px]">
            <Label htmlFor="title" className="m-1">
              Название
            </Label>
            <TextInput
              className="max-w-[364px]"
              id="title"
              type="text"
              name="title"
              required={true}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, title: e.currentTarget.value });
              }}
            />
          </div>
          <div className="flex flex-col pl-[15px]">
            <Label htmlFor="cost" className="m-1">
              Себистоимость
            </Label>
            <TextInput
              className="max-w-[364px]"
              id="cost"
              required={true}
              type="number"
              name="cost"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, cost: +e.currentTarget.value });
              }}
            />
          </div>
          <div className="flex flex-col pl-[15px]">
            <Label htmlFor="description" className="m-1">
              Описание
            </Label>
            <TextInput
              className="max-w-[364px]"
              required={true}
              id="description"
              type="text"
              name="description"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setForm({
                  ...form,
                  description: e.currentTarget.value,
                });
              }}
            />
          </div>
        </div>
        <div className="flex  min-h-[77px] items-center justify-between p-[15px]">
          <Button onClick={onCancelCreate} color="secondary">
            Отмена
          </Button>
          <Button color="primary" type="submit">
            Добавить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
