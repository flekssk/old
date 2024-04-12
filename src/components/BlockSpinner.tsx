import { cn } from "@/utils/utils";
import { Spinner } from "flowbite-react";
import { FC } from "react";

type BlockSpinnerProps = {
  height?: string;
  isAbsolute?: boolean;
};

export const BlockSpinner: FC<BlockSpinnerProps> = (
  { height, isAbsolute } = { height: "h-96" },
) => {
  return (
    <div
      className={cn("flex justify-center items-center bg-white bg-opacity-35", {
        [height ?? ""]: !isAbsolute,
        "absolute top-0 bottom-0 left-0 right-0": isAbsolute,
      })}
    >
      <Spinner aria-label="Loading data" />;
    </div>
  );
};
