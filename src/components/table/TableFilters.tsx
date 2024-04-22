/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import type { Column, Table } from "@tanstack/react-table";
import { Popover, TextInput } from "flowbite-react";
import { useSearchParams } from "react-router-dom";
import { MdFilterAlt } from "react-icons/md";
import { MdArrowUpward } from "react-icons/md";
import { MdArrowDownward } from "react-icons/md";
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
  table: Table<any>;
  setVisibleFilterColumn: (value: string) => void;
  visibleFilterColumn?: string;
};

export const TableFilters = ({
  column,
  table,
  setVisibleFilterColumn,
  visibleFilterColumn,
}: TableFiltersProps) => {
  const [filterValues, setFilterValues] = useState<ColumnFilters>({});
  const [sort, setSort] = useState<ColumnSort>({});
  const [searchParams, setSearchParams] = useSearchParams();

  const classNameActiveSortUp =
    column.id === sort.field && sort.direction === "ASC" ? "text-blue-800" : "";

  const classNameActiveSortDown =
    column.id === sort.field && sort.direction === "DESC"
      ? "text-blue-800"
      : "";

  const classNameActiveFilter = Object.prototype.hasOwnProperty.call(
    filterValues,
    column.id,
  )
    ? "text-blue-800"
    : "";

  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

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

    if (typeof firstValue === "number") {
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
              onBlur={updateSearchParams}
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
              onBlur={updateSearchParams}
            />
          </div>
        </div>
      );
    }

    if (typeof firstValue === "string") {
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
              onBlur={updateSearchParams}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex items-center gap-1 pl-2">
      {column.columnDef.enableColumnFilter && (
        <div>
          <Popover
            aria-labelledby="area-popover"
            open={visibleFilterColumn === column.id}
            placement="bottom"
            className="!top-10 z-10 rounded-lg bg-white"
            arrow={false}
            content={renderTableFilters()}
          >
            <MdFilterAlt
              size="16"
              cursor="pointer"
              className={classNameActiveFilter}
              onClick={() => {
                if (visibleFilterColumn === column.id) {
                  setVisibleFilterColumn("");
                } else {
                  setVisibleFilterColumn(column.id);
                }
              }}
            />
          </Popover>
        </div>
      )}
      {column.columnDef.enableSorting && (
        <div>
          <MdArrowUpward
            className={classNameActiveSortUp}
            cursor="pointer"
            onClick={() => handleChangeColumnSort(column.id, "ASC")}
          />
          <MdArrowDownward
            className={classNameActiveSortDown}
            cursor="pointer"
            onClick={() => handleChangeColumnSort(column.id, "DESC")}
          />
        </div>
      )}
    </div>
  );
};
