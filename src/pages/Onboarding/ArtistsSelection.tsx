import {
  MinusIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";

import noCoverImage from "@/assets/nocover.png";
import { useSpotify, useUsers } from "@/context";
import { Input } from "@/design/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SpotifyArtist } from "@/types";

export const Artist = ({ artist }: { artist: SpotifyArtist }) => {
  const { getCurrentUser, addFavoriteArtist, removeFavoriteArtist } =
    useUsers();

  const user = useMemo(() => {
    return getCurrentUser();
  }, [getCurrentUser]);

  const add = () => {
    console.log(`[Artist] adding ${artist.id}`);
    addFavoriteArtist(user!.username, artist.id);
  };

  const remove = () => {
    console.log(`[Artist] removing ${artist.id}`);
    removeFavoriteArtist(user!.username, artist.id);
  };

  const isSelected = user!.favoriteArtists.includes(artist.id);

  return (
    <div
      key={artist.id}
      title={artist.name}
      onClick={isSelected ? remove : add}
      className={classNames(
        "group w-full cursor-pointer rounded bg-neutral-800 p-3 transition duration-100 hover:bg-neutral-700",
        { "ring ring-inset ring-spotify-accent-base": isSelected }
      )}>
      <div className="relative overflow-hidden rounded-full bg-neutral-700 pb-[100%] shadow-lg">
        {/* Image */}
        {artist.images.length !== 0 ? (
          <img
            className="absolute h-full w-full transform-gpu  object-cover object-center "
            src={artist.images[1].url}
          />
        ) : (
          <UserIcon className="absolute stroke-neutral-400 p-8" />
        )}

        {/* Action */}
        {/* <div className="absolute right-0 bottom-0 translate-y-2 rounded-full bg-spotify-accent-base p-2 opacity-0 shadow transition group-hover:translate-y-0 group-hover:opacity-100">
          <PlusIcon className="h-5 w-5 stroke-black" />
        </div> */}
        {!isSelected ? (
          <div className="absolute flex h-full w-full items-center justify-center bg-spotify-accent-base opacity-0 transition group-hover:opacity-100">
            <div className="translate-y-2 transition group-hover:translate-y-0">
              <PlusIcon className="mx-auto h-6 w-6 stroke-black" />
              <span className="text-black">Aggiungi</span>
            </div>
          </div>
        ) : (
          <div className="absolute flex h-full w-full items-center justify-center rounded-full bg-spotify-accent-base opacity-0 transition group-hover:opacity-100">
            <div className="translate-y-2 transition group-hover:translate-y-0">
              <MinusIcon className="mx-auto h-6 w-6 stroke-black" />
              <span className="text-black">Rimuovi</span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 font-bold line-clamp-1">{artist.name}</div>
    </div>
  );
};

export const ArtistsSelection = () => {
  const { searchArtist } = useSpotify();

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SpotifyArtist[]>([]);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery) {
      searchArtist(debouncedQuery)
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

  const showClearButton = () => {
    return query.trim() !== "";
  };

  const clearInput = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setQuery("");
    setResult([]);
  };

  return (
    <>
      <div className="relative">
        <form role="search">
          <Input
            type="text"
            value={query}
            onChange={onChangeHandler}
            autoComplete="off"
            placeholder="Cerca un artista"
            className="w-full px-10"
          />
        </form>
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <span className="flex-1 pl-3">
            <SearchIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          {showClearButton() && (
            <button
              onPointerDown={clearInput}
              className="pointer-events-auto px-2.5 text-neutral-400 hover:text-white">
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
        {/* <form
          onSubmit={onSubmitHandler}
          className="flex rounded border-0 bg-neutral-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-spotify-accent-base">
          <input
            value={query}
            onChange={onChangeHandler}
            type="text"
            autoComplete="off"
            placeholder="Cerca un artista"
            className="flex-1 border-none bg-transparent p-2.5 text-sm text-neutral-300 placeholder:text-neutral-300 focus:ring-0"
          />
          {showClearButton() && (
            <button
              onPointerDown={clearInput}
              className="px-2.5 text-neutral-400 hover:text-white">
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
          <button
            type="submit"
            className="px-2.5 text-neutral-400 hover:text-white">
            <SearchIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </form> */}
      </div>

      {query && result.length === 0 && (
        <div className="mt-4 text-center">
          <h2 className="text-lg font-bold">
            Nessun risultato trovato per &quot;
            <span className="whitespace-pre">{query}</span>&quot;
          </h2>
          <h3>
            Controlla di aver digitato tutte le parole correttamente o usa meno
            parole chiave o parole diverse.
          </h3>
        </div>
      )}

      {result.length > 0 && (
        <div className="mt-4 grid grid-cols-[repeat(4,minmax(0,1fr))] gap-4">
          {result.map((entry) => {
            return <Artist key={entry.id} artist={entry} />;
          })}
        </div>
      )}
    </>
  );
};

// ArtistsSelection.title = "";
// ArtistsSelection.subtitle = "";

export default ArtistsSelection;
