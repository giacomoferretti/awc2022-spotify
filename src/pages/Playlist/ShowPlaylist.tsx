import { GlobeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/outline";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import { Header } from "@/components/Header";
import { usePlaylists } from "@/context";
import { NoMatch } from "@/pages/NoMatch";

type PlaylistParams = Pick<Playlist, "id">;

export const Playlist = () => {
  const params = useParams<PlaylistParams>();

  const { getPlaylistById } = usePlaylists();

  const playlist = useMemo(() => {
    return getPlaylistById(params.id!);
  }, []);

  // If not found, show NoMatch
  if (!playlist) return <NoMatch />;

  return (
    <>
      <Helmet>
        <title>
          {playlist.name} - {import.meta.env.VITE_SITE_TITLE}
        </title>
      </Helmet>
      <Header />
      <h1>{playlist.name}</h1>
      <h2>ID: {playlist.id}</h2>
      <h2>Description: {playlist.description}</h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4">
          <div className="h-32 w-32 flex-shrink-0 self-end rounded-full bg-neutral-800 p-8">
            {/* TODO: add user profile picture */}
            <UserIcon className="stroke-neutral-400" />
          </div>
          <div className="flex flex-1 flex-col justify-end">
            {/* <button type="button" onClick={openModal} title="Modifica dettagli"> */}

            <span className="mb-2 flex items-center gap-2 text-sm text-neutral-400">
              {playlist.isPublic ? (
                <>
                  <GlobeIcon className="h-4 w-4" /> {"Playlist pubblica"}
                </>
              ) : (
                <>
                  <LockClosedIcon className="h-4 w-4" /> {"Playlist privata"}
                </>
              )}
            </span>
            <span className="py-1 line-clamp-3">
              <h2 className="text-left text-5xl font-bold">{playlist.name}</h2>
            </span>
            {playlist.description && (
              <h2 className="mt-2">{playlist.description}</h2>
            )}
            {/* </button> */}
            <div className="mt-2 flex flex-wrap text-sm">
              <span className="whitespace-nowrap font-bold">Mario Rossi</span>
              <span
                data-before="•"
                className="whitespace-nowrap before:mx-1 before:content-[attr(data-before)]">
                10 canzoni
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
