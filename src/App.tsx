import type { FC } from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import DashboardPage from './pages/dashboard';
import ForgotPasswordPage from './pages/authentication/forgot-password';
import ResetPasswordPage from './pages/authentication/reset-password';
import SignInPage from './pages/authentication/sign-in';
import SignUpPage from './pages/authentication/sign-up';
import FlowbiteWrapper from './components/flowbite-wrapper';
import ApiKeys from './pages/keys/ApiKeys';
import UnitTable from './pages/unittable/UnitTable';

const App: FC = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FlowbiteWrapper />}>
          <Route path="/" element={<DashboardPage />} index />
          <Route path="/account/keys" element={<ApiKeys />} />
          <Route path="/unit" element={<UnitTable />} />
          <Route path="/authentication/sign-in" element={<SignInPage />} />
          <Route path="/authentication/sign-up" element={<SignUpPage />} />
          <Route
            path="/authentication/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route
            path="/authentication/reset-password"
            element={<ResetPasswordPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
