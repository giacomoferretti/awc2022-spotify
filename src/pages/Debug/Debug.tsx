import { Link, Outlet } from "react-router-dom";

export const DebugAbsoluteNav = () => {
  return (
    <nav className="absolute flex items-center gap-2 p-2 text-xs opacity-50">
      <h2>Navigation: </h2>
      <Link className="rounded bg-gray-700 py-1 px-2 font-mono" to="/">
        Home
      </Link>
      <Link className="rounded bg-gray-700 py-1 px-2 font-mono" to="/dashboard">
        Dashboard
      </Link>
      <Link className="rounded bg-gray-700 py-1 px-2 font-mono" to="/login">
        Login
      </Link>
      <Link className="rounded bg-gray-700 py-1 px-2 font-mono" to="/signup">
        Signup
      </Link>
      <Link className="rounded bg-gray-700 py-1 px-2 font-mono" to="/logout">
        Logout
      </Link>
      <Link className="rounded bg-gray-700 py-1 px-2 font-mono" to="/404">
        404
      </Link>
      <Link
        className="rounded bg-gray-700 py-1 px-2 font-mono"
        to="/debug/spotify">
        (DEBUG) Spotify
      </Link>
      <Link
        className="rounded bg-gray-700 py-1 px-2 font-mono"
        to="/debug/auth">
        (DEBUG) Auth
      </Link>
    </nav>
  );
};

export const Debug = () => {
  return (
    <>
      {/* <header>
        <nav className="flex p-2 gap-2 text-xs items-center">
          <h2>Navigation: </h2>
          <Link
            className="bg-gray-700 py-1 px-2 rounded font-mono"
            to="/debug/spotify">
            Spotify
          </Link>
          <Link
            className="bg-gray-700 py-1 px-2 rounded font-mono"
            to="/debug/auth">
            Auth
          </Link>
        </nav>
      </header> */}
      <Outlet />
    </>
  );
};
