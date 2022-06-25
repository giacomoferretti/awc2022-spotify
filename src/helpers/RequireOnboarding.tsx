import { Navigate, Outlet } from "react-router-dom";

import { useUsers } from "@/context";

export const RequireOnboarding = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { getCurrentUser } = useUsers();

  const user = getCurrentUser()!;

  return user.onboarding ? (
    <Navigate to="/onboarding?" replace />
  ) : (
    <>{children}</>
  );
};

export const RequireOnboardingWrapper = () => {
  return (
    <RequireOnboarding>
      <Outlet />
    </RequireOnboarding>
  );
};
