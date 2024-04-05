import type { ReportChartItem, ReportResponse } from "@/api/report/types";
import { CheckboxCharts } from "@/components/chart/checkbox";
import { Toggle } from "@/components/Toggle";
import { areaColors, strokeColors } from "@/data/charts";
import { DATE_FORMAT } from "@/helpers/date";
import { format, parse } from "date-fns";

import { Card, useThemeMode } from "flowbite-react";
import type { FC } from "react";
import { useCallback, useMemo } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";

type MainChartProps = {
  data: ReportChartItem[];
  prevData?: ReportChartItem[];
};

export const MainChart: FC<MainChartProps> = ({ data, prevData }) => {
  const [params, setParams] = useState(["sale"]);
  const [displayPrevData, setDisplayPrevData] = useState<boolean>(false);
  const { mode } = useThemeMode();
  const isDarkTheme = mode === "dark";

  const borderColor = isDarkTheme ? "#F3F4F6" : "#9F9F9F";
  const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";

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

  const getParams = useCallback((id: string) => {
    setParams((prevParams) => [...prevParams, id]);
  }, []);

  const deleteParams = useCallback((id: string) => {
    setParams((prevParams) => prevParams.filter((param) => param !== id));
  }, []);

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

  const options: ApexCharts.ApexOptions = {
    stroke: {
      curve: "straight",
    },

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
