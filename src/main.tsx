import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import { App } from "@/App";
import { SpotifyProvider, StorageProvider } from "@/context";
import "@/index.css";

// Disable console.log() if in production
if (import.meta.env.PROD) console.log = () => undefined;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <HelmetProvider>
    <SpotifyProvider>
      <StorageProvider>
        <App />
      </StorageProvider>
    </SpotifyProvider>
  </HelmetProvider>
  // </React.StrictMode>
);
