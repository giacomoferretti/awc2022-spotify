import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";

import { Header } from "@/components/Header";
import { useUsers } from "@/context";
import { NoMatch } from "@/pages";

type UserProfileParams = {
  id: string;
};

export const UserRedirect = () => {
  const { session } = useUsers();

  return <Navigate to={`/user/${session}`} replace />;
};

export const UserProfile = () => {
  const params = useParams<UserProfileParams>();

  const { session, getUserByUsername } = useUsers();

  const user = useMemo(() => {
    try {
      return getUserByUsername(params.id!);
    } catch {
      return null;
    }
  }, [session]);

  // If not found, show NoMatch
  if (!user) return <NoMatch />;

  return (
    <>
      <Helmet>
        <title>
          {user.username} - {import.meta.env.VITE_SITE_TITLE}
        </title>
      </Helmet>
      <Header />
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.password}</p>
    </>
  );
};
