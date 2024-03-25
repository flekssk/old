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
          ? "pointer-events-auto fixed left-0 top-0 z-50 flex h-screen  w-screen items-center justify-center bg-transparent opacity-100 duration-500"
          : "pointer-events-none fixed left-0 top-0 flex h-screen w-screen items-center justify-center opacity-0 duration-500"
      }
      onClick={() => setActive(false)}
      role="button"
      aria-hidden
    >
      <div
        className={
          isActive
            ? "scale-100 cursor-default rounded-xl border-2 border-gray-200 bg-white duration-500"
            : "scale-50 cursor-default rounded-xl bg-white duration-500"
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
