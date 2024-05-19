import { Button, Label, TextInput } from "flowbite-react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { type FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useCreateCommand } from "@/api/taskQueue";

const CreateCommand = ({
  setActive,
}: {
  setActive: Dispatch<SetStateAction<boolean>>;
}) => {
  const [form, setForm] = useState("");
  const createCommand = useCreateCommand();
  const onCancelCreate = () => {
    setActive(false);
  };
  const onSubmitClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createCommand.mutateAsync(form).then((res) => {
      toast.success(res.message);
    });
    setActive(false);
  };
  return (
    <div className="flex min-w-[435px] flex-col">
      <div>
        <div className="p-[20px] font-sans font-bold">Создание комманды</div>
      </div>
      <form onSubmit={onSubmitClick}>
        <div className="border-y-2 pb-[15px] pt-[20px]">
          <div className="flex flex-col pl-[15px]">
            <Label htmlFor="title" className="m-1">
              Команда
            </Label>
            <TextInput
              className="max-w-[364px]"
              id="title"
              type="text"
              name="title"
              required={true}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setForm(e.currentTarget.value);
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

export default CreateCommand;
