import type {
  ColumnPinningState,
  VisibilityState,
} from "@tanstack/react-table";

export type StoredGroupSettings = {
  name: string;
  rowsSelected: number[];
};

export type DateFilterValue = {
  dateFrom: string;
  dateTo: string;
};

export type DateFilter = Partial<DateFilterValue> & {
  text: string;
  value: string;
};

export type ColumnOrderSettings = {
  name: string;
  columnOrder: string[];
  columnPinning: ColumnPinningState;
  columnVisibility: VisibilityState;
};
