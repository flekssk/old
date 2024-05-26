/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SetStateAction } from "react";
import { useState, useEffect } from "react";
import type { Column } from "@tanstack/react-table";
import { Popover, TextInput, Button } from "flowbite-react";
import { useSearchParams } from "react-router-dom";
import { HiSortDescending, HiSortAscending, HiFilter } from "react-icons/hi";

import { parse, stringify } from "qs";

type ColumnSort = {
  field?: string;
  direction?: string;
};

type NumberFilter = { min?: number; max?: number };

type TextFilter = { value: string };

type ColumnFilters = {
  [columnId: string]: NumberFilter | TextFilter;
};

type TableFiltersProps = {
  column: Column<any, unknown>;
  setVisibleFilterColumn: (value: string) => void;
  visibleFilterColumn?: string;
};

export const TableFilters = ({
  column,
  setVisibleFilterColumn,
  visibleFilterColumn,
}: TableFiltersProps) => {
  const [filterValues, setFilterValues] = useState<ColumnFilters>({});
  const [sort, setSort] = useState<ColumnSort>({});
  const [searchParams, setSearchParams] = useSearchParams();

  const filterType = column.columnDef.meta?.filterType;

  const sortDescActive = column.id === sort.field && sort.direction === "DESC";
  const sortAscActive = column.id === sort.field && sort.direction === "ASC";

  const isColumnFilterActive = Object.prototype.hasOwnProperty.call(
    filterValues,
    column.id,
  );

  const handleChangeColumnSort = (field: string, direction: string) => {
    if (field === sort.field && direction === sort.direction) {
      searchParams.delete("orderBy");
      setSearchParams(searchParams);
      setSort({});
    } else {
      searchParams.set("orderBy", stringify({ field, direction }));
      setSearchParams(searchParams);
      setSort({ field, direction });
    }
  };

  const handleChangeNumberFilter = (
    value: string,
    columnId: string,
    filter: string,
  ) => {
    const updatedFilters = { ...filterValues };

    if (filter === "min") {
      updatedFilters[columnId] = {
        ...updatedFilters[columnId],
        min: Number(value),
      };
    }

    if (filter === "max") {
      updatedFilters[columnId] = {
        ...updatedFilters[columnId],
        max: Number(value),
      };
    }

    setFilterValues(updatedFilters);
  };

  const handleChangeTextFilter = (value: string, columnId: string) => {
    const updatedFilters = { ...filterValues };

    updatedFilters[columnId] = {
      ...updatedFilters[columnId],
      value,
    };

    setFilterValues(updatedFilters);
  };

  const updateSearchParams = () => {
    const searchParams = new URLSearchParams();
    searchParams.set("filters", stringify(filterValues));
    setSearchParams(searchParams);
  };

  const handleOpenPopover = (isOpen: SetStateAction<boolean>) => {
    if (isOpen) {
      setVisibleFilterColumn(column.id);
    } else {
      setVisibleFilterColumn("");
    }
  };

  useEffect(() => {
    const searchParamsFilters = searchParams.get("filters");
    const searchParamsOrder = searchParams.get("orderBy");

    if (searchParamsFilters) {
      const parseFiltersValues = parse(searchParamsFilters);
      setFilterValues(parseFiltersValues as ColumnFilters);
    }

    if (searchParamsOrder) {
      const parseOrderValues = parse(searchParamsOrder);
      setSort(parseOrderValues);
    }
  }, [searchParams]);

  const renderTableFilters = () => {
    const columnFilters = filterValues[column.id];

    if (filterType === "number") {
      const numberFilters = columnFilters as NumberFilter;

      return (
        <div className="flex w-64 flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400">
          <div>
            <TextInput
              type="number"
              placeholder="Min"
              value={numberFilters?.min || ""}
              onChange={(e) => {
                handleChangeNumberFilter(e.target.value, column.id, "min");
              }}
            />
          </div>
          <div>
            <TextInput
              type="number"
              placeholder="Max"
              value={numberFilters?.max || ""}
              onChange={(e) =>
                handleChangeNumberFilter(e.target.value, column.id, "max")
              }
            />
          </div>
          <div>
            <Button size="xs" className="w-full" onClick={updateSearchParams}>
              Применить
            </Button>
          </div>
        </div>
      );
    }

    if (filterType === "string") {
      const textFilter = columnFilters as TextFilter;

      return (
        <div className="flex w-64 flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400">
          <div>
            <TextInput
              type="text"
              placeholder="Фильтр"
              value={textFilter?.value || ""}
              onChange={(e) =>
                handleChangeTextFilter(e.target.value, column.id)
              }
            />
          </div>
          <div>
            <Button size="xs" className="w-full" onClick={updateSearchParams}>
              Применить
            </Button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex items-center  gap-1 pl-2">
      {column.columnDef.enableColumnFilter && filterType && (
        <div>
          <Popover
            aria-labelledby="area-popover"
            open={visibleFilterColumn === column.id}
            placement="bottom"
            className="!top-10 z-30 rounded-lg border-2 border-gray-300 bg-white shadow-2xl"
            arrow={false}
            content={renderTableFilters()}
            onOpenChange={(isOpen) => handleOpenPopover(isOpen)}
          >
            <HiFilter
              size="16"
              cursor="pointer"
              style={{ color: `${isColumnFilterActive ? "black" : "gray"}` }}
            />
          </Popover>
        </div>
      )}
      {column.columnDef.enableSorting && (
        <div>
          {!sortDescActive && (
            <HiSortAscending
              cursor="pointer"
              size="16"
              style={{
                color: `${sortAscActive ? "black" : "gray"}`,
              }}
              onClick={() =>
                sortAscActive
                  ? handleChangeColumnSort(column.id, "DESC")
                  : handleChangeColumnSort(column.id, "ASC")
              }
            />
          )}
          {sortDescActive && (
            <HiSortDescending
              cursor="pointer"
              size="16"
              style={{ color: "black" }}
              onClick={() => handleChangeColumnSort(column.id, "DESC")}
            />
          )}
        </div>
      )}
    </div>
  );
};
