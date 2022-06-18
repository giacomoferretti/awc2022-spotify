import { Outlet } from "react-router-dom";

import { RequireAuth } from "@/helpers/RequireAuth";

export const RequireAuthWrapper = () => {
  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  );
};
