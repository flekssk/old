/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
import type { SelectOption } from "@/components/Select";
import { Select } from "@/components/Select";
import { Badge, Button } from "flowbite-react";
import { type FC, useMemo } from "react";
import type { ReportRequest } from "@/api/report/types";
import { MdClose } from "react-icons/md";
import { parse as qsParse, stringify } from "qs";
import { useSearchParams } from "react-router-dom";
import type { MultiSelectOption } from "@/components/MultiSelect";
import type { Article } from "@/api/wb/types";
import { useAccountList } from "@/api/wb";

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
  const accountsRequest = useAccountList();
  const accounts = accountsRequest.data ?? [];

  const accountOptions = useMemo(() => {
    if (!accounts) return [];

    return accounts.map(({ name, id }) => ({
      value: id,
      label: name,
    })) as SelectOption[];
  }, [accounts]);

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

  const selectedAccount = useMemo(() => {
    return accountOptions.find(
      (option) => option.value.toString() === params.accountUid?.toString(),
    );
  }, [params, accountOptions]);

  const selectedFilters = useMemo(() => {
    const result: { keyForDelete: string; label: string; value?: string }[] =
      [];

    if (selectedAccount) {
      result.push({
        keyForDelete: "accountUid",
        label: "Аккаунт",
        value: selectedAccount.label,
      });
    }

    return result;
  }, [params, selectedArticles, selectedAccount]);

  const handleAccountChange = (account: string) => {
    const newSearchParams = new URLSearchParams(params as URLSearchParams);
    newSearchParams.set("accountUid", account);
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
          <div className="flex flex-wrap items-center gap-2 ">
            <Select
              selectedOption={selectedAccount}
              setSelectedOption={(option) => {
                handleAccountChange(option.value as string);
              }}
              placeholder="Все аккаунты"
              options={accountOptions}
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
