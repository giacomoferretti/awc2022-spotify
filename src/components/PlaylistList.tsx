import { usePlaylists } from "@/context";
import { Playlist } from "@/types";

import { PlaylistListEntry } from "./PlaylistListEntry";

export const PlaylistList = ({
  playlists,
  action,
}: {
  playlists: string[] | Playlist[];
  action?: React.ReactNode;
}) => {
  const { getPlaylistById } = usePlaylists();

  const isPlaylist = (
    playlist: string[] | Playlist[]
  ): playlist is Playlist[] => {
    return (
      Array.isArray(playlist) &&
      (playlist as Playlist[]).every((v) => v.id !== undefined)
    );
  };

  return (
    <div className="flex flex-wrap gap-4">
      {isPlaylist(playlists)
        ? playlists.map((playlist) => {
            return <PlaylistListEntry key={playlist.id} playlist={playlist} />;
          })
        : playlists.map((playlistId) => {
            const playlist = getPlaylistById(playlistId);

            return <PlaylistListEntry key={playlist.id} playlist={playlist} />;
          })}

      {action && <>{action}</>}
    </div>
  );
};
