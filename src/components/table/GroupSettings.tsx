import { useSettingsItemByName } from "@/api/user";
import React from "react";
import { Select, type SelectOption } from "../Select";
import { useSearchParams } from "react-router-dom";

type StoredGroupSettings = {
  name: string;
  rowsSelected: number[];
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [groups, setGroups] = React.useState<SelectOption[]>([]);
  const [selectedGroup, setSelectedGroup] = React.useState<SelectOption>();
  const storedSettingsQuery = useSettingsItemByName<
    Record<string, StoredGroupSettings>
  >(groupSettingsName, {
    retry: false,
  });

  const handleResetFilters = () => {
    const newSearchParams = new URLSearchParams();
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");
    if (dateFrom && dateTo) {
      newSearchParams.set("dateFrom", dateFrom);
      newSearchParams.set("dateTo", dateTo);
      setSearchParams(newSearchParams);
    }
  };

  const handleGroupChange = (selectedGroup: SelectOption) => {
    if (selectedGroup.value === "baseTable") {
      setDisplayedData([]);
      setSelectedGroup(selectedGroup);
    } else {
      const selectedGroupName = selectedGroup.value;
      const selectedGroupData =
        storedSettingsQuery.data?.settings[selectedGroupName]?.rowsSelected;
      handleResetFilters();
      setSelectedGroup(selectedGroup);
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
