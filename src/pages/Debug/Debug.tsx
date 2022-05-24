import { Link, Outlet } from "react-router-dom";

export const Debug = () => {
  return (
    <>
      <header>
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
      </header>
      <Outlet />
    </>
  );
};
