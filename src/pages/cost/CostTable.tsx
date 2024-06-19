import TableList from "@/components/table/TableList";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useEffect, useMemo, type FC } from "react";
import type { ArticleWithCost } from "./type";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputControl } from "@/components/forms/InputControl";
import { Button } from "flowbite-react";
import { useIncomeCostSetBatchMutation } from "@/api/income";
import { toast } from "react-toastify";
import type { IncomeCostSetBatchRequest } from "@/api/income/types";
import { useCostExportMutation } from "./useCostExport";

type CostTableProps = {
  articles: ArticleWithCost[];
  refresh: () => void;
  loading: boolean;
};

const formSchema = z.record(
  z.string(),
  z.object({
    cost: z.string().transform((val) => +val),
    fulfillment: z.string().transform((val) => +val),
  }),
);

type FormSchema = z.infer<typeof formSchema>;

function transformFormDataToBatchRequest(
  formData: FormSchema,
): IncomeCostSetBatchRequest {
  return Object.keys(formData).reduce(
    (acc, key) => {
      if (formData[key]) {
        const item = formData[key] as unknown as {
          cost: string;
          fulfillment: string;
        };
        const cost = +item.cost;
        const fulfillment = +item.fulfillment;
        acc.costs.push({ cost, fulfillment, nm_id: key });
      }
      return acc;
    },
    { costs: [] } as IncomeCostSetBatchRequest,
  );
}

export const CostTable: FC<CostTableProps> = ({
  articles,
  loading,
  refresh,
}) => {
  const setBatchMutation = useIncomeCostSetBatchMutation({
    onSuccess: () => {
      refresh();
      toast.success("Себестоимость успешно обновлена");
    },
    onError: () => {
      toast.error("Ошибка, запрос не выполнен");
    },
  });

  const exportMutation = useCostExportMutation();

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<ArticleWithCost>();

    return [
      columnHelper.accessor("vendorCode", {
        header: "Продукт",
        cell: (cell) => {
          const row = cell.row.original;
          return (
            <div className="flex items-center gap-2 ">
              <img
                src={row.photos["big"]}
                alt={row.vendorCode}
                className="w-8"
              />
              <span>{row.vendorCode}</span>
            </div>
          );
        },
        // @ts-expect-error hack for table size
        size: "auto",
      }),
      columnHelper.accessor("nmId", {
        header: "Себестоимость",
        cell: (cell) => {
          const name = `${cell.row.original.nmId}.cost`;
          return <InputControl name={name} type="number" />;
        },
        size: 220,
      }),
      columnHelper.accessor("id", {
        header: "Фулфилмент",
        cell: (cell) => {
          const name = `${cell.row.original.nmId}.fulfillment`;
          return <InputControl name={name} type="number" />;
        },
        size: 220,
      }),
    ];
  }, [articles]);

  const defaultValues = useMemo<FormSchema>(() => {
    return articles.reduce((acc, article) => {
      const cost = (article.cost?.cost ?? 0).toString();
      const fulfillment = (article.cost?.fulfillment ?? 0).toString();
      //@ts-expect-error problem with zod
      acc[article.nmId.toString()] = { cost, fulfillment };
      return acc;
    }, {} as FormSchema);
  }, [articles]);

  const form = useForm<FormSchema>({
    defaultValues,
    resolver: zodResolver(formSchema),
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  const onSubmit = async (data: FormSchema) => {
    const payload = transformFormDataToBatchRequest(data);
    await setBatchMutation.mutateAsync(payload);
  };

  const table = useReactTable({
    columns,
    data: articles,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2"></div>
        <div className="flex items-center gap-2 ">
          <Button
            color="gray"
            isProcessing={exportMutation.isPending}
            onClick={() => exportMutation.mutateAsync(undefined)}
          >
            Экспорт
          </Button>
          <Button
            disabled={!Object.keys(form.formState.touchedFields).length}
            type="submit"
          >
            Сохранить
          </Button>
        </div>
      </div>
      <FormProvider {...form}>
        <TableList loading={loading} table={table} />
      </FormProvider>
      <div></div>
    </form>
  );
};
