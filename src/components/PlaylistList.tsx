import { usePlaylists } from "@/context";

import { PlaylistListEntry } from "./PlaylistListEntry";

export const PlaylistList = ({ playlists }: { playlists: string[] }) => {
  const { getPlaylistById } = usePlaylists();

  return (
    <div className="flex flex-wrap gap-4">
      {playlists.map((playlistId) => {
        const playlist = getPlaylistById(playlistId);

        return <PlaylistListEntry key={playlist.id} playlist={playlist} />;
      })}
    </div>
  );
};
