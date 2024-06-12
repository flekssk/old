import {
  addDays,
  differenceInSeconds,
  endOfWeek,
  format,
  getWeek,
  parseISO,
  startOfWeek,
  sub,
} from "date-fns";

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

export const getWeeksBetweenDates = (
  minDate?: string | Date,
  maxDate?: string | Date,
) => {
  if (!minDate || !maxDate) return [];

  const start = startOfWeek(minDate, { weekStartsOn: 1 });
  const end = endOfWeek(maxDate, { weekStartsOn: 1 });

  const weeks = [];
  let current = start;

  while (current <= end) {
    const weekStart = current;
    const weekEnd = endOfWeek(current, { weekStartsOn: 1 });

    weeks.push({
      weekNumber: getWeek(weekStart, { weekStartsOn: 1 }),
      weekStart: format(weekStart, "dd.MM.yyyy"),
      weekEnd: format(weekEnd, "dd.MM.yyyy"),
    });

    current = addDays(current, 7);
  }

  return weeks.sort((a, b) => (a.weekNumber < b.weekNumber ? 1 : -1));
};
