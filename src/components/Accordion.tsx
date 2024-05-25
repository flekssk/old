import { useState, type PropsWithChildren } from "react";

type Props = {
  title: string;
  id: string;
};

export const Accordion = ({
  title,
  id,
  children,
}: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    const storedState = localStorage.getItem(`accordion-${id}`);
    return storedState === "true";
  });

  const handleSetIsOpen = () => {
    localStorage.setItem(`accordion-${id}`, (!isOpen).toString());
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        id="accordion-collapse"
        data-accordion="collapse"
        className="h-fit divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white dark:divide-gray-700 dark:border-gray-700"
      >
        <h2 id="accordion-collapse-heading-1">
          <button
            type="button"
            className="flex w-full items-center justify-between p-5 text-left font-medium text-black first:rounded-t-lg last:rounded-b-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
            data-accordion-target="#accordion-collapse-body-1"
            aria-expanded="true"
            aria-controls="accordion-collapse-body-1"
            onClick={handleSetIsOpen}
          >
            <span>{title}</span>
            <svg
              data-accordion-icon
              className="size-3 shrink-0 rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-1"
          className={`bg-white p-5 first:rounded-t-lg last:rounded-b-lg dark:bg-gray-900 ${isOpen ? "" : "hidden"}`}
          aria-labelledby="accordion-collapse-heading-1"
        >
          {children}
        </div>
      </div>
    </>
  );
};
