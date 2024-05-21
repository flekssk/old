import type { ReportChartItem } from "@/api/report/types";
import "chartjs-adapter-date-fns";
import { Toggle } from "@/components/Toggle";
import { areaColors, strokeColors } from "@/data/charts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  type ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card } from "flowbite-react";
import type { FC } from "react";
import { useMemo, useState } from "react";

import useChartParams from "@/hooks/chartParams";

type MainChartProps = {
  data: ReportChartItem[];
  prevData?: ReportChartItem[];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

export type Series = {
  sale: number[];
  averagePriceBeforeSPP: number[];
  ordersCount: number[];
  orders: number[];
  ddr: number[];
  logistics: number[];
  returns: number[];
  profit: number[];
  prev?: Omit<Series, "prev">;
};

export const MainChartNew: FC<MainChartProps> = ({ data, prevData }) => {
  const [displayPrevData, setDisplayPrevData] = useState<boolean>(false);
  const { prevSortedData, sortedData, params, labels, options } =
    useChartParams({
      data,
      prevData,
      displayPrevData,
    });

  // const options = {
  //   responsive: true,
  //   interaction: {
  //     mode: "index" as const,
  //     intersect: false,
  //   },
  //   stacked: false,
  //   plugins: {
  //     title: {
  //       display: false,
  //       text: "Chart.js Line Chart - Multi Axis",
  //     },
  //   },
  //   scales: {
  //     x: {
  //       type: "time",
  //       max: Math.ceil(Math.max(...prevSortedData.map(item => item.sale), ...sortedData.map(item => item.sale)))
  //       time: {
  //         unit: "day",
  //         displayFormats: {
  //           day: "d MMMM",
  //         },
  //         tooltipFormat: "d MMMM",
  //       },
  //       // add this:
  //       adapters: {
  //         date: {
  //           locale: ru,
  //         },
  //       },
  //     },
  //     y1: {
  //       type: "linear" as const,
  //       display: true,
  //       position: "left" as const,
  //       grid: {
  //         drawOnChartArea: false,
  //       },
  //     },
  //     y2: {
  //       type: "linear" as const,
  //       display: true,
  //       position: "right" as const,
  //       grid: {
  //         drawOnChartArea: false,
  //       },
  //     },
  //     y3: {
  //       type: "linear" as const,
  //       display: true,
  //       position: "right" as const,
  //       grid: {
  //         drawOnChartArea: false,
  //       },
  //     },
  //     y4: {
  //       type: "linear" as const,
  //       display: true,
  //       position: "left" as const,
  //       grid: {
  //         drawOnChartArea: false,
  //       },
  //     },
  //   },
  // };

  const series: ChartData<"line", number[], unknown> = useMemo(() => {
    const result: ChartData<"line", number[], unknown> = {
      datasets: [],
      labels,
    };

    result.datasets.push({
      label: "Продажи",
      data: sortedData.map((item) => item.sale),
      yAxisID: "y1",
      borderColor: strokeColors[0],
      backgroundColor: strokeColors[0],
    });

    if (displayPrevData) {
      result.datasets.push({
        label: "Продажи пред. периуд",
        data: prevSortedData.map((item) => item.sale),
        yAxisID: "y1",
        fill: true,
        borderColor: areaColors[0],
        backgroundColor: areaColors[0],
      });
    }

    result.datasets.push({
      label: "Средняя цена",
      data: sortedData.map((item) => Math.ceil(item.averagePriceBeforeSPP)),
      yAxisID: "y2",
      borderColor: strokeColors[1],
      backgroundColor: strokeColors[1],
    });

    if (displayPrevData) {
      result.datasets.push({
        label: "Средняя цена  пред. периуд",
        data: prevSortedData.map((item) =>
          Math.ceil(item.averagePriceBeforeSPP),
        ),
        yAxisID: "y2",
        fill: true,
        borderColor: areaColors[1],
        backgroundColor: areaColors[1],
      });
    }

    // result.datasets.push({
    //   label: "Заказы",
    //   data: sortedData.map((item) => item.ordersCount),
    // });

    // if (displayPrevData) {
    //   result.datasets.push({
    //     label: "Заказы р.",
    //     data: sortedData.map((item) => item.orders),
    //     fill: true,
    //   });
    // }

    // result.datasets.push({
    //   label: "Заказы р.",
    //   data: sortedData.map((item) => item.orders),
    // });

    // if (displayPrevData) {
    //   result.datasets.push({
    //     label: "Заказы р.",
    //     data: prevSortedData.map((item) => item.orders),
    //     fill: true,
    //   });
    // }

    result.datasets.push({
      label: "ДРР %",
      data: sortedData.map((item) => item.ddr),
      yAxisID: "y3",
      borderColor: strokeColors[2],
      backgroundColor: strokeColors[2],
    });

    if (displayPrevData) {
      result.datasets.push({
        label: "ДРР %",
        data: prevSortedData.map((item) => item.ddr),
        yAxisID: "y3",
        fill: true,
        borderColor: areaColors[2],
        backgroundColor: areaColors[2],
      });
    }

    result.datasets.push({
      label: "Логистика",
      data: sortedData.map((item) => item.logistics),
      yAxisID: "y1",
      borderColor: strokeColors[3],
      backgroundColor: strokeColors[3],
    });

    if (displayPrevData) {
      result.datasets.push({
        label: "Логистика",
        data: prevSortedData.map((item) => item.logistics),
        yAxisID: "y1",
        fill: true,
        borderColor: areaColors[3],
        backgroundColor: areaColors[3],
      });
    }

    result.datasets.push({
      label: "Возвраты",
      data: sortedData.map((item) => item.returns),
      yAxisID: "y1",
      borderColor: strokeColors[4],
      backgroundColor: strokeColors[4],
    });

    if (displayPrevData) {
      result.datasets.push({
        label: "Возвраты",
        data: prevSortedData.map((item) => item.returns),
        yAxisID: "y1",
        fill: true,
        borderColor: areaColors[4],
        backgroundColor: areaColors[4],
      });
    }

    result.datasets.push({
      label: "Прибыль",
      data: sortedData.map((item) => item.profit),
      yAxisID: "y1",
      borderColor: strokeColors[5],
      backgroundColor: strokeColors[5],
    });

    if (displayPrevData) {
      result.datasets.push({
        label: "Прибыль",
        data: prevSortedData.map((item) => item.profit),
        yAxisID: "y1",
        fill: true,
        borderColor: areaColors[5],
        backgroundColor: areaColors[5],
      });
    }

    return result;
  }, [sortedData, params, prevSortedData, displayPrevData, labels]);

  return (
    <Card>
      <div className="flex justify-between">
        <h2 className="text-xl">Период в графике</h2>
        <div>
          {prevData ? (
            <Toggle
              position="right"
              label="Сравнить с прошлым периодом"
              onChange={(e) => {
                setDisplayPrevData(e.target.checked);
              }}
            />
          ) : null}
        </div>
      </div>
      <div className="flex items-center gap-2"></div>
      <div className="h-96">
        <Line options={options} data={series} />
      </div>
    </Card>
  );
};
