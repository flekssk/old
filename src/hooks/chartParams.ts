import { useCallback, useMemo, useState } from "react";
import type { ReportChartItem } from "@/api/report/types";
import { strokeColors } from "@/data/charts";
import { format, parse } from "date-fns";
import { DATE_FORMAT } from "@/helpers/date";
import { useThemeMode } from "flowbite-react";

type ChartParamsProps = {
  data: ReportChartItem[];
  prevData?: ReportChartItem[];
};

const useChartParams = ({ data, prevData }: ChartParamsProps) => {
  const [params, setParams] = useState(["sale"]);
  const { mode } = useThemeMode();
  const isDarkTheme = mode === "dark";
  const getParams = useCallback((id: string) => {
    setParams((prevParams) => [...prevParams, id]);
  }, []);

  const deleteParams = useCallback((id: string) => {
    setParams((prevParams) => prevParams.filter((param) => param !== id));
  }, []);

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
  const borderColor = isDarkTheme ? "#F3F4F6" : "#9F9F9F";
  const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";
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

  return {
    prevSortedData,
    sortedData,
    deleteParams,
    getParams,
    params,
    options,
  };
};

export default useChartParams;
