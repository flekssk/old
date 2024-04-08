import type { ReportChartItem } from "@/api/report/types";
import { CheckboxCharts } from "@/components/chart/checkbox";
import { Toggle } from "@/components/Toggle";
import { areaColors, strokeColors } from "@/data/charts";

import { Card } from "flowbite-react";
import type { FC } from "react";
import { useMemo, useState } from "react";
import Chart from "react-apexcharts";
import useChartParams from "@/hooks/chartParams";

type MainChartProps = {
  data: ReportChartItem[];
  prevData?: ReportChartItem[];
};

export const MainChart: FC<MainChartProps> = ({ data, prevData }) => {
  const [displayPrevData, setDisplayPrevData] = useState<boolean>(false);
  const {
    prevSortedData,
    sortedData,
    params,
    options,
    getParams,
    deleteParams,
  } = useChartParams({ data, prevData });

  const series: ApexAxisChartSeries = useMemo(() => {
    const result: ApexAxisChartSeries = [];
    if (params.includes("sale")) {
      result.push({
        name: "Продажи",
        data: sortedData.map((item) => item.sale),
        type: "line",
        group: "price",
        zIndex: 10,
        color: strokeColors[0],
      });

      if (displayPrevData) {
        result.push({
          name: "Продажи пред. периуд",
          data: prevSortedData.map((item) => item.sale),
          type: "area",
          group: "price",
          zIndex: 5,
          color: areaColors[0],
        });
      }
    }

    if (params.includes("averagePriceBeforeSPP")) {
      result.push({
        name: "Средняя цена",
        data: sortedData.map((item) => item.averagePriceBeforeSPP),
        type: "line",
        group: "price",
        zIndex: 10,
        color: strokeColors[1],
      });

      if (displayPrevData) {
        result.push({
          name: "Средняя цена",
          data: prevSortedData.map((item) => item.averagePriceBeforeSPP),
          group: "price",
          type: "area",
          zIndex: 5,
          color: areaColors[1],
        });
      }
    }

    if (params.includes("ordersCount")) {
      result.push({
        name: "Заказы",
        data: sortedData.map((item) => item.ordersCount),
        type: "line",
        group: "quantity",
        zIndex: 10,
        color: strokeColors[2],
      });

      if (displayPrevData) {
        result.push({
          name: "Заказы р.",
          data: sortedData.map((item) => item.orders),
          group: "quantity",
          type: "area",
          zIndex: 5,
          color: areaColors[2],
        });
      }
    }

    if (params.includes("orders")) {
      result.push({
        name: "Заказы р.",
        data: sortedData.map((item) => item.orders),
        type: "line",
        group: "price",
        zIndex: 10,
        color: strokeColors[3],
      });

      if (displayPrevData) {
        result.push({
          name: "Заказы р.",
          data: prevSortedData.map((item) => item.orders),
          group: "price",
          type: "area",
          zIndex: 5,
          color: areaColors[3],
        });
      }
    }

    if (params.includes("ddr")) {
      result.push({
        name: "ДДР %",
        data: sortedData.map((item) => item.ddr),
        type: "line",
        group: "price",
        zIndex: 10,
        color: strokeColors[4],
      });

      if (displayPrevData) {
        result.push({
          name: "ДДР %",
          data: prevSortedData.map((item) => item.ddr),
          group: "price",
          type: "area",
          zIndex: 5,
          color: areaColors[4],
        });
      }
    }

    if (params.includes("logistics")) {
      result.push({
        name: "Логистика",
        data: sortedData.map((item) => item.logistics),
        type: "line",
        group: "price",
        zIndex: 10,
        color: strokeColors[5],
      });

      if (displayPrevData) {
        result.push({
          name: "Логистика",
          data: prevSortedData.map((item) => item.logistics),
          group: "price",
          type: "area",
          zIndex: 5,
          color: areaColors[5],
        });
      }
    }

    if (params.includes("returns")) {
      result.push({
        name: "Возвраты",
        data: sortedData.map((item) => item.returns),
        type: "line",
        group: "price",
        zIndex: 10,
        color: strokeColors[6],
      });

      if (displayPrevData) {
        result.push({
          name: "Возвраты",
          data: prevSortedData.map((item) => item.returns),
          group: "price",
          type: "area",
          zIndex: 5,
          color: areaColors[6],
        });
      }
    }

    if (params.includes("profit")) {
      result.push({
        name: "Прибыль",
        data: sortedData.map((item) => item.profit),
        type: "line",
        group: "price",
        zIndex: 10,
        color: strokeColors[7],
      });

      if (displayPrevData) {
        result.push({
          name: "Прибыль",
          data: prevSortedData.map((item) => item.profit),
          group: "price",
          type: "area",
          zIndex: 5,
          color: areaColors[7],
        });
      }
    }
    return result;
  }, [sortedData, params, prevSortedData, displayPrevData]);

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
      <div className="flex items-center gap-2">
        <CheckboxCharts
          deleteParams={deleteParams}
          getParams={getParams}
          params={params}
          color={strokeColors[0]}
          id="sale"
          title="Продажи"
          defaultChecked
        />
        <CheckboxCharts
          deleteParams={deleteParams}
          getParams={getParams}
          params={params}
          color={strokeColors[1]}
          id="averagePriceBeforeSPP"
          title="Средняя цена"
        />
        <CheckboxCharts
          deleteParams={deleteParams}
          getParams={getParams}
          params={params}
          color={strokeColors[2]}
          id="ordersCount"
          title="Заказы"
        />
        <CheckboxCharts
          deleteParams={deleteParams}
          getParams={getParams}
          params={params}
          color={strokeColors[3]}
          id="orders"
          title="Заказы р."
        />
        <CheckboxCharts
          deleteParams={deleteParams}
          getParams={getParams}
          params={params}
          color={strokeColors[4]}
          id="ddr"
          title="ДДР %"
        />
        <CheckboxCharts
          deleteParams={deleteParams}
          getParams={getParams}
          color={strokeColors[5]}
          params={params}
          id="logistics"
          title="Логистика"
        />
        <CheckboxCharts
          deleteParams={deleteParams}
          getParams={getParams}
          params={params}
          color={strokeColors[6]}
          id="returns"
          title="Возвраты"
        />
        <CheckboxCharts
          deleteParams={deleteParams}
          getParams={getParams}
          params={params}
          color={strokeColors[7]}
          id="profit"
          title="Прибыль"
        />
      </div>
      <Chart height={420} options={options} series={series} type="line" />
    </Card>
  );
};
