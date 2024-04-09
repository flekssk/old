import type { CustomFlowbiteTheme } from "flowbite-react";

export const theme: CustomFlowbiteTheme = {
  datepicker: {
    views: {
      days: {
        items: {
          item: {
            selected:
              "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 dark:text-white dark:hover:bg-gray-600 bg-blue-700 text-white hover:bg-blue-600",
          },
        },
      },
    },
  },
};
