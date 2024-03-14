import { useVkAuthMutation } from "@/api/auth";
import { ServerError } from "@/components/ServerError";
import { useAuth } from "@/components/auth/AuthProvider";
import { Spinner } from "flowbite-react";
import { useEffect, type FC } from "react";
import { useSearchParams } from "react-router-dom";

export const AuthVk: FC = () => {
  const [searchParams] = useSearchParams();

  const payload = searchParams.get("payload");
  const { setToken } = useAuth();

  const vkAuthMutation = useVkAuthMutation();

  const login = async () => {
    if (payload) {
      const data = await vkAuthMutation.mutateAsync(payload);
      if (data) {
        setToken(data.token);
      }
    }
  };

  useEffect(() => {
    login();
  }, [payload]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {!vkAuthMutation.error && <Spinner />}
      <ServerError mutation={vkAuthMutation} />
    </div>
  );
};
