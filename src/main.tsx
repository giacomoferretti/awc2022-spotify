import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@/index.css";
import App from "@/App";
import { SpotifyProvider } from "@context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <SpotifyProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  </SpotifyProvider>
  // </React.StrictMode>
);
