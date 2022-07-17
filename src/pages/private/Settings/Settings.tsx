import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";

import { ChangePasswordSection } from "./ChangePasswordSection";
import { DeleteUserSection } from "./DeleteUserSection";
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

      <div className="pb-8">
        <div>
          <UserInfoSection />
        </div>

        <div className="mt-8">
          <ChangePasswordSection />
        </div>

        <div className="mt-8">
          <DeleteUserSection />
        </div>
      </div>
    </>
  );
};

export default UserSettings;
