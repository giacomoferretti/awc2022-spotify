import { Link, Outlet } from "react-router-dom";

export const DebugAbsoluteNav = () => {
  return (
    <nav className="absolute opacity-50 flex p-2 gap-2 text-xs items-center">
      <h2>Navigation: </h2>
      <Link className="bg-gray-700 py-1 px-2 rounded font-mono" to="/">
        Home
      </Link>
      <Link className="bg-gray-700 py-1 px-2 rounded font-mono" to="/dashboard">
        Dashboard
      </Link>
      <Link className="bg-gray-700 py-1 px-2 rounded font-mono" to="/login">
        Login
      </Link>
      <Link className="bg-gray-700 py-1 px-2 rounded font-mono" to="/signup">
        Signup
      </Link>
      <Link className="bg-gray-700 py-1 px-2 rounded font-mono" to="/logout">
        Logout
      </Link>
      <Link className="bg-gray-700 py-1 px-2 rounded font-mono" to="/404">
        404
      </Link>
      <Link
        className="bg-gray-700 py-1 px-2 rounded font-mono"
        to="/debug/spotify">
        (DEBUG) Spotify
      </Link>
      <Link
        className="bg-gray-700 py-1 px-2 rounded font-mono"
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
