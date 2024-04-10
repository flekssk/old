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
  const handleOuterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setActive(false);
    }
  };

  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={
        isActive
          ? "pointer-events-auto fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-transparent opacity-100 duration-500"
          : "pointer-events-none fixed left-0 top-0 flex h-screen w-screen items-center justify-center opacity-0 duration-500"
      }
      onMouseDown={handleOuterClick}
      role="button"
      aria-hidden
    >
      <div
        className={
          isActive
            ? "scale-100 cursor-default rounded-xl border-2 border-gray-200 bg-white duration-500"
            : "scale-50 cursor-default rounded-xl bg-white duration-500"
        }
        onClick={handleInnerClick}
        role="button"
        aria-hidden
      >
        {children}
      </div>
    </div>
  );
};
