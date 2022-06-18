import { Route, Routes } from "react-router-dom";

import { RequireAuthWrapper } from "@/helpers/RequireAuthWrapper";
import {
  CreatePlaylist,
  Dashboard,
  Home,
  Login,
  Logout,
  NoMatch,
  ShowPlaylist,
  Signup,
  UserProfile,
  UserRedirect,
} from "@/pages";
import { AuthDebug, Debug, SpotifyDebug } from "@/pages/Debug";

export default (
  <Routes>
    <Route index element={<Home />} />

    {/* Authentication */}
    <Route path="login" element={<Login />} />
    <Route path="logout" element={<Logout />} />
    <Route path="signup" element={<Signup />} />

    {/* Main app */}
    <Route element={<RequireAuthWrapper />}>
      <Route path="dashboard" element={<Dashboard />} />

      {/* User */}
      <Route path="user">
        <Route index element={<UserRedirect />} />
        <Route path=":username" element={<UserProfile />} />
      </Route>

      {/* Playlist */}
      <Route path="playlist">
        <Route path="new" element={<CreatePlaylist />} />
        <Route path=":id" element={<ShowPlaylist />} />
      </Route>

      {/* Search */}
      <Route path="search" element={<h1>SEARCH</h1>} />
    </Route>

    {/* Debug routes */}
    {import.meta.env.DEV && (
      <Route path="debug" element={<Debug />}>
        <Route path="spotify" element={<SpotifyDebug />} />
        <Route path="auth" element={<AuthDebug />} />
      </Route>
    )}

    <Route path="*" element={<NoMatch />} />
  </Routes>
);
