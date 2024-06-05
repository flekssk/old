import {
  usePaymentMutation,
  useSubscriptionList,
  useSubscriptionOrders,
} from "@/api/subscription";
import { BlockSpinner } from "@/components/BlockSpinner";
import { displayNumber } from "@/helpers/number";
import { format, parseISO } from "date-fns";
import { Button, Card } from "flowbite-react";
import type { FC } from "react";

const parseIsoDateString = (date: string) => {
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "dd.MM.yyyy HH:mm:ss");
  return formattedDate;
};

export const Subscriptions: FC = () => {
  const subscriptionListQuery = useSubscriptionList();
  const subscriptionOrdersQuery = useSubscriptionOrders();
  console.log(
    "🚀 ~ subscribtionOrdersQuery:",
    subscriptionOrdersQuery,
    subscriptionListQuery,
  );

  const loading =
    subscriptionOrdersQuery.isLoading || subscriptionListQuery.isLoading;

  const isOrdersExist = subscriptionOrdersQuery.data?.length;

  const paymentMutation = usePaymentMutation();

  return (
    <Card>
      <h3 className="mb-4 text-2xl font-bold dark:text-white">Подписки</h3>
      <div className=" max-w-6xl">
        {loading ? (
          <BlockSpinner />
        ) : (
          <div>
            <div>
              {isOrdersExist ? (
                subscriptionOrdersQuery.data?.map((item) => (
                  <Card className="mb-2" key={item.id}>
                    <div className="text-xl">
                      Подписка: {item.subscription.title}
                    </div>
                    <div className="grid max-w-3xl grid-cols-2 ">
                      <span className=" font-bold">Куплена:</span>
                      <span>{parseIsoDateString(item.created_at)}</span>
                      <span className="  font-bold">
                        Будет продлена/закончится:
                      </span>
                      <span>{parseIsoDateString(item.expired_at)}</span>
                    </div>
                  </Card>
                ))
              ) : (
                <div>У вас еще нет подписки</div>
              )}
            </div>
            {!isOrdersExist ? (
              <div className="mt-8">
                <div className="mb-3 text-xl font-bold">
                  Купите новую подписку
                </div>
                <div className="grid grid-cols-2 gap-4 ">
                  {subscriptionListQuery.data?.map((subscription) => (
                    <Card
                      key={subscription.id}
                      className="flex flex-col justify-center gap-2 text-center"
                    >
                      <div className=" text-xl">{subscription.title}</div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: subscription.description,
                        }}
                      />
                      <div className="text-xl font-bold">
                        {subscription.cost
                          ? displayNumber(subscription.cost) + " Р"
                          : "Бесплатно"}
                      </div>
                      <Button
                        processingSpinner={paymentMutation.isPending}
                        onClick={async () => {
                          await paymentMutation.mutateAsync(subscription.id);
                          subscriptionListQuery.refetch();
                          subscriptionOrdersQuery.refetch();
                        }}
                      >
                        Купить подписку
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </Card>
  );
};
