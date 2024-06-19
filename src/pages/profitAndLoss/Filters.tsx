/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { useReportFilterAggregation } from "@/api/report";
import type { SelectOption } from "@/components/Select";
import { Badge, Button } from "flowbite-react";
import { type FC, useMemo } from "react";
import type { ReportRequest } from "@/api/report/types";
import { isNumberFilter, isTextFilter } from "@/utils/dashboard";
import { REPORT_TABLE_COLUMNS_NAMES } from "@/constants/constants";
import { MdClose } from "react-icons/md";
import { parse as qsParse, stringify } from "qs";
import { useSearchParams } from "react-router-dom";
import type { MultiSelectOption } from "@/components/MultiSelect";
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

  const handleBrandChange = (brand: string) => {
    const newSearchParams = new URLSearchParams(params as URLSearchParams);
    newSearchParams.set("brand", brand);
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
          <h2 className="mb-2 text-lg">Фильтры</h2>
          <div className="flex flex-wrap items-center gap-2 "></div>
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
