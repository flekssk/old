import { CheckboxCharts } from "@/components/chart/checkbox";
import { mockDataSize, strokeColors3 } from "@/data/charts";
import { format, parse } from "date-fns";
import { Card, Dropdown, useThemeMode } from "flowbite-react";
import { useCallback, useState } from "react";
import Chart from "react-apexcharts";
import { DATE_FORMAT } from "@/helpers/date";

const ComparisonByOption = function () {
  const [params, setParams] = useState(["option_2", "option_3"]);
  const { mode } = useThemeMode();

  const isDarkTheme = mode === "dark";

  const borderColor = isDarkTheme ? "#F3F4F6" : "#9F9F9F";
  const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";

  const options: ApexCharts.ApexOptions = {
    stroke: {
      curve: "straight",
    },
    colors: strokeColors3,
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
      strokeColors: strokeColors3,
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
      name: "S-55-065-черный",
      data: mockDataSize.map((item) =>
        params.includes("option_1") ? item.S : null,
      ),
    },
    {
      name: "S-55-065-синий",
      data: mockDataSize.map((item) =>
        params.includes("option_2") ? item.M : null,
      ),
    },
    {
      name: "S-55-065-серый",
      data: mockDataSize.map((item) =>
        params.includes("option_3") ? item.L : null,
      ),
    },
    {
      name: "S-55-065-белый",
      data: mockDataSize.map((item) =>
        params.includes("option_4") ? item.XXL : null,
      ),
    },
    {
      name: "S-55-065-красный",
      data: mockDataSize.map((item) =>
        params.includes("option_5") ? item.XXXL : null,
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
          <h2 className="text-xl">Сравнение товаров по вариантам</h2>
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
              id="option_1"
              title="S-55-065-черный"
            />
            <CheckboxCharts
              deleteParams={deleteParams}
              getParams={getParams}
              params={params}
              id="option_2"
              title="S-55-065-синий"
              defaultChecked
            />
            <CheckboxCharts
              deleteParams={deleteParams}
              getParams={getParams}
              params={params}
              id="option_3"
              title="S-55-065-серый"
              defaultChecked
            />
            <CheckboxCharts
              deleteParams={deleteParams}
              getParams={getParams}
              params={params}
              id="option_4"
              title="S-55-065-белый"
            />
            <CheckboxCharts
              deleteParams={deleteParams}
              getParams={getParams}
              params={params}
              id="option_5"
              title="S-55-065-красный"
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

export default ComparisonByOption;
