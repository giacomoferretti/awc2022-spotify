import { Route, Routes } from "react-router-dom";

import { Design } from "@/design/Design";
import { MainLayout } from "@/layout/MainLayout";
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
import { AuthDebug, Debug, FlexDebug, SpotifyDebug } from "@/pages/Debug";

export default (
  <Routes>
    <Route index element={<Home />} />

    {/* Authentication */}
    <Route path="login" element={<Login />} />
    <Route path="logout" element={<Logout />} />
    <Route path="signup" element={<Signup />} />

    {/* Main app */}
    <Route element={<RequireAuthWrapper />}>
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />

        {/* User */}
        <Route path="user">
          <Route index element={<UserRedirect />} />
          <Route path=":username" element={<UserProfile />} />
        </Route>

        {/* Playlist */}
        <Route path="playlist">
          <Route index element={<NoMatch />} />
          <Route path="new" element={<CreatePlaylist />} />
          <Route path=":id" element={<ShowPlaylist />} />
        </Route>

        {/* Search */}
        <Route path="search" element={<h1>SEARCH</h1>} />
      </Route>
    </Route>

    {/* Debug routes */}
    {import.meta.env.DEV && (
      <>
        <Route path="design" element={<Design />} />

        <Route path="debug" element={<Debug />}>
          <Route index element={<NoMatch />} />
          <Route path="spotify" element={<SpotifyDebug />} />
          <Route path="auth" element={<AuthDebug />} />
          <Route path="flex" element={<FlexDebug />} />
        </Route>
      </>
    )}

    <Route path="*" element={<NoMatch />} />
  </Routes>
);
