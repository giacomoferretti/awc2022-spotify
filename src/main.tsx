import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import "@/index.css";
import { App } from "@/App";
import { SpotifyProvider } from "@/context/spotifyContext";
import { UsersProvider } from "@/context/usersContext";

// Disable console.log() if in production
if (import.meta.env.PROD) console.log = () => {};

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <HelmetProvider>
    <SpotifyProvider>
      <UsersProvider>
        <App />
      </UsersProvider>
    </SpotifyProvider>
  </HelmetProvider>
  // </React.StrictMode>
);
