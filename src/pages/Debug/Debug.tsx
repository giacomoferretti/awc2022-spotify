import classNames from "classnames";
import { Link, LinkProps, Outlet } from "react-router-dom";

import { usePlaylists, useUsers } from "@/context";

const LinkButton = (props: LinkProps) => {
  return (
    <Link
      {...props}
      className={classNames(
        "rounded bg-gray-700 py-1 px-2 font-mono",
        props.className
      )}>
      {props.to.toString()}
    </Link>
  );
};

export const DebugAbsoluteNav = () => {
  const { clearAll: clearAllUsers } = useUsers();
  const { clearAll: clearAllPlaylists, generatePlaylist } = usePlaylists();

  const clearUsersOnClick = () => clearAllUsers();
  const clearPlaylistOnClick = () => clearAllPlaylists();
  const createRandomPlaylist = () => generatePlaylist();

  return (
    <div className="fixed bottom-0 max-w-lg p-2 text-xs opacity-50">
      <div className="flex flex-col items-start gap-2">
        <LinkButton to="/" />
        <LinkButton to="/404" />
        <LinkButton className="bg-red-900" to="/login" />
        <LinkButton className="bg-red-900" to="/signup" />
        <LinkButton className="bg-red-900" to="/logout" />
        <LinkButton className="bg-green-900" to="/dashboard" />
        <LinkButton className="bg-green-900" to="/user" />
        <LinkButton className="bg-green-900" to="/playlist" />
        <LinkButton className="bg-green-900" to="/playlist/new" />
        <LinkButton className="bg-green-900" to="/search" />
        <LinkButton className="bg-blue-900" to="/debug/spotify" />
        <LinkButton className="bg-blue-900" to="/debug/auth" />

        <button
          className="rounded bg-gray-700 py-1 px-2 font-mono"
          type="button"
          onClick={clearUsersOnClick}>
          [users] clearAll
        </button>
        <button
          className="rounded bg-gray-700 py-1 px-2 font-mono"
          type="button"
          onClick={clearPlaylistOnClick}>
          [playlists] clearAll
        </button>
        <button
          className="rounded bg-gray-700 py-1 px-2 font-mono"
          type="button"
          onClick={createRandomPlaylist}>
          [playlists] generatePlaylist
        </button>
      </div>
    </div>
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
