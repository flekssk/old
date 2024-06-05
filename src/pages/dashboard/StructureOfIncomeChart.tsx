import type { RevenueStructure } from "@/api/report/types";
import { useThemeMode } from "flowbite-react";
import type { FC } from "react";
import { useMemo } from "react";
import Chart from "react-apexcharts";

type StructureOfIncomeChartProps = {
  structure: RevenueStructure;
};

export const StructureOfIncomeChart: FC<StructureOfIncomeChartProps> = ({
  structure,
}) => {
  const { mode } = useThemeMode();
  const isDarkTheme = mode === "dark";

  const data = useMemo(() => {
    const total =
      Object.values(structure).reduce((acc, item) => {
        return acc + item;
      }, 0) || 1;

    return [
      {
        title: "Реклама",
        value: (structure.advertising / total) * 100,
      },
      {
        title: "Налоги",
        value: (structure.tax / total) * 100,
      },
      {
        title: "Комиссия",
        value: ((structure.commission || 0) / total) * 100,
      },
      {
        title: "Себестоимость",
        value: (structure.cost / total) * 100,
      },
      {
        title: "Штрафы",
        value: (structure.fines / total) * 100,
      },
      {
        title: "Логистика",
        value: (structure.logistics / total) * 100,
      },
      {
        title: "Хранения",
        value: (structure.storage / total) * 100,
      },
      {
        title: "Прибыль",
        value: (structure.margin / total) * 100,
      },
      {
        title: "Прочее",
        value: (structure.other / total) * 100,
      },
    ];
  }, [structure]);

  const options: ApexCharts.ApexOptions = {
    labels: data.map((item) => item.title),
    colors: [
      "#16BDCA",
      "#FDBA8C",
      "#1A56DB",
      "#D61F69",
      "#9061F9",
      "#F4C700",
      "#29B573",
      "#FF6B6B",
      "#FF77FF",
    ],
    chart: {
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      colors: [isDarkTheme ? "#111827" : "#fff"],
    },
    plotOptions: {
      pie: {
        donut: {
          size: "5%",
        },
      },
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
        return (
          '<span style="font-size: 14px; color: ' +
          opts.w.globals.colors[opts.seriesIndex] +
          ';">' +
          opts.w.globals.series[opts.seriesIndex].toFixed(2) +
          "%</span>" +
          "  " +
          '<span style="font-weight: 400; font-size: 12px;">' +
          val +
          "</span>"
        );
      },
      markers: {
        width: 0,
      },
    },
  };
  const series = data.map((item) => item.value);

  return <Chart height={305} options={options} series={series} type="donut" />;
};
