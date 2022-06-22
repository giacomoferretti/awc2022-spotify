import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationCircleIcon,
  GlobeIcon,
  InformationCircleIcon,
  LockClosedIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

import noCoverImage from "@/assets/nocover.png";
import { ValidationError } from "@/components/ValidationError";
import { usePlaylists, useSpotify, useTracks, useUsers } from "@/context";
import { useDebounce } from "@/hooks/useDebounce";
import { NoMatch } from "@/pages/NoMatch";
import { Playlist, SpotifyTrack, Track, User } from "@/types";
import { msToTime, msToTimeLong } from "@/utils/time";

type UserFormInputs = Pick<Playlist, "name" | "description">;

const PlaylistDetailsModal = ({
  playlist,
  isOpen,
  setIsOpen,
}: {
  playlist: Playlist;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setPlaylistName, setPlaylistDescription } = usePlaylists();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    setPlaylistName(playlist.id, data.name);
    setPlaylistDescription(playlist.id, data.description);

    setIsOpen(false);
  };

  return (
    // <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
    //   <Dialog.Panel>
    //     <Dialog.Title>Deactivate account</Dialog.Title>
    //     <Dialog.Description>
    //       This will permanently deactivate your account
    //     </Dialog.Description>

    //     <p>
    //       Are you sure you want to deactivate your account? All of your data
    //       will be permanently removed. This action cannot be undone.
    //     </p>

    //     <button onClick={() => setIsOpen(false)}>Deactivate</button>
    //     <button onClick={() => setIsOpen(false)}>Cancel</button>
    //   </Dialog.Panel>
    // </Dialog>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  Modifica dettagli playlist
                </Dialog.Title>
                <div className="mt-2">
                  {/* <p className="text-sm">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p> */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-4 flex flex-col gap-6">
                    {/* Playlist title */}
                    <div>
                      <label>
                        <span className="mb-2 block text-sm font-medium">
                          Titolo della playlist
                        </span>
                        <input
                          id="name"
                          type="text"
                          placeholder="Inserisci il titolo della playlist."
                          defaultValue={playlist.name}
                          className="w-full rounded border-0 bg-[#ffffff1a] p-2.5 text-sm text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:border-spotify-accent-base focus:ring-2 focus:ring-inset focus:ring-spotify-accent-base"
                          {...register("name", {
                            required: "Inserisci un titolo",
                          })}
                        />
                      </label>
                      {errors.name && (
                        <ValidationError message={errors.name.message} />
                      )}
                    </div>

                    {/* Playlist description */}
                    <div>
                      <label>
                        <span className="mb-2 block text-sm font-medium">
                          Descrizione della playlist
                        </span>
                        <textarea
                          id="name"
                          placeholder="Inserisci la descrizione della playlist."
                          rows={4}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              return false;
                            }
                          }}
                          className="w-full resize-none rounded border-0 bg-[#ffffff1a] p-2.5 text-sm text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:border-spotify-accent-base focus:ring-2 focus:ring-inset focus:ring-spotify-accent-base"
                          {...register("description")}
                        />
                        <span className="mt-2 flex space-x-1 text-sm text-neutral-400">
                          <InformationCircleIcon className="h-5 w-5 flex-shrink-0" />
                          <span>
                            Nella descrizione non si può andare a capo.
                          </span>
                        </span>
                      </label>
                    </div>

                    <button
                      className="flex items-center self-center rounded-full bg-spotify-accent-base py-3 px-8 font-bold text-black hover:bg-spotify-accent-highlight"
                      type="submit">
                      Salva
                    </button>
                  </form>
                </div>

                {/* <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setIsOpen(false)}>
                    Got it, thanks!
                  </button>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const PlaylistHeader = ({
  owner,
  playlist,
  duration,
}: {
  owner: User;
  playlist: Playlist;
  duration: number;
}) => {
  const { setVisibilityPlaylist } = usePlaylists();

  const changePlaylistVisibility = (visibility: boolean) => () => {
    setVisibilityPlaylist(playlist.id, visibility);
  };

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex gap-4">
        <div className="h-40 w-40 flex-shrink-0 self-end bg-neutral-800">
          <div className="relative pb-[100%]">
            <img className="absolute h-full" src={noCoverImage} />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-end">
          {/* <button type="button" onClick={openModal} title="Modifica dettagli"> */}
          <button
            type="button"
            onClick={changePlaylistVisibility(!playlist.isPublic)}
            title={playlist.isPublic ? "Rendi privata" : "Rendi pubblica"}
            className="mb-2 flex items-center gap-2 text-sm text-neutral-400 hover:underline">
            {playlist.isPublic ? (
              <>
                <GlobeIcon className="h-4 w-4" /> {"Playlist pubblica"}
              </>
            ) : (
              <>
                <LockClosedIcon className="h-4 w-4" /> {"Playlist privata"}
              </>
            )}
          </button>
          <h1
            onClick={openDialog}
            className="flex items-center gap-4 py-1 text-left text-5xl font-bold line-clamp-3 hover:cursor-pointer hover:underline">
            {playlist.name}
          </h1>
          {/* <span onClick={openDialog} className="py-1 line-clamp-3">
            <h2 className="group flex items-center gap-4 text-left text-5xl font-bold hover:cursor-pointer hover:underline">
              {playlist.name}
              <PencilIcon className="invisible h-10 w-10 group-hover:visible" />
            </h2>
          </span> */}
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
              <>
                <span
                  data-before="•"
                  className="whitespace-nowrap before:mx-1 before:content-[attr(data-before)]">
                  {playlist.tracks.length} brani,{" "}
                  <span className="text-neutral-400">
                    {msToTimeLong(duration)}
                  </span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <PlaylistDetailsModal
        playlist={playlist}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

const SearchResult = ({
  playlist,
  entry,
}: {
  playlist: Playlist;
  entry: SpotifyTrack;
}) => {
  const { addTrackToPlaylist } = usePlaylists();
  const { addTrack } = useTracks();

  const addSong = () => {
    addTrackToPlaylist(playlist.id, entry.id);
    addTrack({
      id: entry.id,
      name: entry.name,
      artists: entry.artists,
      album: entry.album,
      duration: entry.duration_ms,
    });
  };

  return (
    <div
      key={entry.id}
      className="grid grid-cols-[3fr_2fr_minmax(7em,_auto)] gap-4 rounded p-2 hover:bg-neutral-800">
      {/* Image + Title + Artits */}
      <div className="flex min-w-0 gap-4">
        <img className="h-12 w-12 rounded" src={entry.album.images[2].url} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
            {entry.name}
          </span>
          <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-neutral-400">
            {entry.artists.map((x) => x.name).join(", ")}
          </span>
        </div>
      </div>

      {/* Album */}
      <div className="flex min-w-0 items-center gap-4 overflow-hidden">
        <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          {entry.album.name}
        </span>
        <span className="ml-auto tabular-nums">
          {msToTime(entry.duration_ms)}
        </span>
      </div>

      {/* Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={addSong}
          className="h-auto self-center rounded-full border border-neutral-500 px-4 py-2 text-sm hover:border-white">
          Aggiungi
        </button>
      </div>
    </div>
  );
};

const SongSearch = ({ playlist }: { playlist: Playlist }) => {
  const { search } = useSpotify();

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SpotifyTrack[]>([]);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery) {
      search(query)
        .then((response) => {
          setResult(response);
        })
        .catch(() => {
          setResult([]);
        });
    } else {
      setResult([]);
    }
  }, [debouncedQuery]);

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
            <SearchResult key={entry.id} entry={entry} playlist={playlist} />
          ))}
        </div>
      )}
    </>
  );
};

const TrackEntry = ({
  playlist,
  index,
  trackId,
}: {
  playlist: Playlist;
  index: number;
  trackId: Track["id"];
}) => {
  const { removeTrackFromPlaylistAtPos } = usePlaylists();
  const { getTrackById } = useTracks();

  const track = useMemo(() => getTrackById(trackId), []);

  const removeSong = () => {
    removeTrackFromPlaylistAtPos(playlist.id, index);
  };

  return (
    <div
      key={track.id}
      className="grid grid-cols-[3fr_2fr_minmax(7em,_auto)] gap-4 rounded p-2 hover:bg-neutral-800">
      {/* Image + Title + Artits */}
      <div className="flex min-w-0 gap-4">
        <img className="h-12 w-12 rounded" src={track.album.images[2].url} />
        <div className="=flex-1 flex flex-col overflow-hidden">
          <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
            {track.name}
          </span>
          <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-neutral-600">
            {track.artists.map((x) => x.name).join(", ")}
          </span>
        </div>
      </div>

      {/* Album */}
      <div className="flex items-center gap-4 overflow-hidden">
        <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          {track.album.name}
        </span>
        <span className="ml-auto tabular-nums">{msToTime(track.duration)}</span>
      </div>

      {/* Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={removeSong}
          className="h-auto self-center rounded-full border border-neutral-500 px-4 py-2 text-sm hover:border-white">
          Rimuovi
        </button>
      </div>
    </div>
  );
};

type PlaylistParams = Pick<Playlist, "id">;

export const ShowPlaylist = () => {
  const params = useParams<PlaylistParams>();

  const { getPlaylistById } = usePlaylists();
  const { getUserByUsername } = useUsers();
  const { getTrackById } = useTracks();

  const playlist = useMemo(() => {
    try {
      return getPlaylistById(params.id!);
    } catch (error) {
      // console.error(error);
      return null;
    }
  }, []);

  // If not found, show NoMatch
  if (!playlist) return <NoMatch />;

  const playlistDuration = useMemo(() => {
    return playlist.tracks.reduce((sum, track) => {
      return sum + getTrackById(track.id).duration;
    }, 0);
  }, [playlist.tracks]);

  const owner = useMemo(() => getUserByUsername(playlist.owner), []);

  return (
    <>
      <Helmet>
        <title>
          {playlist.name} - {import.meta.env.VITE_SITE_TITLE}
        </title>
      </Helmet>

      <div className="mt-8">
        <PlaylistHeader
          owner={owner}
          playlist={playlist}
          duration={playlistDuration}
        />

        {playlist.tracks.map((key, index) => (
          <div key={`${key.id}_${key.addedTimestamp}`} className="mt-2">
            <TrackEntry playlist={playlist} trackId={key.id} index={index} />
          </div>
        ))}

        <div className="mt-8">
          <SongSearch playlist={playlist} />
        </div>
      </div>
    </>
  );
};
