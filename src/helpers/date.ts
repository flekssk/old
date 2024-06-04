import { differenceInSeconds, format, parseISO, sub } from "date-fns";

export const DATE_FORMAT = {
  SERVER_DATE: "yyyy-MM-dd",
  DAY_MONTH: "dd MMM",
  DATE: "dd.MM.yyyy",
} as const;

export const getPrevInterval = (dateFrom: string, dateTo: string) => {
  const periodDuration = differenceInSeconds(dateTo, dateFrom);

  return {
    start: format(
      sub(sub(dateFrom, { days: 1 }), { seconds: periodDuration }),
      DATE_FORMAT.SERVER_DATE,
    ),
    end: format(
      sub(sub(dateTo, { days: 1 }), { seconds: periodDuration }),
      DATE_FORMAT.SERVER_DATE,
    ),
  };
};

export const parseIsoDateString = (date: string) => {
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, DATE_FORMAT.DATE);
  return formattedDate;
};

export const formatDateToString = (
  date: Date | number,
  formatResult: string | undefined = DATE_FORMAT.DATE,
) => format(date, formatResult);
