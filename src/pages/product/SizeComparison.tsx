import { CheckboxCharts } from "@/components/chart/checkbox";
import { mockDataSize, strokeColors2 } from "@/data/charts";
import { format, parse } from "date-fns";
import { Card, Dropdown, useThemeMode } from "flowbite-react";
import { useCallback, useState } from "react";
import Chart from "react-apexcharts";
import { DATE_FORMAT } from "@/helpers/date";

const SizeComparison = function () {
  const [params, setParams] = useState(["M", "L"]);
  const { mode } = useThemeMode();

  const isDarkTheme = mode === "dark";

  const borderColor = isDarkTheme ? "#F3F4F6" : "#9F9F9F";
  const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";

  const options: ApexCharts.ApexOptions = {
    stroke: {
      curve: "straight",
    },
    colors: strokeColors2,
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
      strokeColors: strokeColors2,
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    xaxis: {
      categories: mockDataSize.map((item) =>
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
    legend: {
      show: false,
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
      name: "S",
      data: mockDataSize.map((item) => (params.includes("S") ? item.S : null)),
    },
    {
      name: "M",
      data: mockDataSize.map((item) => (params.includes("M") ? item.M : null)),
    },
    {
      name: "L",
      data: mockDataSize.map((item) => (params.includes("L") ? item.L : null)),
    },
    {
      name: "XXL",
      data: mockDataSize.map((item) =>
        params.includes("XXL") ? item.XXL : null,
      ),
    },
    {
      name: "XXXL",
      data: mockDataSize.map((item) =>
        params.includes("XXXL") ? item.XXXL : null,
      ),
    },
  ];
  const getParams = useCallback((id: string) => {
    setParams((prevParams) => [...prevParams, id]);
  }, []);

  const deleteParams = useCallback((id: string) => {
    setParams((prevParams) => prevParams.filter((param) => param !== id));
  }, []);

  return (
    <Card>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h2 className="text-xl">Сравнение товаров по размерам</h2>
        </div>
        <div className="flex gap-3">
          <Dropdown label="Продажа в шт" inline size="sm">
            <Dropdown.Item>
              <strong>пункт 1</strong>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>пункт 2</Dropdown.Item>
            <Dropdown.Item>пункт 3</Dropdown.Item>
          </Dropdown>
          <div className="flex items-center gap-2">
            <CheckboxCharts
              deleteParams={deleteParams}
              getParams={getParams}
              params={params}
              id="S"
              title="S"
            />
            <CheckboxCharts
              deleteParams={deleteParams}
              getParams={getParams}
              params={params}
              id="M"
              title="M"
              defaultChecked
            />
            <CheckboxCharts
              deleteParams={deleteParams}
              getParams={getParams}
              params={params}
              id="L"
              title="L"
              defaultChecked
            />
            <CheckboxCharts
              deleteParams={deleteParams}
              getParams={getParams}
              params={params}
              id="XXL"
              title="XXL"
            />
            <CheckboxCharts
              deleteParams={deleteParams}
              getParams={getParams}
              params={params}
              id="XXXL"
              title="XXXL"
            />
          </div>
        </div>
        <div className="">
          <Chart height={420} options={options} series={series} type="line" />
        </div>
      </div>
    </Card>
  );
};

export default SizeComparison;
