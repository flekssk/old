import { Flowbite, useThemeMode } from "flowbite-react";
import type { FC } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router";
import theme from "../flowbite-theme";

const FlowbiteWrapper: FC = function () {
  return (
    <Flowbite theme={{ theme }}>
      <PersistFlowbiteThemeToLocalStorage />
      <Outlet />
    </Flowbite>
  );
};

const PersistFlowbiteThemeToLocalStorage: FC = function () {
  const themeMode = useThemeMode();

  useEffect(() => {
    localStorage.setItem("theme", themeMode.mode);
  }, [themeMode]);

  return <></>;
};

export default FlowbiteWrapper;
