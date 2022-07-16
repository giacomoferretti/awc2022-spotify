import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";

import { ChangePasswordPanel } from "./ChangePasswordPanel";
import { DeleteUserPanel } from "./DeleteUserPanel";
import { UserInfoPanel } from "./UserInfoPanel";

export const UserSettingsRedirect = () => {
  return <Navigate to="/settings/user" replace />;
};

export const UserSettings = () => {
  return (
    <>
      <Helmet>
        <title>Impostazioni - {import.meta.env.VITE_SITE_TITLE}</title>
      </Helmet>

      {/* <UserInfoPanel /> */}

      <ChangePasswordPanel />

      {/* <DeleteUserPanel /> */}
    </>
  );
};
