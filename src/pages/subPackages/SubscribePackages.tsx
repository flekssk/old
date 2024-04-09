import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { useGetSubscription } from "@/api/admin/hooks";
import SubscribeTable from "@/pages/subPackages/SubscribeTable";

const SubscribePackages = () => {
  const subscriptionData = useGetSubscription();
  return (
    <NavbarSidebarLayout>
      <div className="m-4">Подписки</div>
      <SubscribeTable items={subscriptionData.data} />
    </NavbarSidebarLayout>
  );
};

export default SubscribePackages;
