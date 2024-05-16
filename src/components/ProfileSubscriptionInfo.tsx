import { type FC, useMemo } from "react";
import { useUserProfile } from "@/api/user";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import { OnBoardingStatus } from "@/api/user/constants";
import type { OnBoardings, UserProfileResponse } from "@/api/user/types";
import { BlockSpinner } from "./BlockSpinner";

type ProfileSubscriptionInfoProps = {
  children: React.ReactNode;
};

const OnBoardingInProcess: FC<{
  onboarding: OnBoardings;
  accounts: UserProfileResponse["accounts"];
}> = ({ onboarding, accounts }) => {
  const account = useMemo(() => {
    return accounts.find(
      (account) => account.id === onboarding.settings.accountId,
    );
  }, [accounts, onboarding]);
  return (
    <tr className="bg-white text-center">
      <td className="border border-gray-400 px-4 py-2">
        {account ? account.name : onboarding.name}
      </td>
      <td className="border border-gray-400 px-4 py-2">
        {onboarding.settings.allSteps}
      </td>
      <td className="border border-gray-400 px-4 py-2">
        {onboarding.settings.completeSteps}
      </td>
      <td className="border border-gray-400 px-4 py-2">
        {onboarding.settings.failSteps}
      </td>
    </tr>
  );
};

const ProfileSubscriptionInfo = ({
  children,
}: ProfileSubscriptionInfoProps) => {
  const userProfile = useUserProfile();
  const navigate = useNavigate();
  const onBoardingInProcess = userProfile.data?.onboardings.filter(
    (el) => el.settings.status === OnBoardingStatus.inProcess,
  );
  const notificationAction = () => {
    navigate(`${ROUTES.settingsProfile}/?tab=2`);
  };
  const typeOfContent = useMemo<
    | "noSubscription"
    | "subscriptionExpired"
    | "noAccounts"
    | "onBoardingInProcess"
    | null
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
    if (onBoardingInProcess && onBoardingInProcess?.length > 0) {
      return "onBoardingInProcess";
    }
    return null;
  }, [
    onBoardingInProcess,
    userProfile.data?.orders,
    userProfile.data?.accountsCount,
    userProfile.isSuccess,
  ]);

  if (userProfile.isLoading) {
    return <BlockSpinner />;
  }

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
          onClick={() => navigate(`${ROUTES.settingsProfile}/?tab=1`)}
          className="mt-4"
        >
          Настройка API ключей
        </Button>
      </div>
    );
  }
  if (typeOfContent === "onBoardingInProcess") {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex w-1/2 flex-wrap justify-center align-middle">
          <div className="mb-4 w-full text-center text-xl">
            В настоящее время выполняется процесс загрузки данных.
          </div>
          <table className="border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">Имя</th>
                <th className="border border-gray-400 px-4 py-2">
                  Всего шагов
                </th>
                <th className="border border-gray-400 px-4 py-2">
                  Выполнено шагов
                </th>
                <th className="border border-gray-400 px-4 py-2">
                  Провалено шагов
                </th>
              </tr>
            </thead>
            <tbody>
              {onBoardingInProcess?.map((el) => (
                <OnBoardingInProcess
                  onboarding={el}
                  accounts={userProfile.data?.accounts || []}
                  key={el.id}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm">
          Если процесс занимает больше часа, пожалуйста, обратитесь в службу
          поддержки.
        </div>
      </div>
    );
  }

  return children;
};

export default ProfileSubscriptionInfo;
