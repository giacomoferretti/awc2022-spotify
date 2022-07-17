import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";

import { useUsers } from "@/context";

import HomeContent from "./HomeContent";
import HomeHeader from "./HomeHeader";

const Home = () => {
  const { session } = useUsers();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (session) {
  //     navigate("/dashboard", { replace: true });
  //   }
  // }, [session]);

  return session ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <>
      <Helmet>
        <title>{import.meta.env.VITE_SITE_TITLE}</title>
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <HomeHeader />
        <HomeContent />
      </div>
    </>
  );
};

export default Home;
