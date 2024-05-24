import type { Stocks } from "@/api/report/types";
import type { SelectOption } from "@/components/Select";
import { Select } from "@/components/Select";
import { Toggle } from "@/components/Toggle";
import { Card, useThemeMode } from "flowbite-react";
import { useState, type FC, useMemo } from "react";
import Chart from "react-apexcharts";

type ProductAvailabilityProps = {
  stocks: Stocks[];
};

const OTHER_WAREHOUSES = "Остальные склады";
const ALL_WARHOUSES = "Все склады";
const DEFAULT_OPTION = {
  label: ALL_WARHOUSES,
  value: ALL_WARHOUSES,
};

const ProductAvailability: FC<ProductAvailabilityProps> = ({ stocks }) => {
  const [showSizes, setShowSizes] = useState<boolean>(false);
  const [selectCategory, setSelectCategory] =
    useState<SelectOption>(DEFAULT_OPTION);

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

  const categories = [
    OTHER_WAREHOUSES,
    ...Object.values(displayWarehouseNames),
  ];

  const categoriesOptions = [ALL_WARHOUSES, ...categories].map((value) => ({
    label: value,
    value,
  }));

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

  const filteredStocks = stocks.filter((stock) => {
    if (selectCategory.value === ALL_WARHOUSES) {
      return true;
    }
    if (selectCategory.value === OTHER_WAREHOUSES) {
      return !displayWarehouseNames.includes(stock.warehouseName);
    }
    return stock.warehouseName === selectCategory.value;
  });

  const filteredStockBySize = filteredStocks.reduce(
    (acc, item) => {
      if (!acc[item.size]) {
        acc[item.size] = {};
      }

      const bySize = acc[item.size] as Record<string, number>;
      const warehouseId = displayWarehouseNames.includes(item.warehouseName)
        ? item.warehouseName
        : OTHER_WAREHOUSES;
      if (!bySize[warehouseId]) {
        bySize[warehouseId] = 0;
      }
      bySize[warehouseId] += item.quantity;

      return acc;
    },
    {} as Record<string, Record<string, number>>,
  );

  const seriesBySize = Object.keys(filteredStockBySize).map((size) => ({
    name: size,
    data: categories.map(
      (category) =>
        (filteredStockBySize[size] as Record<string, number>)[category] ?? 0,
    ),
  })) as ApexAxisChartSeries;

  const seriesAllSize = [
    Object.keys(filteredStockBySize).reduce(
      (acc, item) => {
        if (!acc.name) {
          acc.name = "Все размеры";
          acc.data = categories.map(
            (category) =>
              (filteredStockBySize[item] as Record<string, number>)[category] ??
              0,
          );
        } else {
          categories.forEach((category, index) => {
            const val =
              ((filteredStockBySize[item] as Record<string, number>)[
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
            <Select
              placeholder="Все склады"
              selectedOption={{
                label: selectCategory?.label || "",
                value: selectCategory?.value || "",
              }}
              options={categoriesOptions || []}
              setSelectedOption={setSelectCategory}
            />
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
