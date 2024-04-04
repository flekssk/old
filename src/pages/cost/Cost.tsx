import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import type { TabsRef } from "flowbite-react";
import { Breadcrumb, Tabs } from "flowbite-react";
import { useRef, type FC, useState } from "react";
import { HiHome } from "react-icons/hi";
import { CostByArticle } from "./CostByArticle";
import ProfileSubscriptionInfo from "@/components/ProfileSubscriptionInfo";

const TABS = {
  byArticle: 0,
  byIncome: 1,
} as const;

type TabsType = typeof TABS;
type TabsState = TabsType[keyof TabsType];

export const TABS_TITLES = {
  [TABS.byArticle]: "По артикулам",
  [TABS.byIncome]: "По поставкам",
} as const;

export const Cost: FC = () => {
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState<TabsState>(TABS.byArticle);

  return (
    <NavbarSidebarLayout>
      <ProfileSubscriptionInfo>
        <div className="mb-6 grid grid-cols-1 gap-y-6 px-4 pt-6 dark:border-gray-700 dark:bg-gray-900 xl:grid-cols-2 xl:gap-4">
          <div className="col-span-full">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="/">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Себистоимость</Breadcrumb.Item>
            </Breadcrumb>
            <Tabs
              aria-label="Tabs with underline"
              style="underline"
              ref={tabsRef}
              onActiveTabChange={(tab: number) =>
                setActiveTab(tab as TabsState)
              }
            >
              <Tabs.Item title={TABS_TITLES[TABS.byArticle]}>
                {activeTab === TABS.byArticle ? <CostByArticle /> : null}
              </Tabs.Item>
              <Tabs.Item title={TABS_TITLES[TABS.byIncome]}></Tabs.Item>
            </Tabs>
          </div>
        </div>
      </ProfileSubscriptionInfo>
    </NavbarSidebarLayout>
  );
};
