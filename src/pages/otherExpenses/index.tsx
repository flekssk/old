import { useSearchParams } from "react-router-dom";
import { useRef, useEffect } from "react";
import { Breadcrumb, Tabs, type TabsRef } from "flowbite-react";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { HiHome } from "react-icons/hi";
import { ExpensesCategories } from "./ExpenseCategories";
import { Expenses } from "./Expenses";

const TABS = {
  expenses: 0,
  expensesCategories: 1,
} as const;

type TabsType = typeof TABS;
type TabsState = TabsType[keyof TabsType];

export const TABS_TITLES = {
  [TABS.expenses]: "Расходы",
  [TABS.expensesCategories]: "Статьи",
} as const;

const OtherExpenses = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    tab: TABS.expenses.toString(),
  });

  const tabsRef = useRef<TabsRef>(null);

  const activeTab = searchParams.get("tab")
    ? parseInt(searchParams.get("tab") ?? "0")
    : TABS.expenses;

  useEffect(() => {
    tabsRef.current?.setActiveTab(activeTab);
  }, [activeTab]);

  return (
    <NavbarSidebarLayout>
      <div className="mb-6 grid grid-cols-1 gap-y-6  dark:border-gray-700 dark:bg-gray-900 xl:grid-cols-2 xl:gap-4">
        <div className="col-span-full">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="#">
              <div className="flex items-center gap-x-3">
                <HiHome className="text-xl" />
                <span className="dark:text-white">Прочие расходы</span>
              </div>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/e-commerce/products">
              {TABS_TITLES[activeTab as TabsState]}
            </Breadcrumb.Item>
          </Breadcrumb>
          <Tabs
            aria-label="Tabs with underline"
            style="underline"
            ref={tabsRef}
            onActiveTabChange={(tab: number) =>
              setSearchParams({ tab: tab.toString() })
            }
          >
            <Tabs.Item title={TABS_TITLES[TABS.expenses]}>
              <Expenses />
            </Tabs.Item>
            <Tabs.Item title={TABS_TITLES[TABS.expensesCategories]}>
              <ExpensesCategories />
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default OtherExpenses;
