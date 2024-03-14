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
import { zodI18nMap } from "zod-i18n-map";
// Import your language translation files
import translation from "zod-i18n-map/locales/ru/zod.json";
import { Logout } from "./pages/authentication/logout";
import { Settings } from "./pages/settings/Settings";
import { AuthVk } from "./pages/authentication/vk";
import { AuthYandex } from "./pages/authentication/yanex";

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
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
