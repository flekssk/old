import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { useState } from "react";
import type { SubscriptionBody } from "@/api/admin/types";
import { useUpdateSubscription } from "@/api/admin/hooks";
import { toast } from "react-toastify";

type EditFormData = Pick<
  SubscriptionBody,
  "title" | "description" | "cost" | "is_enabled" | "id"
>;

const EditForm = ({
  data,
  setActive,
  setData,
}: {
  data?: SubscriptionBody;
  setActive: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<SubscriptionBody[]>>;
}) => {
  const [form, setForm] = useState<EditFormData | undefined>(data);
  const updateSubscription = useUpdateSubscription();
  const onSubmitClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setData((prev) =>
      prev.map((el) => (el.id === form?.id ? { ...el, ...form } : el)),
    );

    if (data) {
      await updateSubscription.mutateAsync({
        id: data.id,
        data: { ...data, ...form },
      });
      toast.success("Подписка изменена");
    }
    setActive(false);
  };
  const onCancelCreate = () => {
    setActive(false);
  };
  return (
    <div className="flex min-w-[435px] flex-col">
      <div>
        <div className="p-[20px] font-sans font-bold">
          Редактирование {data?.title}
        </div>
      </div>
      {form && (
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
                required
                name="title"
                value={form.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setForm({ ...form, title: e.currentTarget.value });
                }}
              />
            </div>
            <div className="flex flex-col pl-[15px]">
              <Label htmlFor="cost" className="m-1">
                Себестоимость
              </Label>
              <TextInput
                className="max-w-[364px]"
                id="cost"
                required
                type="text"
                name="cost"
                value={form.cost}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setForm({ ...form, cost: +e.currentTarget.value });
                }}
              />
            </div>
            <div className="flex flex-col pl-[15px]">
              <Label htmlFor="description" className="m-1">
                Описание
              </Label>
              <Textarea
                required
                className="max-w-[364px]"
                id="description"
                name="description"
                value={form.description}
                onChange={(e) => {
                  setForm({
                    ...form,
                    description: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="mt-1 flex items-center pl-[15px]">
              <Label htmlFor="is_enabled" className="m-1 cursor-pointer">
                Доступность: &nbsp;
                <Checkbox
                  className="size-5"
                  id="is_enabled"
                  name="is_enabled"
                  checked={form.is_enabled}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setForm({ ...form, is_enabled: e.currentTarget.checked });
                  }}
                />
              </Label>
            </div>
          </div>
          <div className="flex  min-h-[77px] items-center justify-between p-[15px]">
            <Button onClick={onCancelCreate} color="secondary">
              Отмена
            </Button>
            <Button color="primary" type="submit">
              Изменить
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditForm;
