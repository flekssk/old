import classNames from "classnames";
import { FC } from "react";

export type ToggleProps = {
  label: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  position?: "left" | "right";
};

export const Toggle: FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  position = "left",
}) => {
  const renderedLabel = (
    <span
      className={classNames(
        "text-sm font-medium text-gray-900 dark:text-gray-300",
        {
          "ms-3 ": position === "left",
          "me-3": position === "right",
        },
      )}
    >
      {label}
    </span>
  );
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        value=""
        className="peer sr-only"
        checked={checked}
        onChange={onChange}
      />
      {position === "right" ? renderedLabel : null}
      <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
      {position === "left" ? renderedLabel : null}
    </label>
  );
};
