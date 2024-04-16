import { useSettingsItemByName } from "@/api/user";

import React from "react";
import { Select, type SelectOption } from "../Select";
import { useNavigate } from "react-router-dom";

type StoredGroupSettings = {
  name: string;
  rowsSelected: number[];
  searchParams: { dateTo: string; dateFrom: string };
};

type GroupSettingsProps = {
  groupSettingsName: string;
  setDisplayedData: (data: number[]) => void;
};

const baseTableOption = { label: "Исходная таблица", value: "baseTable" };

export const GroupSettings = ({
  groupSettingsName,
  setDisplayedData,
}: GroupSettingsProps) => {
  const [groups, setGroups] = React.useState<SelectOption[]>([]);
  const [selectedGroup, setSelectedGroup] = React.useState<SelectOption>();
  const storedSettingsQuery = useSettingsItemByName<
    Record<string, StoredGroupSettings>
  >(groupSettingsName, {
    retry: false,
  });

  const navigate = useNavigate();

  const updateSearchParams = (dateFrom: string, dateTo: string) => {
    navigate({
      search: `?dateFrom=${dateFrom}&dateTo=${dateTo}`,
    });
  };

  const handleGroupChange = (selectedGroup: SelectOption) => {
    if (selectedGroup.value === "baseTable") {
      setDisplayedData([]);
      setSelectedGroup(selectedGroup);
    } else {
      const selectedGroupName = selectedGroup.value;
      const selectedGroupData =
        storedSettingsQuery.data?.settings[selectedGroupName]?.rowsSelected;
      const { dateFrom = "", dateTo = "" } =
        storedSettingsQuery.data?.settings[selectedGroupName]?.searchParams ||
        {};

      setSelectedGroup(selectedGroup);
      updateSearchParams(dateFrom, dateTo);
      setDisplayedData(selectedGroupData || []);
    }
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
      setGroups([baseTableOption, ...groupsList]);
    }
  }, [storedSettingsQuery.data]);

  return (
    <Select
      placeholder="Группы"
      selectedOption={selectedGroup}
      options={groups || []}
      setSelectedOption={handleGroupChange}
    />
  );
};
