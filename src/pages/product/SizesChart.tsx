import { useThemeMode } from "flowbite-react";
import type { FC } from "react";
import { useMemo } from "react";
import Chart from "react-apexcharts";
import type { BarcodeReportItem } from "@/api/report/types";

type SizesChartProps = {
  data: BarcodeReportItem[];
};

export const SizesChart: FC<SizesChartProps> = ({ data }) => {
  const { mode } = useThemeMode();
  const isDarkTheme = mode === "dark";

  const sortedProducts = useMemo(() => {
    return data.sort((a, b) => b.profit - a.profit);
  }, [data]);

  const options: ApexCharts.ApexOptions = {
    labels: sortedProducts.map((item) => item.size),
    colors: ["#16BDCA", "#FDBA8C", "#1A56DB", "#D61F69", "#9061F9"],
    chart: {
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      colors: [isDarkTheme ? "#111827" : "#fff"],
    },

    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.9,
        },
      },
    },

    tooltip: {
      shared: true,
      followCursor: false,
      fillSeriesColor: false,
      inverseOrder: true,
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      },
      x: {
        show: true,
        formatter: function (_, { seriesIndex, w }) {
          const label = w.config.labels[seriesIndex];
          return label;
        },
      },
      y: {
        formatter: function (value) {
          return value.toFixed(2) + "%";
        },
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      formatter: function (val, opts) {
        const title = val.length > 20 ? val.slice(0, 20) : val;
        return (
          '<span style="font-size: 14px; color: ' +
          opts.w.globals.colors[opts.seriesIndex] +
          ';">' +
          opts.w.globals.series[opts.seriesIndex].toFixed(2) +
          "%</span>" +
          "  " +
          '<span style="font-weight: 400; font-size: 12px;">' +
          title +
          "..." +
          "</span>"
        );
      },
      markers: {
        width: 0,
      },
    },
  };

  const allProfit = sortedProducts.reduce(
    (result, item) => item.profit + result,
    0,
  );
  const series = sortedProducts.map((item) => (item.profit / allProfit) * 100);
  console.log("🚀 ~ series:", series);

  return <Chart height={305} options={options} series={series} type="donut" />;
};
