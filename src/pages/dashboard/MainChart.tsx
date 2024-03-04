import { Toggle } from "@/components/Toggle";
import { salesChartMock } from "@/mocks/sales-chart";
import { Card, useThemeMode } from "flowbite-react";
import Chart from "react-apexcharts";

export const MainChart = () => {
  const { mode } = useThemeMode();
  const isDarkTheme = mode === "dark";

  const borderColor = isDarkTheme ? "#374151" : "#F3F4F6";
  const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";

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
      categories: salesChartMock.map((item) => item.Date),
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
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
            return `${value.toFixed(0)} Р`;
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
            return `${value.toFixed(0)} шт`;
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
      data: salesChartMock.map((item) => item.sales),
      color: "#1A56DB",
      group: "price",
    },
    {
      name: "Средняя цена",
      data: salesChartMock.map((item) => item.avgPrice),
      color: "#FDBA8C",
      group: "price",
    },
    {
      name: "Заказы",
      data: salesChartMock.map((item) => item.orders),
      color: "#93C5FD",
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
