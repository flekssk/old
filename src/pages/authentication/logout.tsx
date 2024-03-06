import { useLogoutMutation } from "@/api/auth";
import { useAuth } from "@/components/auth/AuthProvider";
import { Spinner } from "flowbite-react";
import { useEffect } from "react";

export const Logout = () => {
  const logoutMutation = useLogoutMutation();
  const { setToken } = useAuth();

  const logout = async () => {
    await logoutMutation.mutateAsync({});
    setToken(null);
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="absolute flex h-screen w-screen items-center justify-center">
      <Spinner />
    </div>
  );
};
