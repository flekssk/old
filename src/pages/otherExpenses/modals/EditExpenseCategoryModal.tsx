import {
  useCreateExpenseCategoryMutation,
  useUpdateExpenseCategoryMutation,
} from "@/api/otherExpenses";
import type { ExpenseCategory } from "@/api/otherExpenses/types";
import { Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  isOpen: boolean;
  expenseCategory?: ExpenseCategory;
  refresh: () => void;
  onClose: () => void;
};

export const EditExpenseCategoryModal = ({
  isOpen,
  onClose,
  expenseCategory,
  refresh,
}: Props) => {
  const [expenseCategoryName, setExpenseCategoryName] = useState("");

  const createMutation = useCreateExpenseCategoryMutation();

  const updateMutation = useUpdateExpenseCategoryMutation();

  useEffect(() => {
    if (expenseCategory) {
      setExpenseCategoryName(expenseCategory.name);
    }
  }, [expenseCategory]);

  const handleSaveCategory = async () => {
    try {
      if (expenseCategory) {
        await updateMutation.mutateAsync({
          id: expenseCategory.id,
          name: expenseCategoryName,
        });
        toast.success("Категория успешно обновлена");
        setExpenseCategoryName("");
        refresh();
        onClose();
      } else {
        await createMutation.mutateAsync({ name: expenseCategoryName });
        toast.success("Категория успешно создана");
        setExpenseCategoryName("");
        refresh();
        onClose();
      }
    } catch {
      toast.error("Ошибка, запрос не выполнен");
    }
  };

  const loading = createMutation.isPending || updateMutation.isPending;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>
        {expenseCategory ? "Обновить статью" : "Создать новую статью"}
      </Modal.Header>
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
            isProcessing={loading}
          >
            {expenseCategory ? "Обновить" : "Создать"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
