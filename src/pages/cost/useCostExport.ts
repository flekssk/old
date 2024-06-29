import { createCustomMutation } from "@/api/helper";
import { incomeDiagram } from "@/api/income/api";
import { articleList } from "@/api/wb/api";
import { downloadFromBinary } from "@/helpers/common";

export const costExportRequest = async (dateFrom?: string) => {
  const nmIds: string[] = [];
  const limit = 500;

  const fetchPage = async (page: number) => {
    const response = await articleList({ page, limit });
    nmIds.push(...response.items.map((item) => item.nmId));

    const totalPages = Math.ceil(
      response.pagination.total / response.pagination.limit,
    );

    if (page < totalPages) {
      await fetchPage(page + 1);
    }
  };

  await fetchPage(1);

  const response = await incomeDiagram({
    nmIds: nmIds.join(","),
    dateFrom,
    xls: true,
  });

  downloadFromBinary(response.data, "cost");
};

export const useCostExportMutation = createCustomMutation(costExportRequest);
