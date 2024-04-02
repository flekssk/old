import type { Stocks } from "@/api/report/types";
import { Toggle } from "@/components/Toggle";
import { Card, Dropdown, useThemeMode } from "flowbite-react";
import { useState, type FC, useMemo } from "react";
import Chart from "react-apexcharts";

type ProductAvailabilityProps = {
  stocks: Stocks[];
};

const ProductAvailability: FC<ProductAvailabilityProps> = ({ stocks }) => {
  const [showSizes, setShowSizes] = useState<boolean>(false);
  const warehouses = stocks.reduce(
    (acc, item) => {
      acc[item.warehouseId] = item.warehouseName;
      return acc;
    },
    {} as Record<number, string>,
  );

  const displayWarehouseNames = useMemo(() => {
    const warehouseCounts = stocks.reduce(
      (acc, stock) => {
        if (!acc[stock.warehouseName]) {
          acc[stock.warehouseName] = 0;
        }
        acc[stock.warehouseName] += stock.quantity;
        return acc;
      },
      {} as Record<string, number>,
    );

    const allStocks = Object.values(warehouseCounts).reduce(
      (acc, item) => acc + item,
      0,
    );

    return Object.keys(warehouseCounts).reduce((acc, warehouseName) => {
      if (((warehouseCounts[warehouseName] as number) / allStocks) * 100 > 3) {
        acc.push(warehouseName);
      }
      return acc;
    }, [] as string[]);
  }, [warehouses, stocks]);

  const otherWarehouses = "Остальные склады";
  const stockBySize = stocks.reduce(
    (acc, item) => {
      if (!acc[item.size]) {
        acc[item.size] = {};
      }

      const bySize = acc[item.size] as Record<string, number>;
      const warehouseId = displayWarehouseNames.includes(item.warehouseName)
        ? item.warehouseName
        : otherWarehouses;
      if (!bySize[warehouseId]) {
        bySize[warehouseId] = 0;
      }
      bySize[warehouseId] += item.quantity;

      return acc;
    },
    {} as Record<string, Record<string, number>>,
  );

  const categories = [otherWarehouses, ...Object.values(displayWarehouseNames)];

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
      categories: categories,
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
  const seriesBySize = Object.keys(stockBySize).map((size) => ({
    name: size,
    data: categories.map(
      (category) =>
        (stockBySize[size] as Record<string, number>)[category] ?? 0,
    ),
  })) as ApexAxisChartSeries;

  const seriesAllSize = [
    Object.keys(stockBySize).reduce(
      (acc, item) => {
        if (!acc.name) {
          acc.name = "Все размеры";
          acc.data = categories.map(
            (category) =>
              (stockBySize[item] as Record<string, number>)[category] ?? 0,
          );
        } else {
          categories.forEach((category, index) => {
            const val =
              ((stockBySize[item] as Record<string, number>)[
                category
              ] as number) ?? 0;
            (acc.data as number[])[index] += val;
          });
        }

        return acc;
      },
      {} as { name?: string; data?: number[] },
    ),
  ];
  console.log("🚀 ~ seriesAllSize:", seriesAllSize, seriesBySize, categories);

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
              checked={showSizes}
              label="Показывать по размерам"
              onChange={(e) => {
                setShowSizes(e.target.checked);
              }}
            />
          </div>
        </div>
        <div className="">
          <Chart
            height={420}
            options={options}
            series={
              showSizes ? seriesBySize : (seriesAllSize as ApexAxisChartSeries)
            }
            type="bar"
          />
        </div>
      </div>
    </Card>
  );
};

export default ProductAvailability;
