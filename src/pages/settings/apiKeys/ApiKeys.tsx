import { useAccountList } from "@/api/wb";
import type { WbAccount } from "@/api/wb/types";
import { Button, Card } from "flowbite-react";
import { useState, type FC, useEffect } from "react";
import { ApiKeysRow } from "./ApiKeysRow";

export const ApiKeys: FC = function () {
  const [keys, setKeys] = useState<Array<{ id: string; account?: WbAccount }>>(
    [],
  );
  const [disableCreate, setDisableCreate] = useState(false);
  const apiKeysRequest = useAccountList();
  useEffect(() => {
    if (apiKeysRequest.data) {
      setKeys((current) => {
        const result = [];
        let data = [...apiKeysRequest.data];

        current.forEach((key) => {
          const account = apiKeysRequest.data.find(
            (account) => account.id.toString() === key.id,
          );
          if (account) {
            result.push({
              id: key.id,
              account,
            });
            data = data.filter((acc) => acc.id !== account.id);
          } else {
            result.push(key);
          }
        });

        if (data.length) {
          result.push(
            ...data.map((account) => ({ id: account.id.toString(), account })),
          );
        }

        return result;
      });
    }
  }, [apiKeysRequest.data]);

  const onCreate = () => {
    setKeys((current) => [
      {
        id: Math.random().toString(),
      },
      ...current,
    ]);
    setDisableCreate(true);
  };

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold dark:text-white">API ключи</h3>
        <a
          className="cursor-pointer text-blue-600 hover:text-blue-800"
          href="https://disk.yandex.com/d/-4HDLeo-MJT31Q"
          target="_blank"
          rel="noreferrer"
        >
          Инструкция по созданию API ключей
        </a>
      </div>
      <div className="flex justify-start">
        <Button disabled={disableCreate} color="blue" onClick={onCreate}>
          Добавить
        </Button>
      </div>
      <div className=" max-w-3xl">
        {keys.length ? (
          keys.map((item) => (
            <ApiKeysRow
              key={item.id}
              id={item.id}
              onDisableCreate={setDisableCreate}
              account={item.account}
              onSuccess={async (id) => {
                await apiKeysRequest.refetch();
                if (!item.account) {
                  setKeys((current) => current.filter((key) => key.id !== id));
                }
              }}
              onRemove={async (id) => {
                await apiKeysRequest.refetch();
                setKeys((current) => current.filter((key) => key.id !== id));
              }}
            />
          ))
        ) : (
          <div>Добавьте свой первый API ключ</div>
        )}
      </div>
    </Card>
  );
};
