/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, TextInput } from "flowbite-react";
import React from "react";
import { Select } from "@/components/Select";
import { useSettingsItemByName } from "@/api/user";
import type { SelectOption } from "@/components/Select";
import type { StoredGroupSettings } from "@/types/types";
import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type SaveGroupModalProps = {
  groupSettingsName: string;
  isOpen: boolean;
  rowsSelected: number[];
  saveSettingsMutation: UseMutationResult<
    any,
    AxiosError<{ message: string }>,
    any,
    any
  >;
  onClose: () => void;
};

export const SaveGroupModal = ({
  groupSettingsName,
  isOpen,
  rowsSelected,
  saveSettingsMutation,
  onClose,
}: SaveGroupModalProps) => {
  const [selectedGroup, setSelectedGroup] = React.useState<
    SelectOption | undefined
  >();
  const [groupName, setGroupName] = React.useState("");
  const [isAddNewGroupFormVisible, setIsAddNewGroupFormVisible] =
    React.useState(false);

  const storedSettingsQuery = useSettingsItemByName<
    Record<string, StoredGroupSettings>
  >(groupSettingsName, {
    retry: false,
  });

  const handleCloseModal = () => {
    setIsAddNewGroupFormVisible(false);
    onClose();
  };

  const handleUpdateGroup = async () => {
    const groupName = selectedGroup?.value as string;
    const currentSettings = storedSettingsQuery.data?.settings || {};

    await saveSettingsMutation.mutateAsync({
      name: groupSettingsName,
      settings: {
        ...currentSettings,
        [groupName]: {
          name: groupName,
          rowsSelected: [
            ...(currentSettings[groupName]?.rowsSelected ?? []),
            ...rowsSelected,
          ],
        },
      },
    });

    setSelectedGroup(undefined);
    storedSettingsQuery.refetch();
    handleCloseModal();
  };

  const handleSaveGroup = async () => {
    await saveSettingsMutation.mutateAsync({
      ...(storedSettingsQuery.data || {}),
      name: groupSettingsName,
      settings: {
        ...(storedSettingsQuery.data?.settings || {}),
        [groupName]: {
          name: groupName || (selectedGroup?.value as string),
          rowsSelected,
        },
      },
    });

    setGroupName("");
    storedSettingsQuery.refetch();
    handleCloseModal();
  };

  const groupOptions = React.useMemo(() => {
    const storedSettingsList = storedSettingsQuery.data
      ? Object.values(storedSettingsQuery.data.settings)
      : [];

    if (storedSettingsList) {
      const groupsList = storedSettingsList.map(({ name }) => ({
        label: name,
        value: name,
      }));

      return groupsList;
    }

    return [];
  }, [storedSettingsQuery.data]);

  return (
    <Modal show={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Настройка групп</Modal.Header>
      <Modal.Body>
        {isAddNewGroupFormVisible ? (
          <>
            <div>
              <p className="mb-2 text-base">Введите название группы</p>
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
              <p className="mb-2 text-base">Выберите группу из существующих</p>
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
