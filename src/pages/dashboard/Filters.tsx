/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { useReportFilterAggregation } from "@/api/report";
import type { SelectOption } from "@/components/Select";
import { Select } from "@/components/Select";
import { DATE_FORMAT } from "@/helpers/date";
import { formatDate, parse } from "date-fns";
import { Datepicker, Badge, Button } from "flowbite-react";
import { type FC, useMemo } from "react";
import type { ReportRequest } from "@/api/report/types";
import {
  dateFilters,
  getLabelDateFilter,
  getValueDateFilter,
  isNumberFilter,
  isTextFilter,
} from "@/utils/dashboard";
import { REPORT_TABLE_COLUMNS_NAMES } from "@/constants/constants";
import { MdClose } from "react-icons/md";
import { parse as qsParse, stringify } from "qs";
import { useSearchParams } from "react-router-dom";
import type { MultiSelectOption } from "@/components/MultiSelect";
import { MultiSelect } from "@/components/MultiSelect";
import type { Article } from "@/api/wb/types";

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

  const articlesOptions = useMemo(() => {
    if (!articles) return [];

    return articles.map(({ title, nmId, vendorCode }) => ({
      label: vendorCode,
      value: nmId,
      searchValues: [nmId.toString(), title, vendorCode],
    })) as MultiSelectOption[];
  }, [articles]);

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

  const dateFilterOptions = useMemo(() => {
    return dateFilters.map((filter) => ({
      value: filter.value,
      label: filter.text,
    }));
  }, []);

  const selectedFilters = useMemo(() => {
    const result: { keyForDelete: string; label: string; value?: string }[] =
      [];

    if (params.category) {
      result.push({
        keyForDelete: "category",
        label: "Категория",
        value: params.category,
      });
    }

    if (params.brand) {
      result.push({
        keyForDelete: "brand",
        label: "Бренд",
        value: params.brand,
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
          if (filter.value !== undefined) {
            result.push({
              keyForDelete: `filters.${key}`,
              label: `${REPORT_TABLE_COLUMNS_NAMES[key]}`,
              value: filter.value,
            });
          }
        }
      }
    }
    return result;
  }, [params, selectedArticles]);

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

  const handleArticlesChange = (options: MultiSelectOption[]) => {
    const newSearchParams = new URLSearchParams(params as URLSearchParams);
    const filters = qsParse(newSearchParams.get("filters") || "");
    const articles = options.map((option) => String(option.value));
    filters["article"] = articles;
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

  return (
    <div>
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
                  language="ru"
                  weekStart={1}
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
                  language="ru"
                  weekStart={1}
                  defaultDate={
                    params.dateTo
                      ? parse(
                          params.dateTo,
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
        <div>
          <h2 className="mb-2 text-lg">Фильтры</h2>
          <div className="flex flex-wrap items-center gap-2 ">
            <Select
              selectedOption={{
                value: params.brand || "",
                label: params.brand || "",
              }}
              setSelectedOption={(option) => {
                handleBrandChange(option.value as string);
              }}
              placeholder="Все бренды"
              options={filterOptions.brands}
            />

            <Select
              selectedOption={{
                value: params.category || "",
                label: params.category || "",
              }}
              setSelectedOption={(option) => {
                handleCategoryChange(option.value as string);
              }}
              placeholder="Все категории"
              options={filterOptions.categories}
            />
            <MultiSelect
              placeholder="Все артикулы"
              position="top-right"
              options={articlesOptions || []}
              selectedOptions={selectedArticles}
              setSelectedOptions={handleArticlesChange}
            />
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
