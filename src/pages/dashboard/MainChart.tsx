import type { ReportResponse } from "@/api/report/types";
import { CheckboxCharts } from "@/components/chart/checkbox";
import { Toggle } from "@/components/Toggle";
import { mockData, strokeColors } from "@/data/charts";
import { DATE_FORMAT } from "@/helpers/date";
import { format, parse } from "date-fns";

import { Card, useThemeMode } from "flowbite-react";
import type { FC } from "react";
import { useCallback } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";

type MainChartProps = {
  data: ReportResponse["chart"];
};

export const MainChart: FC<MainChartProps> = ({ data }) => {
  const [params, setParams] = useState(["sale"]);
  const { mode } = useThemeMode();
  const isDarkTheme = mode === "dark";

  const borderColor = isDarkTheme ? "#F3F4F6" : "#9F9F9F";
  const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";

  const sortedData = mockData.sort((a, b) => {
    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    return aDate - bDate;
  });

  const getParams = useCallback((id: string) => {
    setParams((prevParams) => [...prevParams, id]);
  }, []);

  const deleteParams = useCallback((id: string) => {
    setParams((prevParams) => prevParams.filter((param) => param !== id));
  }, []);

  const options: ApexCharts.ApexOptions = {
    stroke: {
      curve: "straight",
    },
    colors: strokeColors,
    chart: {
      zoom: {
        enabled: false,
      },
      type: "area",
      fontFamily: "Inter, sans-serif",
      foreColor: labelColor,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      },
    },
    grid: {
      position: "back",
      show: true,
      borderColor: borderColor,
      strokeDashArray: 1,
      padding: {
        left: 15,
        bottom: 15,
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      size: 5,
      strokeColors: strokeColors,
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    xaxis: {
      categories: sortedData.map((item) =>
        parse(item.date, DATE_FORMAT.SERVER_DATE, new Date()),
      ),
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
        },
        formatter: (value) => {
          return value ? format(value, DATE_FORMAT.DAY_MONTH) : "";
        },
      },
      axisBorder: {
        color: borderColor,
      },
      axisTicks: {
        color: borderColor,
      },
      crosshairs: {
        show: true,
        position: "back",
        stroke: {
          color: borderColor,
          width: 1,
          dashArray: 10,
        },
      },
    },
    yaxis: [
      {
        axisBorder: {
          show: true,
          color: "#AA21CC",
        },
        labels: {
          style: {
            colors: "#AA21CC",
          },
          formatter: (value) => {
            return value ? `${value.toFixed(0)} Р` : "0 Р";
          },
        },
      },
      {
        axisBorder: {
          show: true,
          color: "#1777FC",
        },
        opposite: true,
        labels: {
          style: {
            colors: "#1777FC",
          },
          formatter: (value) => {
            return value ? `${value.toFixed(0)} шт` : "0 шт";
          },
        },
      },
    ],
    legend: {
      show: false,
      fontSize: "14px",
      fontWeight: 500,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: [labelColor],
      },
      itemMargin: {
        horizontal: 10,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  };
  const series: ApexAxisChartSeries = [
    {
      name: "Продажи",
      data: sortedData.map((item) =>
        params.includes("sale") ? item.sale : null,
      ),
      group: "price",
    },
    {
      name: "Средняя цена",
      data: sortedData.map((item) =>
        params.includes("averagePriceBeforeSPP")
          ? item.averagePriceBeforeSPP
          : null,
      ),
      group: "price",
    },
    {
      name: "Заказы",
      data: sortedData.map((item) =>
        params.includes("ordersCount") ? item.ordersCount : null,
      ),
      group: "quantity",
    },
    {
      name: "Заказы р.",
      data: sortedData.map((item) =>
        params.includes("orders") ? item.orders : null,
      ),
      group: "quantity",
    },
    {
      name: "ДДР %",
      data: sortedData.map((item) =>
        params.includes("ddr") ? item.ddr : null,
      ),
      group: "quantity",
    },
    {
      name: "Логистика",
      data: sortedData.map((item) =>
        params.includes("logistics") ? item.logistics : null,
      ),
      group: "price",
    },
    {
      name: "Возвраты",
      data: sortedData.map((item) =>
        params.includes("returns") ? item.returns : null,
      ),
      group: "quantity",
    },
    {
      name: "Прибыль",
      data: sortedData.map((item) =>
        params.includes("profit") ? item.profit : null,
      ),
      group: "quantity",
    },
  ];

  return (
    <Card>
      <div className="flex justify-between">
        <h2 className="text-xl">Период в графике</h2>
        <div>
          <Toggle
            position="right"
            label="Сравнить с прошлым периодом"
            onChange={(e) => {
              () => console.log(e);
            }}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <CheckboxCharts
          deleteParams={deleteParams}
          getParams={getParams}
          params={params}
          id="sale"
          title="Продажи"
          defaultChecked
        />
        <CheckboxCharts
          deleteParams={deleteParams}
          getParams={getParams}
          params={params}
          id="averagePriceBeforeSPP"
          title="Средняя цена"
        />
        <CheckboxCharts
          deleteParams={deleteParams}
          getParams={getParams}
          params={params}
          id="ordersCount"
          title="Заказы"
        />
        <CheckboxCharts
          deleteParams={deleteParams}
          getParams={getParams}
          params={params}
          id="orders"
          title="Заказы р."
        />
        <CheckboxCharts
          deleteParams={deleteParams}
          getParams={getParams}
          params={params}
          id="ddr"
          title="ДДР %"
        />
        <CheckboxCharts
          deleteParams={deleteParams}
          getParams={getParams}
          params={params}
          id="logistics"
          title="Логистика"
        />
        <CheckboxCharts
          deleteParams={deleteParams}
          getParams={getParams}
          params={params}
          id="returns"
          title="Возвраты"
        />
        <CheckboxCharts
          deleteParams={deleteParams}
          getParams={getParams}
          params={params}
          id="profit"
          title="Прибыль"
        />
      </div>
      <Chart height={420} options={options} series={series} type="line" />
    </Card>
  );
};
