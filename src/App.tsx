import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthDebug } from "@/pages/Debug/AuthDebug";
import { Debug } from "@/pages/Debug/Debug";
import { SpotifyDebug } from "@/pages/Debug/SpotifyDebug";
import { Home, Login, Signup, NoMatch } from "@/pages";
import { TestForm } from "./pages/Debug/TestForm";

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
