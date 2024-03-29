import { Toggle } from "@/components/Toggle";
import { Card, Dropdown, useThemeMode } from "flowbite-react";
import Chart from "react-apexcharts";

const ProductAvailability = function () {
  const { mode } = useThemeMode();
  const isDarkTheme = mode === "dark";
  const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";
  const options: ApexCharts.ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top",
        },
      },
    },
    stroke: {
      show: true,
      width: 9,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Новосибирск",
        "Хабаровск",
        "Подольск",
        "Казань",
        "Электросталь",
      ],
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return value ? `${value.toFixed(0)} шт` : "0 шт";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      },
    },
  };
  const series: ApexAxisChartSeries = [
    {
      name: "M",
      data: [44, 55, 57, 56, 61],
    },
    {
      name: "L",
      data: [76, 85, 101, 98, 87],
    },
    {
      name: "S",
      data: [35, 41, 36, 26, 45],
    },
    {
      name: "XXL",
      data: [35, 41, 36, 26, 45],
    },
    {
      name: "XXXL",
      data: [35, 41, 36, 26, 45],
    },
  ];
  return (
    <Card>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h2 className="text-xl">Наличие товара на складах</h2>
          <div className="flex gap-3">
            <Dropdown label="Все склады" inline size="sm">
              <Dropdown.Item>
                <strong>пункт 1</strong>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>пункт 2</Dropdown.Item>
              <Dropdown.Item>пункт 3</Dropdown.Item>
            </Dropdown>
            <Toggle
              position="right"
              label="Показывать по размерам"
              onChange={(e) => {
                () => console.log(e);
              }}
            />
          </div>
        </div>
        <div className="">
          <Chart height={420} options={options} series={series} type="bar" />
        </div>
      </div>
    </Card>
  );
};

export default ProductAvailability;
