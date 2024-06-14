import { useSettingsItemByName } from "@/api/user";
import React from "react";
import { Select, type SelectOption } from "../Select";
import { useSearchParams } from "react-router-dom";
import type { StoredGroupSettings } from "@/types/types";
import type { Filters } from "@/api/report/types";
import { parse, stringify } from "qs";

type GroupSettingsProps = {
  groupSettingsName: string;
};

const baseTableOption = { label: "Исходная таблица", value: "baseTable" };

export const GroupSettings = ({ groupSettingsName }: GroupSettingsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [groups, setGroups] = React.useState<SelectOption[]>([]);
  const [selectedGroup, setSelectedGroup] = React.useState<SelectOption>();
  const storedSettingsQuery = useSettingsItemByName<
    Record<string, StoredGroupSettings>
  >(groupSettingsName, {
    retry: false,
  });

  const handleSetFilters = (selectedGroupData?: number[]) => {
    const newSearchParams = new URLSearchParams();
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    if (selectedGroupData) {
      const filters = parse(newSearchParams.get("filters") || "{}") as Filters;
      filters["article"] = selectedGroupData;
      newSearchParams.set("filters", stringify(filters));
      setSearchParams(newSearchParams);
    }

    if (dateFrom && dateTo) {
      newSearchParams.set("dateFrom", dateFrom);
      newSearchParams.set("dateTo", dateTo);
      setSearchParams(newSearchParams);
    }
  };

  const handleGroupChange = (selectedGroup: SelectOption) => {
    if (selectedGroup.value === "baseTable") {
      const newSearchParams = new URLSearchParams();
      setSearchParams(newSearchParams);
      setSelectedGroup(selectedGroup);
    } else {
      const selectedGroupName = selectedGroup.value;
      const selectedGroupData =
        storedSettingsQuery.data?.settings[selectedGroupName]?.rowsSelected;
      handleSetFilters(selectedGroupData);
      setSelectedGroup(selectedGroup);
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
      setGroups([...groupsList]);
    }
  }, [storedSettingsQuery.data]);

  return groups.length ? (
    <Select
      placeholder="Группы"
      selectedOption={selectedGroup}
      options={groups || []}
      setSelectedOption={handleGroupChange}
    />
  ) : null;
};
