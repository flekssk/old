/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames";
import { Sidebar } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiCalculator,
  HiCode,
  HiUser,
  HiUsers,
  HiViewGrid,
} from "react-icons/hi";

import { useSidebarContext } from "@/context/SidebarContext";
import isSmallScreen from "../helpers/is-small-screen";
import { ROUTES } from "@/constants/routes";
import { Link } from "react-router-dom";
import { useUserProfile } from "@/api/user";
import { UserRolesVariant } from "@/api/auth/constants";
import { SiAdminer } from "react-icons/si";
import { MdAdminPanelSettings } from "react-icons/md";

const ExampleSidebar: FC = function () {
  const userProfile = useUserProfile();
  const isUserAdmin = userProfile.data?.roles.includes(
    UserRolesVariant.ROLE_ADMIN,
  );
  const {
    isOpenOnSmallScreens,
    isAdminPanelCollapsed,
    toggleCollapseAdminPanel,
  } = useSidebarContext();

  const [currentPage, setCurrentPage] = useState("");
  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

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
                  as={Link}
                  to="/"
                  icon={HiViewGrid}
                  className={
                    "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                  }
                >
                  Оцифровка
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  to={ROUTES.week}
                  icon={HiViewGrid}
                  className={
                    ROUTES.week === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  По неделям
                </Sidebar.Item>

                <Sidebar.Item
                  as={Link}
                  to={ROUTES.cost}
                  icon={HiCalculator}
                  className={
                    ROUTES.cost === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Себестоимость
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  to="/settings/profile"
                  icon={HiUser}
                  className={
                    ROUTES.settingsProfile === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Настройки
                </Sidebar.Item>
                {isUserAdmin && (
                  <Sidebar.Collapse
                    onClick={toggleCollapseAdminPanel}
                    open={isAdminPanelCollapsed}
                    icon={MdAdminPanelSettings}
                    label="Панель Администратора"
                    className="text-xs"
                  >
                    <Sidebar.Item
                      as={Link}
                      icon={SiAdminer}
                      to={ROUTES.adminPanel}
                      className={
                        ROUTES.adminPanel === currentPage
                          ? "bg-gray-100 dark:bg-gray-700"
                          : ""
                      }
                    >
                      Пакеты подписок
                    </Sidebar.Item>
                    <Sidebar.Item
                      as={Link}
                      icon={HiUsers}
                      to={ROUTES.usersList}
                      className={
                        ROUTES.usersList === currentPage
                          ? "bg-gray-100 dark:bg-gray-700"
                          : ""
                      }
                    >
                      Пользователи
                    </Sidebar.Item>
                    <Sidebar.Item
                      as={Link}
                      icon={HiCode}
                      to={ROUTES.tasksQueue}
                      className={
                        ROUTES.tasksQueue === currentPage
                          ? "bg-gray-100 dark:bg-gray-700"
                          : ""
                      }
                    >
                      Очередь команд
                    </Sidebar.Item>
                  </Sidebar.Collapse>
                )}
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
