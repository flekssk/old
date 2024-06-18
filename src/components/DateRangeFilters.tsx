import { useReportFilterAggregation } from "@/api/report";
import { DATE_FORMAT, getWeeksBetweenDates } from "@/helpers/date";
import { formatDate, parse } from "date-fns";
import { useMemo, useState } from "react";
import type { ReportRequest } from "@/api/report/types";
import type { MultiSelectOption } from "@/components/MultiSelect";
import { MultiSelect } from "@/components/MultiSelect";
import { DatePickerWithRange } from "@/components/shadcnUi/Datepicker";
import type { DateRange } from "react-day-picker";

export type DateFilterValue = {
  dateFrom: string;
  dateTo: string;
};

export type DateFilter = Partial<DateFilterValue> & {
  text: string;
  value: string;
};

type Props = {
  params: ReportRequest;
  setSearchParams: (searchParams: URLSearchParams) => void;
};

export const DateRangeFilters = ({ params, setSearchParams }: Props) => {
  const reportFilterAggregationRequest = useReportFilterAggregation();
  const [selectedOptions, setSelectedOptions] = useState<
    MultiSelectOption | undefined
  >(undefined);

  const optionsForDateFilter = useMemo(() => {
    const dates = getWeeksBetweenDates(
      reportFilterAggregationRequest.data?.date?.minDate,
      reportFilterAggregationRequest.data?.date?.maxDate,
    );

    const options = dates.map((value) => ({
      label: `${value.weekNumber} неделя (${value.weekStart} - ${value.weekEnd})`,
      value: {
        from: parse(value.weekStart, "dd.MM.yyyy", new Date()),
        to: parse(value.weekEnd, "dd.MM.yyyy", new Date()),
      },
    }));

    return [
      { label: "Произвольный период", value: "customPeriod" },
      ...options,
    ];
  }, [
    reportFilterAggregationRequest.data?.date?.minDate,
    reportFilterAggregationRequest.data?.date?.maxDate,
  ]);

  const minDate = reportFilterAggregationRequest.data?.date?.minDate
    ? parse(
        reportFilterAggregationRequest.data?.date?.minDate,
        DATE_FORMAT.SERVER_DATE,
        new Date(),
      )
    : undefined;
  const maxDate = reportFilterAggregationRequest.data?.date?.maxDate
    ? parse(
        reportFilterAggregationRequest.data?.date?.maxDate,
        DATE_FORMAT.SERVER_DATE,
        new Date(),
      )
    : new Date();

  const handleDateFilterChange = (option: MultiSelectOption) => {
    if (
      typeof option.value === "object" &&
      "from" in option.value &&
      "to" in option.value
    ) {
      const newSearchParams = new URLSearchParams(params as URLSearchParams);

      newSearchParams.set(
        "dateFrom",
        formatDate(option.value.from as Date, DATE_FORMAT.SERVER_DATE),
      );
      newSearchParams.set(
        "dateTo",
        formatDate(option.value.to as Date, DATE_FORMAT.SERVER_DATE),
      );

      setSelectedOptions(option);
      setSearchParams(newSearchParams);
    }
  };

  const handleChangeDates = (range?: DateRange) => {
    setSelectedOptions(optionsForDateFilter[0]);
    const newSearchParams = new URLSearchParams(params as URLSearchParams);
    newSearchParams.set(
      "dateFrom",
      formatDate(range?.from as Date, DATE_FORMAT.SERVER_DATE),
    );
    newSearchParams.set(
      "dateTo",
      formatDate(range?.to as Date, DATE_FORMAT.SERVER_DATE),
    );
    setSearchParams(newSearchParams);
  };

  return (
    <div>
      <h2 className="mb-2 text-lg">Период отчета</h2>
      <div className="flex items-center gap-2">
        <MultiSelect
          placeholder="Выберите период"
          options={optionsForDateFilter}
          selectedOptions={selectedOptions}
          setSelectedOptions={handleDateFilterChange}
        />
        <DatePickerWithRange
          minDate={minDate}
          maxDate={maxDate}
          date={{
            from: params.dateFrom
              ? parse(params.dateFrom, DATE_FORMAT.SERVER_DATE, new Date())
              : undefined,
            to: params.dateTo
              ? parse(params.dateTo, DATE_FORMAT.SERVER_DATE, new Date())
              : undefined,
          }}
          onChangeDate={handleChangeDates}
        />
      </div>
    </div>
  );
};
