import { endOfWeek, formatDate, startOfWeek, subWeeks } from "date-fns";
import { DATE_FORMAT } from "@/helpers/date";
import { ReportRequest } from "@/api/report/types";

export const getValueDateFilter = (params: ReportRequest) => {
  let value;

  if (
    params.dateFrom ===
      formatDate(
        startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
        DATE_FORMAT.SERVER_DATE,
      ) &&
    params.dateTo ===
      formatDate(
        endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
        DATE_FORMAT.SERVER_DATE,
      )
  ) {
    value = "lastWeek";
  } else if (
    params.dateFrom ===
      formatDate(
        startOfWeek(subWeeks(new Date(), 2), { weekStartsOn: 1 }),
        DATE_FORMAT.SERVER_DATE,
      ) &&
    params.dateTo ===
      formatDate(
        endOfWeek(subWeeks(new Date(), 2), { weekStartsOn: 1 }),
        DATE_FORMAT.SERVER_DATE,
      )
  ) {
    value = "prevWeek";
  } else if (
    params.dateFrom ===
      formatDate(subWeeks(new Date(), 4), DATE_FORMAT.SERVER_DATE) &&
    params.dateTo === formatDate(new Date(), DATE_FORMAT.SERVER_DATE)
  ) {
    value = "last30Days";
  } else if (
    params.dateFrom ===
      formatDate(subWeeks(new Date(), 13), DATE_FORMAT.SERVER_DATE) &&
    params.dateTo === formatDate(new Date(), DATE_FORMAT.SERVER_DATE)
  ) {
    value = "last90Days";
  } else if (params.dateFrom !== null && params.dateTo !== null) {
    value = "custom";
  } else {
    value = "";
  }

  return value;
};

export const getLabelDateFilter = (params: ReportRequest) => {
  let label;

  if (
    params.dateFrom ===
      formatDate(
        startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
        DATE_FORMAT.SERVER_DATE,
      ) &&
    params.dateTo ===
      formatDate(
        endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
        DATE_FORMAT.SERVER_DATE,
      )
  ) {
    label = "Последняя неделя";
  } else if (
    params.dateFrom ===
      formatDate(
        startOfWeek(subWeeks(new Date(), 2), { weekStartsOn: 1 }),
        DATE_FORMAT.SERVER_DATE,
      ) &&
    params.dateTo ===
      formatDate(
        endOfWeek(subWeeks(new Date(), 2), { weekStartsOn: 1 }),
        DATE_FORMAT.SERVER_DATE,
      )
  ) {
    label = "Предыдущая неделя";
  } else if (
    params.dateFrom ===
      formatDate(subWeeks(new Date(), 4), DATE_FORMAT.SERVER_DATE) &&
    params.dateTo === formatDate(new Date(), DATE_FORMAT.SERVER_DATE)
  ) {
    label = "Последние 30 дней";
  } else if (
    params.dateFrom ===
      formatDate(subWeeks(new Date(), 13), DATE_FORMAT.SERVER_DATE) &&
    params.dateTo === formatDate(new Date(), DATE_FORMAT.SERVER_DATE)
  ) {
    label = "Последние 90 дней";
  } else if (params.dateFrom !== null && params.dateTo !== null) {
    label = "Произвольный период";
  }

  return label;
};
