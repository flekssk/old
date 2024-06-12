import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: "left" | "right";
};

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ${
        isOpen
          ? "translate-x-0"
          : position === "right"
            ? "translate-x-full"
            : "-translate-x-full"
      }`}
    >
      <div
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={`fixed top-0 ${position}-0 h-full w-80 overflow-auto bg-white shadow-lg`}
      >
        <div className="flex items-center justify-between border-b p-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <MdClose size={24} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;