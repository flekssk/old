import { createCustomMutation } from "@/api/helper";
import { incomeDiagram } from "@/api/income/api";
import { articleList } from "@/api/wb/api";

export const costExportRequest = async (dateFrom?: string) => {
  const nmIds: string[] = [];
  let page = 1;
  const limit = 500;
  while (true) {
    const response = await articleList({ page, limit });
    nmIds.push(...response.items.map((item) => item.nmId));
    if (
      response.pagination.page * response.pagination.limit >
      response.pagination.total
    ) {
      break;
    }
    page++;
  }

  const response = await incomeDiagram({
    nmIds: nmIds.join(","),
    dateFrom,
    xls: true,
  });
  console.log("🚀 ~ costExportRequest ~ response:", response);
};

export const useCostExportMutation = createCustomMutation(costExportRequest);
