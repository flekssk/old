/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import { useSidebarContext } from "../context/SidebarContext";
import isSmallScreen from "../helpers/is-small-screen";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "./auth/AuthProvider";

const ExampleNavbar: FC = function () {
  const { isOpenOnSmallScreens, isPageWithSidebar, setOpenOnSmallScreens } =
    useSidebarContext();

  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isPageWithSidebar && (
              <button
                onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
                className="mr-3 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:inline"
              >
                <span className="sr-only">Toggle sidebar</span>
                {isOpenOnSmallScreens && isSmallScreen() ? (
                  <HiX className="size-6" />
                ) : (
                  <HiMenuAlt1 className="size-6" />
                )}
              </button>
            )}
            <Navbar.Brand href="/">
              <img
                alt=""
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-8"
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                Truestat
              </span>
            </Navbar.Brand>
          </div>
          <div className="flex items-center lg:gap-3">
            <div className="hidden lg:block">
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

const UserDropdown: FC = function () {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { email, name } = profile || {};
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span>
          <span className="sr-only">Пользовательское меню</span>
          <Avatar
            alt=""
            img="../images/users/neil-sims.png"
            rounded
            size="sm"
          />
        </span>
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">{name}</span>
        <span className="block truncate text-sm font-medium">{email}</span>
      </Dropdown.Header>
      <Dropdown.Item
        onClick={() => {
          navigate(ROUTES.settingsProfile);
        }}
      >
        Настройки
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        onClick={() => {
          navigate(ROUTES.logout);
        }}
      >
        Выход
      </Dropdown.Item>
    </Dropdown>
  );
};

export default ExampleNavbar;
