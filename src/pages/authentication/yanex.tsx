import { useYandexAuthNutation } from "@/api/auth";
import { ServerError } from "@/components/ServerError";
import { useAuth } from "@/components/auth/AuthProvider";
import { Spinner } from "flowbite-react";
import { useEffect, type FC } from "react";
import { useLocation } from "react-router-dom";

export const AuthYandex: FC = () => {
  const location = useLocation();
  const search = location.search;

  const { setToken } = useAuth();

  const yandexAuthMutation = useYandexAuthNutation();

  const login = async (payload: string) => {
    if (payload) {
      const data = await yandexAuthMutation.mutateAsync(payload);
      if (data) {
        setToken(data.token);
      }
    }
  };

  useEffect(() => {
    if (search) {
      login(search);
    }
  }, [search]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {!yandexAuthMutation.error && <Spinner />}
      <ServerError mutation={yandexAuthMutation} />
    </div>
  );
};
