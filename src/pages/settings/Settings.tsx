import { useState, type FC, useRef, useEffect } from "react";
import { Breadcrumb, Button, Tabs, type TabsRef } from "flowbite-react";

import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { ApiKeys } from "./apiKeys/ApiKeys";
import { Select } from "@/components/Select";
import {
  useReportTaxation,
  useSaveUserTaxationMutation,
  useUserProfile,
} from "@/api/user";
import type { UserProfileResponse } from "@/api/user/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { HiHome } from "react-icons/hi";
import { Controller, useForm } from "react-hook-form";
import { ServerSuccess } from "@/components/ServerSuccess";
import { ServerError } from "@/components/ServerError";
import { useSearchParams } from "react-router-dom";
import { Subscriptions } from "./Subscriptions";

const formSchema = z.object({
  taxationTypeId: z.object({
    id: z.number(),
    title: z.string(),
  }),
});

const TABS = {
  profile: 0,
  apiKeys: 1,
  subscriptions: 2,
} as const;

type TabsType = typeof TABS;
type TabsState = TabsType[keyof TabsType];
type FormSchema = z.infer<typeof formSchema>;

export const TABS_TITLES = {
  [TABS.profile]: "Профиль",
  [TABS.apiKeys]: "API ключи",
  [TABS.subscriptions]: "Подписки",
} as const;

export const Settings: FC = () => {
  const tabsRef = useRef<TabsRef>(null);

  const resetTaxationMutation = useSaveUserTaxationMutation();

  const [searchParams, setSearchParams] = useSearchParams({
    tab: TABS.profile.toString(),
  });
  const activeTab = searchParams.get("tab")
    ? parseInt(searchParams.get("tab") ?? "0")
    : TABS.profile;

  useEffect(() => {
    tabsRef.current?.setActiveTab(activeTab);
  }, [activeTab]);

  const [profile, setProfile] = useState<UserProfileResponse | undefined>();

  const reportTaxationRequest = useReportTaxation();
  const userProfile = useUserProfile();

  const taxation = reportTaxationRequest?.data?.find(
    (item) => item.id === profile?.taxationTypeId,
  );

  const isLoading = resetTaxationMutation.status === "pending";

  const { control, handleSubmit, setValue } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    const taxationTypeId = data.taxationTypeId.id;
    await resetTaxationMutation.mutateAsync({ taxationTypeId: taxationTypeId });
    userProfile.refetch();
  };

  useEffect(() => {
    setProfile(userProfile.data);
  }, [userProfile.data]);

  useEffect(() => {
    setValue("taxationTypeId", {
      id: taxation?.id || 0,
      title: taxation?.title || "",
    });
  }, [taxation, setValue]);

  return (
    <NavbarSidebarLayout>
      <div className="mb-6 grid h-[70vh] grid-cols-1 gap-y-6  dark:border-gray-700 dark:bg-gray-900 xl:grid-cols-2 xl:gap-4">
        <div className="col-span-full">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="#">
              <div className="flex items-center gap-x-3">
                <HiHome className="text-xl" />
                <span className="dark:text-white">Настройки</span>
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
            <Tabs.Item title={TABS_TITLES[TABS.profile]}>
              <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-5">
                  <p>Выбор налоговой ставки</p>
                  <Controller
                    name="taxationTypeId"
                    control={control}
                    render={({ field: { value } }) => (
                      <Select
                        selectedOption={{
                          value: value?.id || taxation?.id || "",
                          label: value?.title || taxation?.title || "",
                        }}
                        options={
                          reportTaxationRequest?.data?.map((el) => ({
                            value: el.id,
                            label: el.title,
                          })) || []
                        }
                        setSelectedOption={(option) => {
                          const { value, label } = option;
                          setValue("taxationTypeId", {
                            id: +value,
                            title: label,
                          });
                        }}
                        placeholder="Выбор налоговой ставки"
                      />
                    )}
                  />
                  <div>
                    <Button
                      type="submit"
                      color="primary"
                      isProcessing={isLoading}
                      disabled={isLoading}
                    >
                      Сохранить
                    </Button>
                  </div>
                </div>
              </form>
              <ServerSuccess message={resetTaxationMutation.data?.message} />
              <ServerError mutation={resetTaxationMutation} className="mt-3" />
            </Tabs.Item>
            <Tabs.Item title={TABS_TITLES[TABS.apiKeys]}>
              {activeTab === TABS.apiKeys ? <ApiKeys /> : null}
            </Tabs.Item>
            <Tabs.Item title={TABS_TITLES[TABS.subscriptions]}>
              <Subscriptions />
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};
