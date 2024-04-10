import { useMemo } from "react";
import { useUserProfile } from "@/api/user";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";

type ProfileSubscriptionInfoProps = {
  children: React.ReactNode;
};

const ProfileSubscriptionInfo = ({
  children,
}: ProfileSubscriptionInfoProps) => {
  const userProfile = useUserProfile();
  const navigate = useNavigate();
  const notificationAction = () => {
    navigate(ROUTES.unitTable);
  };
  const typeOfContent = useMemo<
    "noSubscription" | "subscriptionExpired" | "noAccounts" | null
  >(() => {
    const formattedDate = new Date().toISOString();
    const validDate = userProfile.data?.orders.filter(
      (date) => new Date(date.expiredAt) < new Date(formattedDate),
    );
    if (userProfile.isSuccess && validDate?.length) {
      return "subscriptionExpired";
    }
    if (userProfile.isSuccess && !userProfile.data?.orders.length) {
      return "noSubscription";
    }

    if (!userProfile?.data?.accountsCount) {
      return "noAccounts";
    }

    return null;
  }, [
    userProfile.data?.orders,
    userProfile.data?.accountsCount,
    userProfile.isSuccess,
  ]);

  if (typeOfContent === "subscriptionExpired") {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex w-5/12 flex-wrap justify-center align-middle">
          <div className="w-full text-center">
            Срок действия вашей подписки истек
          </div>
          <Button onClick={notificationAction} className="mt-2">
            Обновить подписку
          </Button>
        </div>
      </div>
    );
  }

  if (typeOfContent === "noSubscription") {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex w-5/12 flex-wrap justify-center align-middle">
          <div className="w-full text-center">У вас нет активных подписок</div>
          <Button onClick={notificationAction} className="mt-2">
            Добавить подписку
          </Button>
        </div>
      </div>
    );
  }

  if (typeOfContent === "noAccounts") {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="w-5/12 justify-center text-center align-middle">
          "Уважаемый(ая) пользователь, На вашем аккаунте есть активная подписка,
          однако на данный момент отсутствуют необходимые API ключи для
          отображения дашборда и интерфейса себестоимости. Мы рекомендуем
          добавить ключи для доступа к соответствующим данным. Нажмите кнопку
          ниже, чтобы перейти к странице настройки API ключей и добавить их к
          вашему аккаунту.
        </div>
        <Button
          onClick={() => navigate(ROUTES.settingsProfile)}
          className="mt-4"
        >
          Настройка API ключей
        </Button>
      </div>
    );
  }

  return children;
};

export default ProfileSubscriptionInfo;
