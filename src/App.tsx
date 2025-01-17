import type { FC } from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import ForgotPasswordPage from "./pages/authentication/forgot-password";
import ResetPasswordPage from "./pages/authentication/reset-password";
import SignInPage from "./pages/authentication/sign-in";
import SignUpPage from "./pages/authentication/sign-up";
import FlowbiteWrapper from "./components/flowbite-wrapper";
import UnitTable from "./pages/unittable/UnitTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ROUTES } from "./constants/routes";
import i18next from "i18next";
import { z } from "zod";
import "react-toastify/dist/ReactToastify.css";
import { zodI18nMap } from "zod-i18n-map";
// Import your language translation files
import translation from "zod-i18n-map/locales/ru/zod.json";
import { Logout } from "./pages/authentication/logout";
import { Settings } from "./pages/settings/Settings";
import { AuthVk } from "./pages/authentication/vk";
import { AuthYandex } from "./pages/authentication/yanex";
import { Cost } from "./pages/cost/Cost";
import Product from "./pages/product";
import { ToastContainer } from "react-toastify";
import { Flowbite } from "flowbite-react";
import { theme } from "./theme";
import SubscribePackages from "@/pages/subPackages/SubscribePackages";
import UserList from "@/pages/userList/UserList";
import UserInfo from "@/pages/userInfo/UserInfo";
import TaskQueue from "@/pages/taskQueue/TaskQueue";
import WeekReportPage from "./pages/weekReport";
import OtherExpenses from "@/pages/otherExpenses";
import ProfitAndLossPage from "./pages/profitAndLoss";
import OtherDeductions from "./pages/otherDeductions";

// lng and resources key depend on your locale.
i18next.init({
  lng: "ru",
  resources: {
    ru: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

const queryClient = new QueryClient();

const App: FC = function () {
  return (
    <QueryClientProvider client={queryClient}>
      <Flowbite theme={{ theme }}>
        <ToastContainer hideProgressBar autoClose={3000} />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<FlowbiteWrapper />}>
                <Route
                  path={ROUTES.home}
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                  index
                />
                <Route
                  path={ROUTES.week}
                  element={
                    <ProtectedRoute>
                      <WeekReportPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.pnl}
                  element={
                    <ProtectedRoute>
                      <ProfitAndLossPage />
                    </ProtectedRoute>
                  }
                />
                <Route path={ROUTES.authVk} element={<AuthVk />} />
                <Route path={ROUTES.authYandex} element={<AuthYandex />} />
                <Route
                  path={ROUTES.unitTable}
                  element={
                    <ProtectedRoute>
                      <UnitTable />
                    </ProtectedRoute>
                  }
                />
                <Route path={ROUTES.login} element={<SignInPage />} />
                <Route path={ROUTES.registration} element={<SignUpPage />} />
                <Route
                  path={ROUTES.resetPassword}
                  element={<ForgotPasswordPage />}
                />
                <Route
                  path={ROUTES.resetPasswordByToken}
                  element={<ResetPasswordPage />}
                />

                <Route
                  path={ROUTES.logout}
                  element={
                    <ProtectedRoute>
                      <Logout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.settings}
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.cost}
                  element={
                    <ProtectedRoute>
                      <Cost />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={`${ROUTES.product}/:entityId`}
                  element={
                    <ProtectedRoute>
                      <Product />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.adminPanel}
                  element={
                    <ProtectedRoute>
                      <SubscribePackages />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.usersList}
                  element={
                    <ProtectedRoute>
                      <UserList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={`${ROUTES.userInfo}/:id`}
                  element={
                    <ProtectedRoute>
                      <UserInfo />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.tasksQueue}
                  element={
                    <ProtectedRoute>
                      <TaskQueue />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.otherExpenses}
                  element={
                    <ProtectedRoute>
                      <OtherExpenses />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTES.otherDeductions}
                  element={
                    <ProtectedRoute>
                      <OtherDeductions />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </Flowbite>
    </QueryClientProvider>
  );
};

export default App;
