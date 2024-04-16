import { Button, Modal, TextInput } from "flowbite-react";
import React from "react";
import { Select } from "@/components/Select";
import { useSaveSettingsMutation, useSettingsItemByName } from "@/api/user";
import type { SelectOption } from "@/components/Select";
import { ServerSuccess } from "../ServerSuccess";
import { ServerError } from "../ServerError";
import { useSearchParams } from "react-router-dom";

type SaveGroupModalProps = {
  groupSettingsName: string;
  isOpen: boolean;
  rowsSelected: number[];
  onClose: () => void;
};

type StoredGroupSettings = {
  name: string;
  rowsSelected: number[];
  searchParams: { dateTo: string | null; dateFrom: string | null };
};

export const SaveGroupModal = ({
  groupSettingsName,
  isOpen,
  rowsSelected,
  onClose,
}: SaveGroupModalProps) => {
  const [searchParams] = useSearchParams({});
  const [groups, setGroups] = React.useState<SelectOption[]>([]);
  const [selectedGroup, setSelectedGroup] = React.useState<
    SelectOption | undefined
  >();
  const [groupName, setGroupName] = React.useState("");
  const [isAddNewGroupFormVisible, setIsAddNewGroupFormVisible] =
    React.useState(false);

  const saveSettingsMutation =
    useSaveSettingsMutation<Record<string, StoredGroupSettings>>();

  const storedSettingsQuery = useSettingsItemByName<
    Record<string, StoredGroupSettings>
  >(groupSettingsName, {
    retry: false,
  });

  const handleCloseModal = () => {
    setIsAddNewGroupFormVisible(false);
    onClose();
  };

  const getSearchParams = () => {
    const dateTo = searchParams.get("dateTo");
    const dateFrom = searchParams.get("dateFrom");

    return { dateTo, dateFrom };
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
          searchParams: getSearchParams(),
        },
      },
    });

    setSelectedGroup(undefined);
    storedSettingsQuery.refetch();
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
          searchParams: getSearchParams(),
        },
      },
    });

    setGroupName("");
    storedSettingsQuery.refetch();
  };

  React.useEffect(() => {
    const storedSettingsList = storedSettingsQuery.data
      ? Object.values(storedSettingsQuery.data.settings)
      : [];

    if (storedSettingsList) {
      const groupsList = storedSettingsList.map(({ name }) => ({
        label: name,
        value: name,
      }));
      setGroups(groupsList);
    }
  }, [storedSettingsQuery.data]);

  return (
    <Modal show={isOpen} onClose={handleCloseModal}>
      <Modal.Header>Настройка групп</Modal.Header>
      <Modal.Body>
        {isAddNewGroupFormVisible ? (
          <div>
            <p className="mb-2 text-base">Введите название группы</p>
            <TextInput
              value={groupName}
              onChange={({ target: { value } }) => setGroupName(value)}
            />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="mb-2 text-base">Выберите группу из существующих</p>
              <div>
                <Select
                  placeholder="Группы"
                  selectedOption={selectedGroup}
                  options={groups || []}
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
        <div className="mt-5 w-full">
          <ServerSuccess message={saveSettingsMutation.data?.meessage} />
          <ServerError mutation={saveSettingsMutation} className="mt-3" />
        </div>
      </Modal.Footer>
    </Modal>
  );
};
