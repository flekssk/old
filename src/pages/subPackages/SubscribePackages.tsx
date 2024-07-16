import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { useGetSubscription } from "@/api/admin/hooks";
import SubscribeTable from "@/pages/subPackages/SubscribeTable";
import { Breadcrumb, Card } from "flowbite-react";
import { HiHome } from "react-icons/hi";

const SubscribePackages = () => {
  const subscriptionData = useGetSubscription();
  return (
    <NavbarSidebarLayout>
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/">
          <div className="flex items-center gap-x-3">
            <HiHome className="text-xl" />
          </div>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <span className="dark:text-white">Пакеты подписок</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <h3 className="mb-4 text-2xl font-bold dark:text-white">
          Пакеты подписок
        </h3>
        <SubscribeTable items={subscriptionData.data} />
      </Card>
    </NavbarSidebarLayout>
  );
};

export default SubscribePackages;
