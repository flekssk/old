import { endOfWeek, formatDate, startOfWeek, subWeeks } from "date-fns";
import { DATE_FORMAT } from "@/helpers/date";
import type {
  ArticleFilter,
  NumberFilter,
  ReportRequest,
  TextFilter,
} from "@/api/report/types";
import type { DateFilter } from "@/types/types";

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

export const isNumberFilter = (
  filter: TextFilter | NumberFilter | ArticleFilter,
): filter is NumberFilter => {
  return (
    typeof filter === "object" &&
    filter !== null &&
    ("min" in filter || "max" in filter)
  );
};

export const isTextFilter = (
  filter: TextFilter | NumberFilter | ArticleFilter,
): filter is TextFilter => {
  return typeof filter === "object" && filter !== null && "value" in filter;
};

export const dateFilters: DateFilter[] = [
  {
    text: "Последняя неделя",
    value: "lastWeek",
    dateFrom: formatDate(
      startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
      DATE_FORMAT.SERVER_DATE,
    ),
    dateTo: formatDate(
      endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
      DATE_FORMAT.SERVER_DATE,
    ),
  },
  {
    text: "Предыдущая неделя",
    value: "prevWeek",
    dateFrom: formatDate(
      startOfWeek(subWeeks(new Date(), 2), { weekStartsOn: 1 }),
      DATE_FORMAT.SERVER_DATE,
    ),
    dateTo: formatDate(
      endOfWeek(subWeeks(new Date(), 2), { weekStartsOn: 1 }),
      DATE_FORMAT.SERVER_DATE,
    ),
  },
  {
    text: "Последние 30 дней",
    value: "last30Days",
    dateFrom: formatDate(subWeeks(new Date(), 4), DATE_FORMAT.SERVER_DATE),
    dateTo: formatDate(new Date(), DATE_FORMAT.SERVER_DATE),
  },
  {
    text: "Последние 90 дней",
    value: "last90Days",
    dateFrom: formatDate(subWeeks(new Date(), 13), DATE_FORMAT.SERVER_DATE),
    dateTo: formatDate(new Date(), DATE_FORMAT.SERVER_DATE),
  },
  {
    text: "Произвольный период",
    value: "custom",
  },
];
