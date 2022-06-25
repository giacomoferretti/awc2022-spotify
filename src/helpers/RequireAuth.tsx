import {
  Navigate,
  Outlet,
  createSearchParams,
  useLocation,
} from "react-router-dom";

import { useUsers } from "@/context";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const { session } = useUsers();

  return session ? (
    <>{children}</>
  ) : (
    <Navigate
      to={
        "/login?" +
        createSearchParams({
          from: location.pathname,
        })
      }
      replace
    />
  );
};

export const RequireAuthWrapper = () => {
  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  );
};
