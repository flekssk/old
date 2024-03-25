import { useReportFilterAggregation } from "@/api/report";
import type { SelectOption } from "@/components/Select";
import { Select } from "@/components/Select";
import { DATE_FORMAT } from "@/helpers/date";
import { endOfWeek, formatDate, parse, startOfWeek, subWeeks } from "date-fns";
import { Datepicker, Dropdown } from "flowbite-react";
import { type FC, useMemo } from "react";

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
    dateFrom: "",
    dateTo: "",
  },
];
type FiltersProps = {
  filterState: Record<string, string | SelectOption>;
  setFilterState: (state: Record<string, string | SelectOption>) => void;
  searchParams: URLSearchParams;
};

export const Filters: FC<FiltersProps> = ({
  filterState,
  setFilterState,
  searchParams,
}) => {
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

  return (
    <div className="flex flex-wrap justify-between">
      <div>
        <h2 className="mb-2 text-lg">Период отчета</h2>
        <div className="flex items-center gap-2">
          <Select
            selectedOption={(filterState["dateFilter"] as SelectOption) || ""}
            options={dateFilterOptions}
            setSelectedOption={(option) => {
              setFilterState({
                ...filterState,
                dateFilter: option,
              });
            }}
            placeholder="Выберите период"
          ></Select>

          {(filterState["dateFilter"] as SelectOption)?.value === "custom" ? (
            <>
              <Datepicker
                minDate={minDate}
                maxDate={maxDate}
                defaultDate={parse(
                  searchParams.get("dateFrom") as string,
                  DATE_FORMAT.SERVER_DATE,
                  new Date(),
                )}
                onSelectedDateChanged={(date) => {
                  const customFilterIndex = dateFilters.findIndex(
                    (el) => el.value === "custom",
                  );
                  if (customFilterIndex !== -1) {
                    const customFilter = dateFilters[customFilterIndex];
                    if (customFilter !== undefined) {
                      customFilter.dateFrom = formatDate(
                        date,
                        DATE_FORMAT.SERVER_DATE,
                      );
                      setFilterState({
                        ...filterState,
                        dateFilter: {
                          value: "custom",
                          label: "Произвольный период",
                        },
                      });
                    }
                  }
                }}
              />
              <Datepicker
                minDate={minDate}
                maxDate={maxDate}
                defaultDate={parse(
                  searchParams.get("dateTo") as string,
                  DATE_FORMAT.SERVER_DATE,
                  new Date(),
                )}
                onSelectedDateChanged={(date) => {
                  const customFilterIndex = dateFilters.findIndex(
                    (el) => el.value === "custom",
                  );
                  if (customFilterIndex !== -1) {
                    const customFilter = dateFilters[customFilterIndex];
                    if (customFilter !== undefined) {
                      customFilter.dateTo = formatDate(
                        date,
                        DATE_FORMAT.SERVER_DATE,
                      );
                      setFilterState({
                        ...filterState,
                        dateFilter: {
                          value: "custom",
                          label: "Произвольный период",
                        },
                      });
                    }
                  }
                }}
              />
            </>
          ) : null}
        </div>
      </div>
      <div>
        <h2 className="mb-2 text-lg">Фильтры</h2>
        <div className="flex flex-wrap items-center gap-2 ">
          <Select
            selectedOption={{
              value: searchParams.get("brand") || "",
              label: searchParams.get("brand") || "",
            }}
            setSelectedOption={(option) => {
              setFilterState({
                ...filterState,
                brand: option,
              });
            }}
            placeholder="Все бренды"
            options={filterOptions.brands}
          />

          <Select
            selectedOption={{
              value: searchParams.get("category") || "",
              label: searchParams.get("category") || "",
            }}
            setSelectedOption={(option) => {
              setFilterState({
                ...filterState,
                category: option,
              });
            }}
            placeholder="Все категории"
            options={filterOptions.categories}
          />
          <Dropdown color="gray" label="Все артикулы">
            <Dropdown.Item>
              <strong>Sep 16, 2021 - Sep 22, 2021</strong>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Yesterday</Dropdown.Item>
            <Dropdown.Item>Today</Dropdown.Item>
            <Dropdown.Item>Last 7 days</Dropdown.Item>
            <Dropdown.Item>Last 30 days</Dropdown.Item>
            <Dropdown.Item>Last 90 days</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Custom...</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
