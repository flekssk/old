import {
  useCreateExpenseCategoryMutation,
  useExpenseCategories,
} from "@/api/otherExpenses";
import { Button, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateExpenseCategoryModal = ({ isOpen, onClose }: Props) => {
  const [expenseCategoryName, setExpenseCategoryName] = useState("");

  const createMutation = useCreateExpenseCategoryMutation();
  const expenseCategoriesList = useExpenseCategories();

  const handleSaveCategory = async () => {
    try {
      await createMutation.mutateAsync({ name: expenseCategoryName });
      toast.success("Категория успешно создана");
    } catch {
      toast.error("Ошибка, запрос не выполнен");
    }
    setExpenseCategoryName("");
    expenseCategoriesList.refetch();
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Создайте новую статью</Modal.Header>
      <Modal.Body>
        <TextInput
          placeholder="Название"
          value={expenseCategoryName}
          onChange={({ target: { value } }) => setExpenseCategoryName(value)}
        />
      </Modal.Body>
      <Modal.Footer className="flex flex-col">
        <div className="flex w-full justify-between">
          <Button color="gray" onClick={onClose}>
            Отменить
          </Button>
          <Button
            onClick={handleSaveCategory}
            disabled={!expenseCategoryName}
            isProcessing={createMutation.isPending}
          >
            Создать
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
