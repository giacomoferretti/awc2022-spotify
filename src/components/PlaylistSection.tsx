import { PlaylistList } from "./PlaylistList";

export const PlaylistSection = ({
  title,
  playlists,
  empty,
  newAction,
}: {
  title: React.ReactNode;
  playlists: string[];
  empty: React.ReactNode;
  newAction?: React.ReactNode;
}) => {
  return (
    <>
      <h2 className="mb-4 text-xl font-bold">{title}</h2>

      {playlists.length !== 0 ? (
        <PlaylistList playlists={playlists} action={newAction} />
      ) : (
        <>{empty}</>
      )}
    </>
  );
};
