import type { FC } from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import FlowbiteWrapper from "./common/FlowbiteWrapper";
import DashboardPage from "./containers/dashboard/DashboardPage";

const App: FC = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FlowbiteWrapper />}>
          <Route path="/" element={<DashboardPage />} index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
