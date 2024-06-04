import { useCallback, useMemo, useState } from "react";
import type { ReportChartItem } from "@/api/report/types";
import type { ChartOptions, TooltipItem } from "chart.js";
import { ru } from "date-fns/locale";
import "chartjs-adapter-date-fns";

type ChartParamsProps = {
  data: ReportChartItem[];
  displayPrevData: boolean;
  prevData?: ReportChartItem[];
  additionalValueForToolip?: {
    yAxisID: string;
    additionalDataKey: keyof ReportChartItem;
  };
};

const getAllValues = (
  key: keyof ReportChartItem,
  displayPrevData: boolean,
  currentData: ReportChartItem[],
  prevData?: ReportChartItem[],
): number[] => {
  return displayPrevData && prevData
    ? [
        ...prevData.map((item) => Math.ceil(item[key] as number)),
        ...currentData.map((item) => Math.ceil(item[key] as number)),
      ]
    : [...currentData.map((item) => Math.ceil(item[key] as number))];
};

const useChartParams = ({
  data,
  displayPrevData,
  prevData,
  additionalValueForToolip,
}: ChartParamsProps) => {
  const [params, setParams] = useState(["sale"]);

  const getParams = useCallback((id: string) => {
    setParams((prevParams) => [...prevParams, id]);
  }, []);

  const deleteParams = useCallback((id: string) => {
    setParams((prevParams) => prevParams.filter((param) => param !== id));
  }, []);

  const getCustomTooltip = (context: TooltipItem<"line">) => {
    if (
      additionalValueForToolip &&
      context.dataset.yAxisID === additionalValueForToolip?.yAxisID
    ) {
      let label = context.dataset.label || "";

      if (label) {
        label += ": ";
      }

      if (context.parsed.y !== null) {
        label += context.formattedValue + "%";

        const additionalValue =
          sortedData[context.dataIndex]?.[
            additionalValueForToolip.additionalDataKey
          ];

        if (additionalValue !== undefined) {
          label += ` (${additionalValue} руб.)`;
        }
      }
      return label;
    }

    return undefined;
  };

  const labels = data
    .sort((a, b) => {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      return aDate - bDate;
    })
    .map((item) => {
      const date = new Date(item.date);
      date.setHours(0);
      return date;
    });

  const { sortedData, prevSortedData } = useMemo(
    () => ({
      sortedData: data.sort((a, b) => {
        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();
        return aDate - bDate;
      }),
      prevSortedData: (prevData || []).sort((a, b) => {
        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();
        return aDate - bDate;
      }),
    }),
    [data, prevData],
  );
  //const borderColor = isDarkTheme ? "#F3F4F6" : "#9F9F9F";
  //const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";

  const options = useMemo(() => {
    const allSales = getAllValues(
      "sale",
      displayPrevData,
      sortedData,
      prevSortedData,
    );

    const allLogistics = getAllValues(
      "logistics",
      displayPrevData,
      sortedData,
      prevSortedData,
    );

    const allProfit = getAllValues(
      "profit",
      displayPrevData,
      sortedData,
      prevSortedData,
    );

    const allReturns = getAllValues(
      "returns",
      displayPrevData,
      sortedData,
      prevSortedData,
    );

    const allAvgPrices = getAllValues(
      "averagePriceBeforeSPP",
      displayPrevData,
      sortedData,
      prevSortedData,
    );

    const maxY1 = Math.max(
      ...allSales,
      ...allLogistics,
      ...allProfit,
      ...allReturns,
    );

    const minY1 = Math.min(
      ...allSales,
      ...allLogistics,
      ...allProfit,
      ...allReturns,
    );

    const result: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index" as const,
        intersect: false,
      },

      plugins: {
        title: {
          display: false,
          text: "Chart.js Line Chart - Multi Axis",
        },
        tooltip: {
          callbacks: {
            label: getCustomTooltip,
          },
        },
      },
      scales: {
        x: {
          type: "time",

          time: {
            unit: "day",
            displayFormats: {
              day: "d MMMM",
            },
            tooltipFormat: "d MMMM",
          },
          // add this:
          adapters: {
            date: {
              locale: ru,
            },
          },
        },
        y1: {
          max: Math.ceil(maxY1 * 1.3),
          min: Math.ceil(minY1 >= 0 ? minY1 * 0.7 : minY1 * 1.3),
          type: "linear" as const,
          display: true,
          position: "left" as const,
          grid: {
            drawOnChartArea: false,
          },
        },
        y2: {
          max: Math.ceil(Math.max(...allAvgPrices) * 1.3),
          min: Math.ceil(Math.min(...allAvgPrices) * 0.7),
          type: "linear" as const,
          display: true,
          position: "right" as const,
          grid: {
            drawOnChartArea: false,
          },
        },
        y3: {
          min: 0,
          max: 100,
          type: "linear" as const,
          display: true,
          position: "right" as const,
          grid: {
            drawOnChartArea: false,
          },
        },
        y4: {
          type: "linear" as const,
          display: false,
          position: "left" as const,
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    };
    return result;
  }, [sortedData, prevSortedData, displayPrevData]);
  console.log("🚀 ~ options:", options);
  return {
    prevSortedData,
    sortedData,
    deleteParams,
    getParams,
    params,
    options,
    labels,
  };
};

export default useChartParams;
