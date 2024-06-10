import type { Table } from "@tanstack/react-table";
import { useEffect } from "react";

export const useColumnSizingPersist = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>,
  tableName: string,
) => {
  useEffect(() => {
    const sizing = localStorage.getItem(`${tableName}-sizing`);
    if (sizing) {
      table.setColumnSizing(JSON.parse(sizing));
    }
  }, [tableName]);

  useEffect(() => {
    if (Object.keys(table.getState().columnSizing)) {
      localStorage.setItem(
        `${tableName}-sizing`,
        JSON.stringify(table.getState().columnSizing),
      );
    }
  }, [tableName, table.getState().columnSizing]);
};
