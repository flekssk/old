/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames";
import { Sidebar, Tooltip } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { HiAdjustments, HiCog, HiOutlineClock, HiUser } from "react-icons/hi";

import { useSidebarContext } from "../context/SidebarContext";
import isSmallScreen from "../helpers/is-small-screen";
import { ROUTES } from "@/constants/routes";

const ExampleSidebar: FC = function () {
  const { isOpenOnSmallScreens } = useSidebarContext();

  const [currentPage, setCurrentPage] = useState("");
  const [isAccountOpen, setAccountOpen] = useState(true);

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
    setAccountOpen(newPage.includes("/account/"));
  }, [setCurrentPage, setAccountOpen]);

  return (
    <div
      className={classNames("lg:!block relative", {
        hidden: !isOpenOnSmallScreens,
      })}
    >
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        collapsed={isOpenOnSmallScreens && !isSmallScreen()}
      >
        <div className="flex h-full flex-col justify-between py-2">
          <div>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  href="/"
                  icon={HiOutlineClock}
                  className={
                    "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                  }
                >
                  Оцировка
                </Sidebar.Item>
                <Sidebar.Collapse
                  icon={HiUser}
                  label="Аккаунт"
                  open={isAccountOpen}
                >
                  <Sidebar.Item
                    href={ROUTES.apiKeys}
                    className={
                      ROUTES.apiKeys === currentPage
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }
                  >
                    API ключи
                  </Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Item
                  href={ROUTES.unitTable}
                  icon={HiOutlineClock}
                  className={
                    ROUTES.unitTable === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Unit экономика
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
          {/* <BottomMenu /> */}
        </div>
      </Sidebar>
    </div>
  );
};

const BottomMenu: FC = function () {
  return (
    <div className="flex items-center justify-center gap-x-5">
      <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
        <span className="sr-only">Tweaks</span>
        <HiAdjustments className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " />
      </button>
      <div>
        <Tooltip content="Settings page">
          <a
            href="/users/settings"
            className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Settings page</span>
            <HiCog className="text-2xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
          </a>
        </Tooltip>
      </div>
    </div>
  );
};

export default ExampleSidebar;
