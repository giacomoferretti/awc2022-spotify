import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "@/index.css";
import { SpotifyProvider } from "@context";
import { SpotifyDebug } from "./pages/Debug/SpotifyDebug";
import { NoMatch } from "./pages/NoMatch";
import { Debug } from "./pages/Debug/Debug";
import { AuthDebug } from "./pages/Debug/AuthDebug";
import { UsersProvider } from "./context/usersContext";

// Disable console.log() if in production
if (import.meta.env.PROD) console.log = () => {};

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <HelmetProvider>
    <SpotifyProvider>
      <UsersProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<App />}></Route> */}
            <Route path="/" element={<Navigate to={"/debug"} />}></Route>
            <Route path="/debug" element={<Debug />}>
              <Route path="spotify" element={<SpotifyDebug />}></Route>
              <Route path="auth" element={<AuthDebug />}></Route>
            </Route>

            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      </UsersProvider>
    </SpotifyProvider>
  </HelmetProvider>
  // </React.StrictMode>
);
