import { Button, Modal } from "flowbite-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
};

export const DeleteExpenseModal = ({
  isOpen,
  onClose,
  onConfirmDelete,
}: Props) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Удаление расхода</Modal.Header>
      <Modal.Body>
        <div>Вы уверены что хотите удалить расход?</div>
      </Modal.Body>
      <Modal.Footer className="flex flex-col">
        <div className="flex w-full justify-between">
          <Button color="gray" onClick={onClose}>
            Отменить
          </Button>
          <Button color="failure" onClick={onConfirmDelete}>
            Подтвердить
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
