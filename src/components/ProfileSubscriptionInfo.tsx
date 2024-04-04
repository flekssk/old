import { useEffect, useState } from "react";
import { useUserProfile } from "@/api/user";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import { toast } from "react-toastify";

type ProfileSubscriptionInfoProps = {
  children: React.ReactNode;
};

const ProfileSubscriptionInfo = ({
  children,
}: ProfileSubscriptionInfoProps) => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const userProfile = useUserProfile();
  const navigate = useNavigate();
  const notificationAction = () => {
    navigate(ROUTES.unitTable);
    toast.dismiss();
  };
  useEffect(() => {
    if (userProfile?.data?.orders.length && !userProfile?.data?.accountsCount) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
    const formattedDate = new Date().toISOString();
    const validDate = userProfile.data?.orders.filter(
      (date) => new Date(date.expiredAt) < new Date(formattedDate),
    );
    if (userProfile.isSuccess && validDate?.length) {
      toast.warning(
        <div className="flex flex-col items-center">
          <div>Срок действия вашей подписки истек</div>
          <Button onClick={notificationAction} className="mt-2">
            Обновить подписку
          </Button>
        </div>,
      );
    }
    if (userProfile.isSuccess && !userProfile.data?.orders.length) {
      toast.warning(
        <div className="flex flex-col items-center">
          <div>У вас нет активных подписок</div>
          <Button onClick={notificationAction} className="mt-2">
            Добавить подписку
          </Button>
        </div>,
      );
    }
  }, [
    userProfile.data?.orders,
    userProfile.data?.accountsCount,
    userProfile.isSuccess,
  ]);

  if (showMessage) {
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
