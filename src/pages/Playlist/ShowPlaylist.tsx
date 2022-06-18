import { GlobeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/outline";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";

import noCoverImage from "@/assets/nocover.png";
import { Header } from "@/components/Header";
import { usePlaylists, useSpotify, useUsers } from "@/context";
import { NoMatch } from "@/pages/NoMatch";
import { Playlist, SpotifyTrack, User } from "@/types";
import { msToTime } from "@/utils/time";

const PlaylistHeader = ({
  owner,
  playlist,
}: {
  owner: User;
  playlist: Playlist;
}) => {
  return (
    <div className="flex gap-4">
      <div className="h-40 w-40 flex-shrink-0 self-end bg-neutral-800">
        <div className="relative pb-[100%]">
          <img className="absolute h-full" src={noCoverImage} />
        </div>
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
          <Link
            to={`/user/${owner.username}`}
            className="whitespace-nowrap font-bold hover:underline">
            {owner.displayName}
          </Link>
          {playlist.tracks.length !== 0 && (
            <span
              data-before="•"
              className="whitespace-nowrap before:mx-1 before:content-[attr(data-before)]">
              {playlist.tracks.length} brani
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const SongSearch = () => {
  const { search } = useSpotify();

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SpotifyTrack[]>([]);

  useEffect(() => {
    if (query) {
      const delayDebounceFn = setTimeout(() => {
        console.log(query);

        search(query)
          .then((response) => {
            console.log(response);
            setResult(response);
          })
          .catch(() => {
            setResult([]);
          });
      }, 400);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setResult([]);
    }
  }, [query]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Cerca brani"
          className="w-full rounded border-0 bg-[#ffffff1a] p-2.5 text-sm text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:border-spotify-accent-base focus:ring-2 focus:ring-inset focus:ring-spotify-accent-base"
          value={query}
          onChange={onChangeHandler}
        />
      </form>

      {query && result.length === 0 && (
        <>
          <h2>
            Nessun risultato trovato per &quot;
            <span className="whitespace-pre">{query}</span>&quot;
          </h2>
          <h3>
            Controlla di aver digitato tutte le parole correttamente o usa meno
            parole chiave o parole diverse.
          </h3>
        </>
      )}

      {result.length > 0 && (
        <div className="mt-4 flex flex-col">
          {result.map((entry) => (
            <div
              key={entry.id}
              className="grid grid-cols-[3fr_2fr_auto] gap-4 rounded p-2 hover:bg-neutral-800">
              {/* Image + Title + Artits */}
              <div className="flex gap-4">
                <img
                  className="h-12 w-12 rounded"
                  src={entry.album.images[2].url}
                />
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                  <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {entry.name}
                  </span>
                  <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-neutral-600">
                    {entry.artists.map((x) => x.name).join(", ")}
                  </span>
                </div>
              </div>

              {/* Album */}
              <div className="flex items-center overflow-hidden">
                <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {entry.album.name}
                </span>
                <span className="ml-auto tabular-nums">
                  {msToTime(entry.duration_ms)}
                </span>
              </div>

              {/* Button */}
              <div className="flex">
                <button
                  type="button"
                  className="h-auto  self-center rounded-full border px-4 py-2 text-sm">
                  Aggiungi
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

type PlaylistParams = Pick<Playlist, "id">;

export const ShowPlaylist = () => {
  const params = useParams<PlaylistParams>();

  const { getPlaylistById } = usePlaylists();
  const { getUserByUsername } = useUsers();

  const playlist = useMemo(() => {
    return getPlaylistById(params.id!);
  }, []);

  // If not found, show NoMatch
  if (!playlist) return <NoMatch />;

  const owner = useMemo(() => getUserByUsername(playlist.owner), []);

  return (
    <>
      <Helmet>
        <title>
          {playlist.name} - {import.meta.env.VITE_SITE_TITLE}
        </title>
      </Helmet>

      <header>
        <Header />
      </header>

      <main className="mt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PlaylistHeader owner={owner} playlist={playlist} />
          <div className="mt-8">
            <SongSearch />
          </div>
        </div>
      </main>
    </>
  );
};
