import { useState, type FC, useRef } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Tabs, type TabsRef } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { ApiKeys } from "./apiKeys/ApiKeys";

const TABS = {
  profile: 0,
  apiKeys: 1,
} as const;

type TabsType = typeof TABS;
type TabsState = TabsType[keyof TabsType];

export const TABS_TITLES = {
  [TABS.profile]: "Профиль",
  [TABS.apiKeys]: "API ключи",
} as const;

export const Settings: FC = () => {
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState<TabsState>(TABS.profile);
  console.log("🚀 ~ activeTab:", activeTab);
  return (
    <NavbarSidebarLayout>
      <div className="mb-6 grid grid-cols-1 gap-y-6 px-4 pt-6 dark:border-gray-700 dark:bg-gray-900 xl:grid-cols-2 xl:gap-4">
        <div className="col-span-full">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="#">
              <div className="flex items-center gap-x-3">
                <HiHome className="text-xl" />
                <span className="dark:text-white">Настройки</span>
              </div>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/e-commerce/products">
              {TABS_TITLES[activeTab]}
            </Breadcrumb.Item>
          </Breadcrumb>
          <Tabs
            aria-label="Tabs with underline"
            style="underline"
            ref={tabsRef}
            onActiveTabChange={(tab: number) => setActiveTab(tab as TabsState)}
          >
            <Tabs.Item title={TABS_TITLES[TABS.profile]}>Profile</Tabs.Item>
            <Tabs.Item title={TABS_TITLES[TABS.apiKeys]}>
              {activeTab === TABS.apiKeys ? <ApiKeys /> : null}
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};
