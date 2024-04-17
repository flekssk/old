import { useVkAuthMutation } from "@/api/auth";
import { ServerError } from "@/components/ServerError";
import { useAuth } from "@/components/auth/AuthProvider";
import { Spinner } from "flowbite-react";
import { useEffect, type FC } from "react";
import { useLocation } from "react-router-dom";

export const AuthVk: FC = () => {
  const location = useLocation();
  const { setToken } = useAuth();

  const vkAuthMutation = useVkAuthMutation();

  const login = async (search: string) => {
    if (search) {
      const data = await vkAuthMutation.mutateAsync(search);
      if (data) {
        setToken(data.token);
      }
    }
  };

  useEffect(() => {
    if (location.search) {
      login(location.search);
    }
  }, [location.search]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {!vkAuthMutation.error && <Spinner />}
      <ServerError mutation={vkAuthMutation} />
    </div>
  );
};
