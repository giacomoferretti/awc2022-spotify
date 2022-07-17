import { EmojiSadIcon } from "@heroicons/react/outline";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";

import noCoverImage from "@/assets/nocover.png";
import { PlaylistList } from "@/components/PlaylistList";
import { PlaylistSection } from "@/components/PlaylistSection";
import { usePlaylists, useUsers } from "@/context";
import NoMatch from "@/pages/NoMatch";
import { User } from "@/types";

import { UserHeader } from "./UserHeader";

type UserProfileParams = Pick<User, "username">;

export const UserRedirect = () => {
  const { session } = useUsers();

  return <Navigate to={`/user/${session}`} replace />;
};

// const PlaylistSection = ({
//   title,
//   playlists,
// }: {
//   title: React.ReactNode;
//   playlists: string[];
// }) => {
//   return (
//     <>
//       <h2 className="mb-4 text-xl font-bold">{title}</h2>

//       {playlists.length !== 0 ? (
//         <PlaylistList playlists={playlists} />
//       ) : (
//         <div className="flex items-center text-neutral-500">
//           <EmojiSadIcon className="h-8 w-8" />
//           <span className="ml-4">Non ci sono playlist.</span>
//         </div>
//       )}
//     </>
//   );
// };

const EmptyMessage = () => {
  return (
    <div className="flex items-center text-neutral-500">
      <EmojiSadIcon className="h-8 w-8" />
      <span className="ml-4">Non ci sono playlist.</span>
    </div>
  );
};

const UserProfile = () => {
  const params = useParams<UserProfileParams>();

  const { getUserByUsername, getCurrentUser } = useUsers();
  const { getPlaylistById } = usePlaylists();

  const user = useMemo(
    () => (params.username ? getUserByUsername(params.username) : null),
    [getUserByUsername, params.username]
  );

  const currentUser = useMemo(() => getCurrentUser(), [getCurrentUser]);

  // If not found, show NoMatch
  if (!user) return <NoMatch />;

  return (
    <>
      <Helmet>
        <title>
          {user.displayName} - {import.meta.env.VITE_SITE_TITLE}
        </title>
      </Helmet>

      <div className="mt-4">
        <UserHeader user={user} />
      </div>

      <div className="mt-4">
        <PlaylistSection
          title="Playlist pubbliche"
          playlists={user.personalPlaylists.filter(
            (playlist) => getPlaylistById(playlist).isPublic
          )}
          empty={<EmptyMessage />}
        />
      </div>

      {currentUser?.username == user.username && (
        <div className="mt-4">
          <PlaylistSection
            title={
              <>
                Playlist private{" "}
                <span className="text-xs text-neutral-500">
                  VISIBILE SOLO A TE
                </span>
              </>
            }
            playlists={user.personalPlaylists.filter(
              (playlist) => !getPlaylistById(playlist).isPublic
            )}
            empty={<EmptyMessage />}
          />
        </div>
      )}

      <div className="mt-4">
        <PlaylistSection
          title="Playlist salvate"
          playlists={user.savedPlaylists}
          empty={<EmptyMessage />}
        />
      </div>
    </>
  );
};

export default UserProfile;
