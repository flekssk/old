import {
  useState,
  type FC,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button, Tabs, type TabsRef } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { ApiKeys } from "./apiKeys/ApiKeys";
import type { SelectOption } from "@/components/Select";
import { Select } from "@/components/Select";
import { useReportTaxation, useUserProfile } from "@/api/user";
import type { UserProfileResponse } from "@/api/user/types";
import { updateUserProfile } from "@/api/user/api";

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
  const [profile, setProfile] = useState<UserProfileResponse | undefined>();
  const [userTaxation, setUserTaxation] = useState<SelectOption>();

  const reportTaxationRequest = useReportTaxation();
  const { data } = useUserProfile();

  const dateFilterOptions = useMemo(() => {
    return reportTaxationRequest?.data?.map((el) => ({
      value: el.id,
      label: el.title,
    }));
  }, [reportTaxationRequest?.data]);

  const checkIsProfile = useCallback(() => {
    setProfile(data);
  }, [data]);

  const saveUserTaxation = useCallback(async () => {
    const taxationTypeId = userTaxation?.value;
    await updateUserProfile({ taxationTypeId: taxationTypeId as number });
  }, [userTaxation?.value]);

  useEffect(() => {
    const taxation = dateFilterOptions?.find(
      (item) => item.value === profile?.taxationTypeId,
    );
    setUserTaxation(taxation);
  }, [dateFilterOptions, profile?.taxationTypeId]);

  useEffect(() => {
    checkIsProfile();
  }, [checkIsProfile]);

  return (
    <NavbarSidebarLayout>
      <div className="mb-6 grid h-[70vh] grid-cols-1 gap-y-6 px-4 pt-6 dark:border-gray-700 dark:bg-gray-900 xl:grid-cols-2 xl:gap-4">
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
            <Tabs.Item title={TABS_TITLES[TABS.profile]}>
              <div className="flex flex-col gap-3">
                <p>Profile</p>
                <div className="flex flex-col gap-5">
                  <p>Выбор нологовой ставки</p>
                  <Select
                    selectedOption={{
                      value: userTaxation?.value || "",
                      label: userTaxation?.label || "",
                    }}
                    options={dateFilterOptions || []}
                    setSelectedOption={(option) => {
                      setUserTaxation(option);
                    }}
                    placeholder="Выбор нологовой ставки"
                  />
                  <div>
                    <Button onClick={saveUserTaxation} color="primary">
                      Сохранить
                    </Button>
                  </div>
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item title={TABS_TITLES[TABS.apiKeys]}>
              {activeTab === TABS.apiKeys ? <ApiKeys /> : null}
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};
