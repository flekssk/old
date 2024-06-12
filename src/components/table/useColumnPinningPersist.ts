import type { Table } from "@tanstack/react-table";
import { useEffect } from "react";

export const useColumnPinningPersist = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>,
  tableName: string,
) => {
  useEffect(() => {
    const pinning = localStorage.getItem(`${tableName}-pinning`);
    if (pinning) {
      table.setColumnPinning(JSON.parse(pinning));
    }
  }, [tableName]);
};
