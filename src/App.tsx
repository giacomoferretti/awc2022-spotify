import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  createSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { Home, Login, NoMatch, Signup } from "@/pages";
import { AuthDebug } from "@/pages/Debug/AuthDebug";
import { Debug, DebugAbsoluteNav } from "@/pages/Debug/Debug";
import { SpotifyDebug } from "@/pages/Debug/SpotifyDebug";

import { useUsers } from "./context/usersContext";
import { TestForm } from "./pages/Debug/TestForm";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  // let auth = useAuth();
  const location = useLocation();

  const { session } = useUsers();

  if (!session) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
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
  }

  return <>{children}</>;
};

const Dashboard = () => {
  const { logout } = useUsers();

  const onClick = () => {
    logout(() => {
      console.log("logout!");
    });
  };

  return (
    <>
      <h1 className="text-4xl">Dashboard</h1>
      <button type="button" onClick={onClick}>
        Logout
      </button>
    </>
  );
};

const Logout = () => {
  const { logout } = useUsers();

  useEffect(() => {
    logout(() => {
      console.log("Logged out!");
    });
  }, []);

  return <Navigate to="/" replace />;
};

export const App = () => {
  return (
    <BrowserRouter>
      {/* <Helmet>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${
            import.meta.env.VITE_GOOGLE_ANALYTICS
          }`}></script>
        <script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${import.meta.env.VITE_GOOGLE_ANALYTICS}');
          `}
        </script>
      </Helmet> */}
      {/* {import.meta.env.DEV && <DebugAbsoluteNav />} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/debug" element={<Debug />}>
          <Route path="spotify" element={<SpotifyDebug />} />
          <Route path="auth" element={<AuthDebug />} />
          <Route path="form" element={<TestForm />} />
        </Route>

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};
