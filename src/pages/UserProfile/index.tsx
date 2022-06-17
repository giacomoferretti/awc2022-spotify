import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";

import { useUsers } from "@/context";

import { NoMatch } from "..";

type UserProfileParams = {
  username: string;
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
      return getUserByUsername(params.username!);
    } catch {
      return null;
    }
  }, [session]);

  return user ? (
    <>
      <Helmet>
        <title>
          {user.username} - {import.meta.env.VITE_SITE_TITLE}
        </title>
      </Helmet>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.password}</p>
    </>
  ) : (
    <NoMatch />
  );
};
