import { usePlaylists } from "@/context";

import { PlaylistListEntry } from "./PlaylistListEntry";

export const PlaylistList = ({
  playlists,
  action,
}: {
  playlists: string[];
  action?: React.ReactNode;
}) => {
  const { getPlaylistById } = usePlaylists();

  return (
    <div className="flex flex-wrap gap-4">
      {playlists.map((playlistId) => {
        const playlist = getPlaylistById(playlistId);

        return <PlaylistListEntry key={playlist.id} playlist={playlist} />;
      })}

      {action && <>{action}</>}
    </div>
  );
};
