/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames";
import { Sidebar } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { HiOutlineClock, HiUser } from "react-icons/hi";

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

export default ExampleSidebar;
