import type { Stocks } from "@/api/report/types";
import type { MultiSelectOption } from "@/components/MultiSelect";
import { MultiSelect } from "@/components/MultiSelect";
import { Toggle } from "@/components/Toggle";
import { Button, useThemeMode } from "flowbite-react";
import { useState, type FC, useMemo } from "react";
import Chart from "react-apexcharts";

type ProductAvailabilityProps = {
  stocks: Stocks[];
};

const OTHER_WAREHOUSES = "Остальные склады";
const ALL_WAREHOUSES = "Все склады";

const ProductAvailability: FC<ProductAvailabilityProps> = ({ stocks }) => {
  const [showSizes, setShowSizes] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<
    MultiSelectOption[]
  >([]);

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

    const mainWarehouses = Object.keys(warehouseCounts).filter(
      (warehouseName) =>
        ((warehouseCounts[warehouseName] as number) / allStocks) * 100 > 3,
    );

    const otherWarehouseCount = Object.keys(warehouseCounts)
      .filter((warehouseName) => !mainWarehouses.includes(warehouseName))
      .reduce(
        (acc, warehouseName) =>
          acc + (warehouseCounts[warehouseName] as number),
        0,
      );

    const sortedWarehouses = mainWarehouses.reduce(
      (acc, warehouseName) => {
        acc[warehouseName] = warehouseCounts[warehouseName] as number;
        return acc;
      },
      {} as Record<string, number>,
    );

    if (otherWarehouseCount > 0) {
      sortedWarehouses[OTHER_WAREHOUSES] = otherWarehouseCount;
    }

    return Object.keys(sortedWarehouses).sort(
      (a, b) =>
        (sortedWarehouses[b] as number) - (sortedWarehouses[a] as number),
    );
  }, [stocks]);

  const categories = [...displayWarehouseNames];

  const categoriesOptions = categories.map((value) => ({
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
      categories:
        selectedCategories.length > 0
          ? selectedCategories.map((option) => option.value)
          : categories,
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

  const filteredStocks = useMemo(() => {
    if (
      selectedCategories.length === 0 ||
      selectedCategories.some((category) => category.value === ALL_WAREHOUSES)
    ) {
      return stocks;
    }
    return stocks.filter((stock) => {
      if (
        selectedCategories.some(
          (category) => category.value === OTHER_WAREHOUSES,
        )
      ) {
        return !displayWarehouseNames.includes(stock.warehouseName);
      }
      return selectedCategories.some(
        (category) => category.value === stock.warehouseName,
      );
    });
  }, [stocks, selectedCategories, displayWarehouseNames]);

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
        const categoriesAvailable =
          selectedCategories.length > 0
            ? selectedCategories.map((option) => option.value)
            : categories;
        if (!acc.name) {
          acc.name = "Все размеры";
          acc.data = categoriesAvailable.map(
            (category) =>
              (filteredStockBySize[item] as Record<string, number>)[category] ??
              0,
          );
        } else {
          categoriesAvailable.forEach((category, index) => {
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

  const handleCategoryChange = (selectedOptions: MultiSelectOption[]) => {
    const uniqueOptions = selectedOptions.reduce<MultiSelectOption[]>(
      (acc, option) => {
        const exists = acc.find((o) => o.value === option.value);
        return exists
          ? acc.filter((o) => o.value !== option.value)
          : [...acc, option];
      },
      [],
    );
    setSelectedCategories(uniqueOptions);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        <div className="flex gap-3">
          <MultiSelect
            placeholder="Все склады"
            selectedOptions={selectedCategories}
            options={categoriesOptions || []}
            setSelectedOptions={handleCategoryChange}
            multiple
          />
          <Toggle
            position="right"
            checked={showSizes}
            label="Показывать по размерам"
            onChange={(e) => {
              setShowSizes(e.target.checked);
            }}
          />
          <Button size="sm" onClick={() => setSelectedCategories([])}>
            Сбросить
          </Button>
        </div>
      </div>
      <div className="">
        <Chart
          height={350}
          options={options}
          series={
            showSizes ? seriesBySize : (seriesAllSize as ApexAxisChartSeries)
          }
          type="bar"
        />
      </div>
    </div>
  );
};

export default ProductAvailability;
