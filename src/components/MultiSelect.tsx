import { Fragment, useMemo, useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { HiChevronDown, HiCheck, HiChevronUp } from "react-icons/hi";
import type { DateRange } from "react-day-picker";
import type { AnchorProps } from "@headlessui/react/dist/internal/floating";

export type MultiSelectOption = {
  label: string;
  value: string | number | DateRange;
  searchValues?: string[];
};

type MultiSelectProps<T> = {
  placeholder: string;
  options: MultiSelectOption[];
  selectedOptions?: T;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  multiple?: boolean;
  anchor?: AnchorProps;
  setSelectedOptions: (options: T) => void;
};

const getDisplayValues = (options: MultiSelectOption | MultiSelectOption[]) => {
  if (Array.isArray(options)) {
    return options?.map((option) => option.label).join(", ");
  }

  return options.label;
};

export function MultiSelect<T extends MultiSelectOption | MultiSelectOption[]>({
  placeholder,
  options,
  selectedOptions,
  multiple = false,
  anchor = "bottom",
  setSelectedOptions,
}: MultiSelectProps<T>) {
  const [query, setQuery] = useState("");

  const optionsForSearch = useMemo(() => {
    return options.map((item) => {
      const searchValues = item.searchValues ?? [
        item.value.toString(),
        item.label.toString(),
      ];
      return {
        ...item,
        searchValues: searchValues.map((el) => el.toLowerCase()),
      };
    });
  }, [options]);

  const filteredOptions =
    query === ""
      ? options
      : optionsForSearch.filter(({ searchValues }) =>
          searchValues.some((val) =>
            val
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, "")),
          ),
        );

  return (
    <Combobox
      value={selectedOptions}
      onChange={setSelectedOptions}
      multiple={multiple}
    >
      {({ open }) => (
        <div className="relative">
          <div>
            <ComboboxInput
              className="rounded-lg border border-gray-200 py-2.5 pl-3 pr-10 text-sm font-medium text-gray-900"
              placeholder={placeholder}
              displayValue={getDisplayValues}
              onChange={(event) => setQuery(event.target.value)}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-4">
              {open ? <HiChevronUp /> : <HiChevronDown />}
            </ComboboxButton>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions
              className="mt-1 rounded-lg bg-white shadow empty:hidden dark:bg-gray-700"
              anchor={anchor}
            >
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Нет данных
                </div>
              ) : (
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {filteredOptions.map((option, index) => {
                    const isSelected = Array.isArray(selectedOptions)
                      ? selectedOptions?.some(
                          (selectedOption) =>
                            selectedOption.value === option.value,
                        )
                      : selectedOptions?.value === option.value;

                    return (
                      <ComboboxOption
                        key={index}
                        className={({ active }) =>
                          `block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${active ? "text-bold" : ""}`
                        }
                        value={option}
                      >
                        {() => (
                          <div className="flex">
                            {isSelected && (
                              <span
                                className={`inset-y-0 left-0 flex items-center pr-1 text-blue-700`}
                              >
                                <HiCheck
                                  className="size-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                            <span
                              className={`block truncate ${
                                isSelected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {option.label}
                            </span>
                          </div>
                        )}
                      </ComboboxOption>
                    );
                  })}
                </ul>
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      )}
    </Combobox>
  );
}
