import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Button } from "flowbite-react";
import classNames from "classnames";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps {
  options: SelectOption[];
  selectedOption?: SelectOption;
  isFullWidth?: boolean;
  placeholder?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  setSelectedOption: (option: SelectOption) => void;
  renderButtonText?: (option: SelectOption) => string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  placeholder,
  position = "top-left",
  renderButtonText = (option: SelectOption) => {
    return option.label;
  },
}) => {
  console.log("🚀 ~ selectedOption:", selectedOption);
  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      {({ open }) => (
        <div className="relative ">
          <Listbox.Button as="span">
            <Button color="gray">
              {selectedOption?.label
                ? renderButtonText(selectedOption)
                : placeholder}
              <span className="ml-2">
                {open ? <HiChevronUp /> : <HiChevronDown />}
              </span>
            </Button>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className={classNames(
                "z-50 absolute top-full translate-y-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700",
                {
                  "left-0": position === "top-left",
                  "right-0": position === "top-right",
                  "left-0 bottom-full top-auto": position === "bottom-left",
                  "right-0 bottom-full top-auto": position === "bottom-right",
                },
              )}
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option}
                    className={({ active }) =>
                      `block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${active ? "text-bold" : ""}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        {selected ? (
                          <strong>{option.label}</strong>
                        ) : (
                          option.label
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </ul>
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};
