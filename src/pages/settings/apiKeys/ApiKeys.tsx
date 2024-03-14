import { useAccountList } from "@/api/wb";
import { WbAccount } from "@/api/wb/types";
import { Button, Card, TextInput } from "flowbite-react";
import { useState, type FC, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { ApiKeysRow } from "./ApiKeysRow";

export const ApiKeys: FC = function () {
  const [keys, setKeys] = useState<Array<{ id: string; account?: WbAccount }>>(
    [],
  );

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
  };

  return (
    <Card>
      <h3 className="mb-4 text-xl font-bold dark:text-white">API ключи</h3>
      <div className=" max-w-3xl">
        {keys.length ? (
          keys.map((item) => (
            <ApiKeysRow
              key={item.id}
              id={item.id}
              account={item.account}
              onSuccess={(id) => {
                if (!item.account) {
                  setKeys((current) => current.filter((key) => key.id !== id));
                }
                apiKeysRequest.refetch();
              }}
              onRemove={(id) => {
                setKeys((current) => current.filter((key) => key.id !== id));
                apiKeysRequest.refetch();
              }}
            />
          ))
        ) : (
          <div>Добавте свой первый API ключ</div>
        )}
        <div className="flex justify-end">
          <Button color="blue" onClick={onCreate}>
            Добавить
          </Button>
        </div>
      </div>
    </Card>
  );
};
