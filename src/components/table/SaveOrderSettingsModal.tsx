import { Button, Modal, TextInput } from "flowbite-react";
import React from "react";
import { Select } from "@/components/Select";
import { useSaveSettingsMutation, useSettingsItemByName } from "@/api/user";
import type { SelectOption } from "@/components/Select";
import type {
  ColumnPinningState,
  VisibilityState,
} from "@tanstack/react-table";
import { toast } from "react-toastify";
import type { ColumnOrderSettings } from "@/types/types";

type Props = {
  orderSettingsName: string;
  isOpen: boolean;
  columnOrder: string[];
  columnPinning: ColumnPinningState;
  columnVisibility: VisibilityState;
  onClose: () => void;
};

export const SaveOrderSettingsModal = ({
  orderSettingsName,
  isOpen,
  columnOrder,
  columnPinning,
  columnVisibility,
  onClose,
}: Props) => {
  const [selectedGroup, setSelectedGroup] = React.useState<
    SelectOption | undefined
  >();
  const [groupName, setGroupName] = React.useState("");
  const [isAddNewGroupFormVisible, setIsAddNewGroupFormVisible] =
    React.useState(false);

  const orderSettingsQuery = useSettingsItemByName<
    Record<string, ColumnOrderSettings>
  >(orderSettingsName, {
    retry: false,
  });

  const saveSettingsMutation =
    useSaveSettingsMutation<Record<string, ColumnOrderSettings>>();

  const handleCloseModal = () => {
    setIsAddNewGroupFormVisible(false);
    onClose();
  };

  const handleUpdateGroup = async () => {
    const groupName = selectedGroup?.value as string;
    const currentSettings = orderSettingsQuery.data?.settings || {};

    try {
      await saveSettingsMutation.mutateAsync({
        name: orderSettingsName,
        settings: {
          ...currentSettings,
          [groupName]: {
            name: groupName,
            columnOrder: columnOrder,
            columnPinning: columnPinning,
            columnVisibility,
          },
        },
      });
      toast.success("Настройки успешно обновлены");
    } catch {
      toast.error("Ошибка, запрос не выполнен");
    }

    setSelectedGroup(undefined);
    orderSettingsQuery.refetch();
    handleCloseModal();
  };

  const handleSaveGroup = async () => {
    try {
      await saveSettingsMutation.mutateAsync({
        ...(orderSettingsQuery.data || {}),
        name: orderSettingsName,
        settings: {
          ...(orderSettingsQuery.data?.settings || {}),
          [groupName]: {
            name: groupName,
            columnOrder,
            columnPinning,
            columnVisibility,
          },
        },
      });
      toast.success("Настройки успешно сохранены");
    } catch {
      toast.error("Ошибка, запрос не выполнен");
    }

    setGroupName("");
    orderSettingsQuery.refetch();
    handleCloseModal();
  };

  const groupOptions = React.useMemo(() => {
    const storedSettingsList = orderSettingsQuery.data
      ? Object.values(orderSettingsQuery.data.settings)
      : [];

    if (storedSettingsList) {
      const groupsList = storedSettingsList.map(({ name }) => ({
        label: name,
        value: name,
      }));

      return groupsList;
    }

    return [];
  }, [orderSettingsQuery.data]);

  return (
    <Modal show={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Настройка колонок</Modal.Header>
      <Modal.Body>
        {isAddNewGroupFormVisible ? (
          <>
            <div>
              <p className="mb-2 text-base">Введите название группы колонок</p>
              <TextInput
                value={groupName}
                onChange={({ target: { value } }) => setGroupName(value)}
              />
            </div>
            <div className="mt-5">
              <Button
                color="blue"
                onClick={() => setIsAddNewGroupFormVisible(false)}
              >
                Обновить существующую
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <p className="mb-2 text-base">
                Выберите группу колонок из существующих
              </p>
              <div>
                <Select
                  placeholder="Группы"
                  selectedOption={selectedGroup}
                  options={groupOptions}
                  setSelectedOption={(option) => setSelectedGroup(option)}
                />
              </div>
            </div>
            <div>
              <p className="mb-2 text-base">Или создайте новую группу</p>
              <Button
                color="blue"
                onClick={() => setIsAddNewGroupFormVisible(true)}
              >
                Создать новую группу
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="flex flex-col">
        <div className="flex w-full justify-between">
          <Button
            disabled={saveSettingsMutation.isPending}
            color="gray"
            onClick={handleCloseModal}
          >
            Отменить
          </Button>
          <Button
            onClick={async () => {
              isAddNewGroupFormVisible
                ? handleSaveGroup()
                : handleUpdateGroup();
            }}
            disabled={isAddNewGroupFormVisible ? !groupName : !selectedGroup}
            isProcessing={saveSettingsMutation.isPending}
          >
            {isAddNewGroupFormVisible ? "Сохранить" : "Применить"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
