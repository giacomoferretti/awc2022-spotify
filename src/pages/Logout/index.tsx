import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useUsers } from "@/context";

export const Logout = () => {
  const { logout } = useUsers();

  useEffect(() => {
    logout(() => {
      console.log("Logged out!");
    });
  }, []);

  return <Navigate to="/" replace />;
};
