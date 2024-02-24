import React from "react";

type UniverseModalWindowPropsType = {
  isActive: boolean;
  setActive: (active: boolean) => void;
  children?: React.ReactNode;
};

export const UniverseModalWindow = ({
  isActive,
  setActive,
  children,
}: UniverseModalWindowPropsType) => {
  return (
    <div
      className={
        isActive
          ? "h-screen w-screen fixed top-0 left-0 flex items-center  bg-transparent justify-center duration-500 opacity-100 pointer-events-auto z-50"
          : "h-screen w-screen fixed top-0 left-0 flex items-center justify-center opacity-0 duration-500 pointer-events-none"
      }
      onClick={() => setActive(false)}
      role="button"
      aria-hidden
    >
      <div
        className={
          isActive
            ? "rounded-xl bg-white scale-100 duration-500 cursor-default border-2 border-gray-200"
            : "scale-50 rounded-xl bg-white duration-500 cursor-default"
        }
        onClick={(e) => e.stopPropagation()}
        role="button"
        aria-hidden
      >
        {children}
      </div>
    </div>
  );
};
