import { DATE_FORMAT } from "@/helpers/date";
import { format, parse } from "date-fns";
import type { FC } from "react";

type DisplayDateRangeProps = {
  dateFrom?: string;
  dateTo?: string;
};

export const DisplayDateRange: FC<DisplayDateRangeProps> = ({
  dateFrom,
  dateTo,
}) => {
  if (!dateFrom || !dateTo) {
    return null;
  }
  return (
    <div className="mx-2">
      Отчет за даты:{" "}
      {format(
        parse(dateFrom, DATE_FORMAT.SERVER_DATE, new Date()),
        DATE_FORMAT.DATE,
      )}{" "}
      -
      {format(
        parse(dateTo, DATE_FORMAT.SERVER_DATE, new Date()),
        DATE_FORMAT.DATE,
      )}
    </div>
  );
};
