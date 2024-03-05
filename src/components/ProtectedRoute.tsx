import type { FC } from "react";
import { Navigate } from "react-router";
import { useAuth } from "./auth/AuthProvider";
import { Spinner } from "flowbite-react";
import { ROUTES } from "@/constants/routes";

type ProtectedRouteProps = {
  roles?: string[];
  children?: React.ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isPending } = useAuth();
  if (!isAuthenticated && !isPending) {
    return <Navigate to={ROUTES.login} />;
  }

  if (isPending) {
    return (
      <div className="relative h-screen w-screen">
        <Spinner className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 " />
      </div>
    );
  }

  return children;
};
