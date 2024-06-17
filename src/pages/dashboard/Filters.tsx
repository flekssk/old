/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { useReportFilterAggregation } from "@/api/report";
import type { SelectOption } from "@/components/Select";
import { DATE_FORMAT, getWeeksBetweenDates } from "@/helpers/date";
import { formatDate, parse } from "date-fns";
import { Badge, Button } from "flowbite-react";
import { type FC, useMemo, useState } from "react";
import type { ReportRequest } from "@/api/report/types";
import { isNumberFilter, isTextFilter } from "@/utils/dashboard";
import { REPORT_TABLE_COLUMNS_NAMES } from "@/constants/constants";
import { MdClose } from "react-icons/md";
import { parse as qsParse, stringify } from "qs";
import { useSearchParams } from "react-router-dom";
import type { MultiSelectOption } from "@/components/MultiSelect";
import { MultiSelect } from "@/components/MultiSelect";
import type { Article } from "@/api/wb/types";
import { DatePickerWithRange } from "@/components/shadcnUi/Datepicker";
import type { DateRange } from "react-day-picker";
import { GroupSettings } from "@/components/table/GroupSettings";

type FiltersProps = {
  params: ReportRequest;
  articles?: Article[];
  setSearchParams: (searchParams: URLSearchParams) => void;
};

export const Filters: FC<FiltersProps> = ({
  params,
  articles,
  setSearchParams,
}) => {
  const reportFilterAggregationRequest = useReportFilterAggregation();
  const [searchParams] = useSearchParams();
  const [selectedOptions, setSelectedOptions] = useState<
    MultiSelectOption | undefined
  >(undefined);

  const articlesOptions = useMemo(() => {
    if (!articles) return [];

    return articles.map(({ title, nmId, vendorCode }) => ({
      label: vendorCode,
      value: nmId,
      searchValues: [nmId.toString(), title, vendorCode],
    })) as MultiSelectOption[];
  }, [articles]);

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

  const selectedArticles = useMemo(() => {
    const currentArticles = params.filters?.["article"];

    if (!currentArticles || !Array.isArray(currentArticles)) return [];

    return currentArticles.flatMap((article) => {
      const foundArticle = articlesOptions.find(
        (articleItem) => articleItem.value === String(article),
      );
      return foundArticle ? [foundArticle] : [];
    });
  }, [params, articlesOptions]);

  const selectedBrands = useMemo(() => {
    const currentBrands = params.filters?.["brand"];

    if (!currentBrands || !Array.isArray(currentBrands)) return [];

    return currentBrands.flatMap((brand) => {
      const foundBrand = filterOptions.brands.find(
        (brandItem) => brandItem.value === String(brand),
      );
      return foundBrand ? [foundBrand] : [];
    });
  }, [params, filterOptions.brands]);

  const selectedCategories = useMemo(() => {
    const currentCategories = params.filters?.["category"];

    if (!currentCategories || !Array.isArray(currentCategories)) return [];

    return currentCategories.flatMap((category) => {
      const foundCategory = filterOptions.categories.find(
        (categoryItem) => categoryItem.value === String(category),
      );
      return foundCategory ? [foundCategory] : [];
    });
  }, [params, filterOptions.categories]);

  const selectedFilters = useMemo(() => {
    const result: { keyForDelete: string; label: string; value?: string }[] =
      [];

    if (selectedCategories.length) {
      selectedCategories.forEach((category, index) => {
        result.push({
          keyForDelete: `filters.category.${index}`,
          label: "Категория",
          value: category.label as string,
        });
      });
    }

    if (selectedBrands.length) {
      selectedBrands.forEach((brand, index) => {
        result.push({
          keyForDelete: `filters.brand.${index}`,
          label: "Бренд",
          value: brand.label as string,
        });
      });
    }

    if (selectedArticles) {
      selectedArticles.forEach((item, index) => {
        result.push({
          keyForDelete: `filters.article.${index}`,
          label: "Артикул",
          value: item.label,
        });
      });
    }

    if (params.filters && Object.keys(params.filters).length > 0) {
      for (const key in params.filters) {
        const filter = params.filters[key];
        if (filter && isNumberFilter(filter)) {
          if (filter.min !== undefined) {
            result.push({
              keyForDelete: `filters.${key}.min`,
              label: `${REPORT_TABLE_COLUMNS_NAMES[key]} (Min)`,
              value: String(filter.min),
            });
          }
          if (filter.max !== undefined) {
            result.push({
              keyForDelete: `filters.${key}.max`,
              label: `${REPORT_TABLE_COLUMNS_NAMES[key]} (Max)`,
              value: String(filter.max),
            });
          }
        }

        if (filter && isTextFilter(filter)) {
          if (filter !== undefined) {
            result.push({
              keyForDelete: `filters.${key}`,
              label: `${REPORT_TABLE_COLUMNS_NAMES[key]}`,
              value: filter.join(", "),
            });
          }
        }
      }
    }
    return result;
  }, [params, selectedArticles]);

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

  const handleMultiSelectChange = (
    filterName: string,
    selectedOptions: MultiSelectOption[],
  ) => {
    const newSearchParams = new URLSearchParams(params as URLSearchParams);

    const filters = { ...params.filters };

    filters[filterName] = selectedOptions.map((option) =>
      String(option.value),
    ) as string[];
    newSearchParams.set("filters", stringify(filters));
    setSearchParams(newSearchParams);
  };

  const handleArticlesChange = (selectedOptions: MultiSelectOption[]) => {
    const newSearchParams = new URLSearchParams(params as URLSearchParams);

    const filters = { ...params.filters };

    filters["article"] = selectedOptions.map((option) =>
      String(option.value),
    ) as string[];
    newSearchParams.set("filters", stringify(filters));
    setSearchParams(newSearchParams);
  };

  const handleClearSelectFilter = (keyForDelete: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (keyForDelete.includes(".")) {
      const [outerKey, innerKey, keyForValue] = keyForDelete.split(".");
      const outerValue = newSearchParams.get(outerKey as string);
      if (outerValue) {
        const parsedOuterValue = qsParse(outerValue, {
          ignoreQueryPrefix: true,
        });

        if (keyForValue && innerKey) {
          const innerObject = parsedOuterValue[innerKey];

          if (innerObject && typeof innerObject === "object") {
            const updatedInnerObject = { ...innerObject };
            // @ts-expect-error
            delete updatedInnerObject[keyForValue];

            parsedOuterValue[innerKey] = updatedInnerObject;
          }
        } else {
          delete parsedOuterValue[innerKey as string];
        }

        const updatedOuterValue = stringify(parsedOuterValue);
        newSearchParams.set(outerKey as string, updatedOuterValue);
        setSearchParams(newSearchParams);
      }
    } else {
      newSearchParams.delete(keyForDelete);
      setSearchParams(newSearchParams);
    }
  };

  const handleClearAllFilters = () => {
    const newSearchParams = new URLSearchParams();
    setSearchParams(newSearchParams);
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
      <div className="flex flex-wrap justify-between">
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
        <div>
          <h2 className="mb-2 text-lg">Фильтры</h2>
          <div className="flex flex-wrap items-center gap-2 ">
            <MultiSelect
              placeholder="Все бренды"
              options={filterOptions.brands || []}
              selectedOptions={selectedBrands}
              setSelectedOptions={(selectedOptions) => {
                handleMultiSelectChange("brand", selectedOptions);
              }}
              position="top-right"
              multiple
            />
            <MultiSelect
              placeholder="Все категории"
              options={filterOptions.categories || []}
              selectedOptions={selectedCategories}
              setSelectedOptions={(selectedOptions) => {
                handleMultiSelectChange("category", selectedOptions);
              }}
              position="top-right"
              multiple
            />
            <MultiSelect
              placeholder="Все артикулы"
              position="top-right"
              options={articlesOptions || []}
              selectedOptions={selectedArticles}
              setSelectedOptions={handleArticlesChange}
              multiple
            />
            <GroupSettings groupSettingsName={"main-report-user-groups"} />
          </div>
        </div>
      </div>
      {selectedFilters.length > 0 && (
        <div className="mt-3 flex items-center">
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map(({ keyForDelete, label, value }) => (
              <div className="flex items-center gap-1" key={label}>
                <Badge color="info" size="xs">
                  <span className="flex items-center gap-0.5">
                    <span>
                      {label}: {value}
                    </span>
                    <MdClose
                      cursor="pointer"
                      onClick={() => handleClearSelectFilter(keyForDelete)}
                    />
                  </span>
                </Badge>
              </div>
            ))}
          </div>
          <Button
            className="ml-2"
            color="light"
            size="xs"
            onClick={handleClearAllFilters}
          >
            Очистить
          </Button>
        </div>
      )}
    </div>
  );
};
