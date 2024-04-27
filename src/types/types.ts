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
