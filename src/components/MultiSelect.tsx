import { Fragment, useMemo, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { HiChevronDown, HiCheck, HiChevronUp } from "react-icons/hi";
import { cn } from "@/utils/utils";

export type MultiSelectOption = {
  label: string;
  value: string | number;
  searchValues?: string[];
};

type MultiSelectProps = {
  placeholder: string;
  options: MultiSelectOption[];
  selectedOptions?: MultiSelectOption[];
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  setSelectedOptions: (options: MultiSelectOption[]) => void;
};

const getDisplayValues = (options: MultiSelectOption[]) =>
  options.map((option) => option.label).join(", ");

export const MultiSelect = ({
  placeholder,
  options,
  selectedOptions,
  position,
  setSelectedOptions,
}: MultiSelectProps) => {
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
    <Combobox value={selectedOptions} onChange={setSelectedOptions} multiple>
      {({ open }) => (
        <div className="relative">
          <div>
            <Combobox.Input
              className="rounded-lg border border-gray-200 py-2.5 pl-3 pr-10 text-sm font-medium text-gray-900"
              placeholder={placeholder}
              displayValue={getDisplayValues}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-4">
              {open ? <HiChevronUp /> : <HiChevronDown />}
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className={cn(
                "z-50 absolute max-h-screen overflow-y-auto top-full translate-y-2 bg-white divide-y divide-gray-100 rounded-lg shadow min-w-full dark:bg-gray-700",
                {
                  "left-0": position === "top-left",
                  "right-0": position === "top-right",
                  "left-0 bottom-full top-auto": position === "bottom-left",
                  "right-0 bottom-full top-auto": position === "bottom-right",
                },
              )}
            >
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Нет данных
                </div>
              ) : (
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {filteredOptions.map((option) => {
                    const isSelected = selectedOptions?.some(
                      (selectedOption) => selectedOption.value === option.value,
                    );

                    return (
                      <Combobox.Option
                        key={option.value}
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
                      </Combobox.Option>
                    );
                  })}
                </ul>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      )}
    </Combobox>
  );
};
