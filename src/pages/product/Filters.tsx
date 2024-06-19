import { type FC } from "react";
import type { ReportRequest } from "@/api/report/types";
import { DateRangeFilters } from "@/components/DateRangeFilters";

export type DateFilterValue = {
  dateFrom: string;
  dateTo: string;
};

export type DateFilter = Partial<DateFilterValue> & {
  text: string;
  value: string;
};

type FiltersProps = {
  params: ReportRequest;
  setSearchParams: (searchParams: URLSearchParams) => void;
};

export const Filters: FC<FiltersProps> = ({ params, setSearchParams }) => {
  return (
    <div className="flex flex-wrap justify-between">
      <DateRangeFilters params={params} setSearchParams={setSearchParams} />
      {/* Others filters for product */}
    </div>
  );
};
