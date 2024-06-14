import { useAccountTaxSetBatch, useGetAccountTaxList } from "@/api/account";
import type {
  AccountTaxItem,
  AccountTaxSetBatchItem,
} from "@/api/account/types";
import { useReportTaxation } from "@/api/user";
import type { UserProfileResponse } from "@/api/user/types";
import type { SelectOption } from "@/components/Select";
import { SelectControl } from "@/components/forms/SelectControl";
import TableList from "@/components/table/TableList";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button, Card } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

type TableItem = {
  year: number;
  quarter: number;
  [accountId: string]: number;
};

type TaxManagementProps = {
  profile: UserProfileResponse;
};

const FormSchema = z.record(
  z.string(),
  z.object({
    value: z.number(),
  }),
);

type FormSchemaType = z.infer<typeof FormSchema>;

function getFormName(accountId: string, year: number, quarter: number) {
  return `${year}_${quarter}_${accountId}`;
}

function converFormNameToAccountTaxFields(name: string) {
  const data = name.split("_") as [string, string, string];
  const year = +data[0];
  const quarter = +data[1];
  const accountId = +data[2];
  return {
    year,
    quarter,
    accountId,
  };
}

function convertFomDataToMutationPayload(
  data: FormSchemaType,
): AccountTaxSetBatchItem[] {
  const result: AccountTaxSetBatchItem[] = [];
  Object.keys(data).forEach((formName) => {
    const { year, quarter, accountId } =
      converFormNameToAccountTaxFields(formName);
    if (data[formName]) {
      result.push({
        taxTypeId: (data[formName] as { value: number }).value,
        year,
        quarter,
        accountId,
      });
    }
  });
  return result;
}

export const TaxManagement: FC<TaxManagementProps> = ({ profile }) => {
  const listRequest = useGetAccountTaxList({
    page: 1,
    limit: 1000,
  });
  const reportTaxationRequest = useReportTaxation();
  const setBatchMutation = useAccountTaxSetBatch({
    onSuccess: () => {
      toast.success("Налоговые ставки успешно обновлены");
      listRequest.refetch();
    },
    onError: () => {
      toast.error("Ошибка, запрос не выполнен");
    },
  });

  const options = useMemo(() => {
    return (
      reportTaxationRequest.data?.map((item) => ({
        value: item.id,
        label: item.title,
      })) || []
    );
  }, [reportTaxationRequest.data]);

  const data = useMemo(() => {
    // data should include items for each year and quarter from min year of response to current year and quarter. Each item should have value for each account
    const result: TableItem[] = [];
    const items =
      listRequest.data?.taxes.sort((a, b) =>
        `${a.year}_${a.quarter}` > `${b.year}_${b.quarter}` ? 1 : -1,
      ) ?? [];
    const lastExistItemsByAccountId: Record<string, AccountTaxItem> = {};
    if (items) {
      const minYear = items.length
        ? Math.min(...items.map((item) => item.year))
        : new Date().getFullYear();
      const maxYear = new Date().getFullYear();
      for (let year = minYear; year <= maxYear; year++) {
        const maxQuarter = year === maxYear ? new Date().getMonth() / 3 + 1 : 4;
        console.log("🚀 ~ data ~ maxQuarter:", maxYear, maxQuarter, year);
        for (let quarter = 1; quarter <= maxQuarter; quarter++) {
          const quarterItems = items
            .filter((item) => item.year === year && item.quarter === quarter)
            .reduce(
              (acc, item) => {
                acc[item.accountId] = item;
                return acc;
              },
              {} as Record<string, AccountTaxItem>,
            );

          const item: TableItem = {
            year,
            quarter,
          };

          profile.accounts.forEach((account) => {
            const accountItem = quarterItems[account.id];
            if (accountItem) {
              lastExistItemsByAccountId[account.id] = accountItem;
              item[account.id] = accountItem.taxTypeId;
            } else {
              item[account.id] =
                lastExistItemsByAccountId[account.id]?.taxTypeId || 0;
            }
          });

          result.push(item);
        }
      }
    }

    return result;
  }, [listRequest.data?.taxes, profile.accounts]);

  const defaultValues = useMemo(() => {
    const result: FormSchemaType = {};
    const optionsMap = options.reduce(
      (acc, option) => {
        acc[option.value] = option;
        return acc;
      },
      {} as Record<number, SelectOption>,
    );
    data.forEach((item) => {
      profile.accounts.forEach((account) => {
        const formName = getFormName(
          account.id.toString(),
          item.year,
          item.quarter,
        );
        const id = item[account.id] as number;
        result[formName] = optionsMap[id]
          ? (optionsMap[id as number] as { value: number })
          : {
              value: 0,
            };
      });
    });

    return result;
  }, [data, profile.accounts, options]);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<TableItem>();
    return [
      columnHelper.accessor("year", {
        header: "Год",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("quarter", {
        header: "Квартал",
        cell: (info) => info.getValue(),
      }),
      ...profile.accounts.map((account) =>
        columnHelper.accessor(account.id.toString(), {
          header: account.name,
          cell: (cell) => {
            const name = getFormName(
              account.id.toString(),
              cell.row.original.year,
              cell.row.original.quarter,
            );
            return <SelectControl options={options} name={name} />;
          },
        }),
      ),
    ];
  }, [profile.accounts, options]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onSubmit = async (values: FormSchemaType) => {
    const data = convertFomDataToMutationPayload(values);
    await setBatchMutation.mutateAsync({
      taxes: data,
    });
  };

  const loading = reportTaxationRequest.isLoading || listRequest.isLoading;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: "onTouched",
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <div className="mb-2 flex justify-between">
            <div className="text-2xl font-bold">Налоговые ставки</div>
            <div>
              <Button type="submit">Сохранить</Button>
            </div>
          </div>

          <TableList table={table} loading={loading} />
        </FormProvider>
      </form>
    </Card>
  );
};
