import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";

import { ChangePasswordPanel } from "./ChangePasswordPanel";
import { DeleteUserPanel } from "./DeleteUserPanel";
import { UserInfoSection } from "./UserInfoSection";

export const UserSettingsRedirect = () => {
  return <Navigate to="/settings/user" replace />;
};

const UserSettings = () => {
  return (
    <>
      <Helmet>
        <title>Impostazioni - {import.meta.env.VITE_SITE_TITLE}</title>
      </Helmet>

      <div>
        <UserInfoSection />
      </div>

      <div className="mt-8">
        <ChangePasswordPanel />
      </div>

      <div className="mt-8">
        <DeleteUserPanel />
      </div>
    </>
  );
};

export default UserSettings;
