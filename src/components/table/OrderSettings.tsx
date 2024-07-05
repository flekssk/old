import { useSettingsItemByName } from "@/api/user";
import React from "react";
import { Select, type SelectOption } from "../Select";
import type { ColumnDef, Table } from "@tanstack/react-table";
import type { ColumnOrderSettings } from "@/types/types";

const baseTableOption = { label: "Исходная таблица", value: "baseTable" };

interface ColumnSettingsProps<TData, TValue> {
  table: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
  orderSettingsName: string;
}

export function OrderSettings<TData, TValue>({
  table,
  columns,
  orderSettingsName,
}: ColumnSettingsProps<TData, TValue>) {
  const [groups, setGroups] = React.useState<SelectOption[]>([]);
  const [selectedGroup, setSelectedGroup] = React.useState<SelectOption>();
  const orderSettingsQuery = useSettingsItemByName<
    Record<string, ColumnOrderSettings>
  >(orderSettingsName, {
    retry: false,
  });

  const handleGroupChange = (selectedGroup: SelectOption) => {
    if (selectedGroup.value === "baseTable") {
      const filterColumns = columns.filter(({ id }) => id !== "select");
      const orderColumns = filterColumns.map((col) => col.id as string);
      table.setColumnOrder(orderColumns);
      setSelectedGroup(selectedGroup);
    } else {
      const selectedGroupName = selectedGroup.value;
      const orderSettings =
        orderSettingsQuery.data?.settings[selectedGroupName];
      if (orderSettings) {
        const { columnOrder, columnPinning } = orderSettings;
        table.setColumnOrder(columnOrder);
        table.setColumnPinning(columnPinning);
      }
      setSelectedGroup(selectedGroup);
    }
  };

  React.useEffect(() => {
    const storedSettingsList = orderSettingsQuery.data
      ? Object.values(orderSettingsQuery.data.settings)
      : [];

    if (storedSettingsList) {
      const groupsList = storedSettingsList.map(({ name }) => ({
        label: name,
        value: name,
      }));
      setGroups([baseTableOption, ...groupsList]);
    }
  }, [orderSettingsQuery.data]);

  return (
    <Select
      placeholder="Сохраненные настройки"
      selectedOption={selectedGroup}
      options={groups || []}
      setSelectedOption={handleGroupChange}
    />
  );
}
