import { useReportFilterAggregation } from "@/api/report";
import type { SelectOption } from "@/components/Select";
import { Select } from "@/components/Select";
import { DATE_FORMAT } from "@/helpers/date";
import { endOfWeek, formatDate, parse, startOfWeek, subWeeks } from "date-fns";
import { Datepicker, Dropdown } from "flowbite-react";
import { type FC, useMemo } from "react";
import type { ReportRequest } from "@/api/report/types";
import { getLabelDateFilter, getValueDateFilter } from "@/utils/dashboard";

export type DateFilterValue = {
  dateFrom: string;
  dateTo: string;
};

export type DateFilter = Partial<DateFilterValue> & {
  text: string;
  value: string;
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
type FiltersProps = {
  params: ReportRequest;
  setSearchParams: (searchParams: URLSearchParams) => void;
};

export const Filters: FC<FiltersProps> = ({ params, setSearchParams }) => {
  const reportFilterAggregationRequest = useReportFilterAggregation();

  const dateFilterOptions = useMemo(() => {
    return dateFilters.map((filter) => ({
      value: filter.value,
      label: filter.text,
    }));
  }, []);

  const filterOptions = useMemo(() => {
    const result = {
      brands: [],
      categories: [],
    } as {
      brands: SelectOption[];
      categories: SelectOption[];
    };

    if (reportFilterAggregationRequest.data) {
      result.brands = reportFilterAggregationRequest.data.brands.map(
        (brand) => ({
          value: brand,
          label: brand,
        }),
      );

      result.categories = reportFilterAggregationRequest.data.categories.map(
        (category) => ({
          value: category,
          label: category,
        }),
      );
    }

    return result;
  }, [reportFilterAggregationRequest.data]);

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

  const handleDateFilterChange = (value: string) => {
    const newSearchParams = new URLSearchParams(params as URLSearchParams);
    if (value === "custom") {
      newSearchParams.delete("dateFrom");
      newSearchParams.delete("dateTo");
    } else {
      newSearchParams.set(
        "dateFrom",
        dateFilters.find((item) => item.value === value)?.dateFrom as string,
      );
      newSearchParams.set(
        "dateTo",
        dateFilters.find((item) => item.value === value)?.dateTo as string,
      );
    }
    setSearchParams(newSearchParams);
  };

  const handleCategoryChange = (category: string) => {
    const newSearchParams = new URLSearchParams(params as URLSearchParams);
    newSearchParams.set("category", category);
    setSearchParams(newSearchParams);
  };

  const handleBrandChange = (brand: string) => {
    const newSearchParams = new URLSearchParams(params as URLSearchParams);
    newSearchParams.set("brand", brand);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="flex flex-wrap justify-between">
      <div>
        <h2 className="mb-2 text-lg">Период отчета</h2>
        <div className="flex items-center gap-2">
          <Select
            selectedOption={{
              value: getValueDateFilter(params) || "",
              label: getLabelDateFilter(params) || "",
            }}
            options={dateFilterOptions}
            setSelectedOption={(option) => {
              handleDateFilterChange(option.value as string);
            }}
            placeholder="Выберите период"
          />

          {getValueDateFilter(params) === "custom" ? (
            <>
              <Datepicker
                minDate={minDate}
                maxDate={maxDate}
                defaultDate={
                  params.dateFrom
                    ? parse(
                        params.dateFrom,
                        DATE_FORMAT.SERVER_DATE,
                        new Date(),
                      )
                    : undefined
                }
                onSelectedDateChanged={(date) => {
                  const newSearchParams = new URLSearchParams(
                    params as URLSearchParams,
                  );
                  newSearchParams.set(
                    "dateFrom",
                    formatDate(date, DATE_FORMAT.SERVER_DATE),
                  );
                  setSearchParams(newSearchParams);
                }}
              />
              <Datepicker
                minDate={minDate}
                maxDate={maxDate}
                defaultDate={
                  params.dateTo
                    ? parse(params.dateTo, DATE_FORMAT.SERVER_DATE, new Date())
                    : undefined
                }
                onSelectedDateChanged={(date) => {
                  const newSearchParams = new URLSearchParams(
                    params as URLSearchParams,
                  );
                  newSearchParams.set(
                    "dateTo",
                    formatDate(date, DATE_FORMAT.SERVER_DATE),
                  );
                  setSearchParams(newSearchParams);
                }}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
