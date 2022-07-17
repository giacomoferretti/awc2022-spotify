import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useUsers } from "@/context";

const Logout = () => {
  const { logout } = useUsers();

  useEffect(() => {
    logout(() => {
      console.log("Logged out!");
    });
  }, [logout]);

  return <Navigate to="/" replace />;
};

export default Logout;
