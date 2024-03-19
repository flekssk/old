import type { ReportResponse } from "@/api/report/types";
import { Toggle } from "@/components/Toggle";
import { DATE_FORMAT } from "@/helpers/date";
import { format, parse } from "date-fns";

import { Card, useThemeMode } from "flowbite-react";
import type { FC } from "react";
import Chart from "react-apexcharts";

type MainChartProps = {
  data: ReportResponse["chart"];
};

export const MainChart: FC<MainChartProps> = ({ data }) => {
  const { mode } = useThemeMode();
  const isDarkTheme = mode === "dark";

  const borderColor = isDarkTheme ? "#374151" : "#F3F4F6";
  const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";

  const sortedData = data.sort((a, b) => {
    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    return aDate - bDate;
  });

  const options: ApexCharts.ApexOptions = {
    stroke: {
      curve: "smooth",
    },
    chart: {
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
      show: true,
      borderColor: borderColor,
      strokeDashArray: 1,
      padding: {
        left: 35,
        bottom: 15,
      },
    },
    markers: {
      size: 5,
      strokeColors: "#ffffff",
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
        title: {
          text: "",
        },
        labels: {
          style: {
            colors: [labelColor],
          },
          formatter: (value) => {
            return value ? `${value.toFixed(0)} Р` : "0 Р";
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Series B",
        },
        labels: {
          formatter: (value) => {
            return value ? `${value.toFixed(0)} шт` : "0 шт";
          },
        },
      },
    ],
    legend: {
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
      data: sortedData.map((item) => item.sale),
      group: "price",
    },
    {
      name: "Средняя цена",
      data: sortedData.map((item) => item.averagePriceBeforeSPP),
      group: "price",
    },
    {
      name: "Заказы",
      data: sortedData.map((item) => item.ordersCount),
      group: "quantity",
    },
    {
      name: "Заказы р.",
      data: sortedData.map((item) => item.orders),
      group: "quantity",
    },

    {
      name: "ДДР %",
      data: sortedData.map((item) => item.ddr),
      group: "quantity",
    },
    {
      name: "Логистика",
      data: sortedData.map((item) => item.logistics),
      group: "price",
    },
    {
      name: "Возвраты",
      data: sortedData.map((item) => item.returns),
      group: "quantity",
    },
    {
      name: "Прибыль",
      data: sortedData.map((item) => item.profit),
      group: "quantity",
    },
  ];

  return (
    <Card>
      <div className="flex justify-between">
        <h2 className="text-xl">Аналитика</h2>
        <div>
          <Toggle
            position="right"
            label="Стравнить с предыдушим периудом"
            onChange={() => {}}
          />
        </div>
      </div>
      <Chart height={420} options={options} series={series} type="line" />
    </Card>
  );
};
