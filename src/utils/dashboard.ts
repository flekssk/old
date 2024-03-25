import { endOfWeek, formatDate, startOfWeek, subWeeks } from "date-fns";
import { DATE_FORMAT } from "@/helpers/date";

export const getValueDateFilter = (searchParams: URLSearchParams) => {
  let value;

  if (
    searchParams.get("dateFrom") ===
      formatDate(
        startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
        DATE_FORMAT.SERVER_DATE,
      ) &&
    searchParams.get("dateTo") ===
      formatDate(
        endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
        DATE_FORMAT.SERVER_DATE,
      )
  ) {
    value = "lastWeek";
  } else if (
    searchParams.get("dateFrom") ===
      formatDate(
        startOfWeek(subWeeks(new Date(), 2), { weekStartsOn: 1 }),
        DATE_FORMAT.SERVER_DATE,
      ) &&
    searchParams.get("dateTo") ===
      formatDate(
        endOfWeek(subWeeks(new Date(), 2), { weekStartsOn: 1 }),
        DATE_FORMAT.SERVER_DATE,
      )
  ) {
    value = "prevWeek";
  } else if (
    searchParams.get("dateFrom") ===
      formatDate(subWeeks(new Date(), 4), DATE_FORMAT.SERVER_DATE) &&
    searchParams.get("dateTo") ===
      formatDate(new Date(), DATE_FORMAT.SERVER_DATE)
  ) {
    value = "last30Days";
  } else if (
    searchParams.get("dateFrom") ===
      formatDate(subWeeks(new Date(), 13), DATE_FORMAT.SERVER_DATE) &&
    searchParams.get("dateTo") ===
      formatDate(new Date(), DATE_FORMAT.SERVER_DATE)
  ) {
    value = "last90Days";
  } else if (
    searchParams.get("dateFrom") !== null &&
    searchParams.get("dateTo") !== null
  ) {
    value = "custom";
  }

  return value;
};

export const getLabelDateFilter = (searchParams: URLSearchParams) => {
  let label;

  if (
    searchParams.get("dateFrom") ===
      formatDate(
        startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
        DATE_FORMAT.SERVER_DATE,
      ) &&
    searchParams.get("dateTo") ===
      formatDate(
        endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
        DATE_FORMAT.SERVER_DATE,
      )
  ) {
    label = "Последняя неделя";
  } else if (
    searchParams.get("dateFrom") ===
      formatDate(
        startOfWeek(subWeeks(new Date(), 2), { weekStartsOn: 1 }),
        DATE_FORMAT.SERVER_DATE,
      ) &&
    searchParams.get("dateTo") ===
      formatDate(
        endOfWeek(subWeeks(new Date(), 2), { weekStartsOn: 1 }),
        DATE_FORMAT.SERVER_DATE,
      )
  ) {
    label = "Предыдущая неделя";
  } else if (
    searchParams.get("dateFrom") ===
      formatDate(subWeeks(new Date(), 4), DATE_FORMAT.SERVER_DATE) &&
    searchParams.get("dateTo") ===
      formatDate(new Date(), DATE_FORMAT.SERVER_DATE)
  ) {
    label = "Последние 30 дней";
  } else if (
    searchParams.get("dateFrom") ===
      formatDate(subWeeks(new Date(), 13), DATE_FORMAT.SERVER_DATE) &&
    searchParams.get("dateTo") ===
      formatDate(new Date(), DATE_FORMAT.SERVER_DATE)
  ) {
    label = "Последние 90 дней";
  } else if (
      searchParams.get("dateFrom") !== null &&
      searchParams.get("dateTo") !== null
  ) {
    label = "Произвольный период";
  }

  return label;
};
