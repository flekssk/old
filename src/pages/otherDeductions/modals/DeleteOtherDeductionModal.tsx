import { Button, Modal } from "flowbite-react";
import { type FC } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
};

export const DeleteOtherDeductionModal: FC<Props> = ({
  isOpen,
  onClose,
  onConfirmDelete,
}) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Удаление </Modal.Header>
      <Modal.Body>
        <div>Вы уверены что хотите удалить удержание?</div>
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
