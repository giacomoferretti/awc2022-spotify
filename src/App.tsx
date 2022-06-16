import { BrowserHistory, createBrowserHistory } from "history";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Router,
  Routes,
  createSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useUsers } from "@/context/usersContext";
import { Dashboard, Home, Login, NoMatch, Signup } from "@/pages";
import { AuthDebug } from "@/pages/Debug/AuthDebug";
import { Debug, DebugAbsoluteNav } from "@/pages/Debug/Debug";
import { SpotifyDebug } from "@/pages/Debug/SpotifyDebug";
import { TestForm } from "@/pages/Debug/TestForm";
import { UserProfile, UserRedirect } from "@/pages/UserProfile";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
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

const RequireAuthWrapper = () => {
  const location = useLocation();

  const { session } = useUsers();

  return session ? (
    <Outlet />
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

const Logout = () => {
  const { logout } = useUsers();

  useEffect(() => {
    logout(() => {
      console.log("Logged out!");
    });
  }, []);

  return <Navigate to="/" replace />;
};

const history = createBrowserHistory();

const CustomRouter = ({
  history,
  children,
}: {
  history: BrowserHistory;
  children?: React.ReactNode;
}) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      location={state.location}
      navigationType={state.action}
      navigator={history}>
      {children}
    </Router>
  );
};

export const App = () => {
  useEffect(() => {
    const unlisten = history.listen((update) => {
      console.log(update.location);
      console.log(update.action);
    });

    return unlisten;
  }, []);

  return (
    <CustomRouter history={history}>
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
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="signup" element={<Signup />} />

        <Route element={<RequireAuthWrapper />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user" element={<UserRedirect />} />
          <Route path="user/:username" element={<UserProfile />} />
        </Route>

        <Route path="debug" element={<Debug />}>
          <Route path="spotify" element={<SpotifyDebug />} />
          <Route path="auth" element={<AuthDebug />} />
          <Route path="form" element={<TestForm />} />
        </Route>

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </CustomRouter>
  );
};
