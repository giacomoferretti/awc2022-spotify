import {
  LightBulbIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";

import { Input } from "@/components/Input";
import { useSpotify, useUsers } from "@/context";
import { useDebounce } from "@/hooks/useDebounce";
import { useTrimmed } from "@/hooks/useTrimmed";
import { SpotifyArtist } from "@/types";

export const Artist = ({ artist }: { artist: SpotifyArtist }) => {
  const { getCurrentUser, addFavoriteArtist, removeFavoriteArtist } =
    useUsers();

  const user = getCurrentUser()!;

  const add = () => {
    console.log(`[Artist] adding ${artist.id}`);
    addFavoriteArtist(user.username, artist.id);
  };

  const remove = () => {
    console.log(`[Artist] removing ${artist.id}`);
    removeFavoriteArtist(user.username, artist.id);
  };

  const isSelected = user.favoriteArtists.includes(artist.id);

  return (
    // <div
    //   key={artist.id}
    //   title={artist.name}
    //   onClick={isSelected ? remove : add}
    //   className={classNames(
    //     "group w-full cursor-pointer rounded bg-neutral-800 p-3 transition duration-100 hover:bg-neutral-700",
    //     { "ring-2 ring-inset ring-spotify-accent-base": isSelected }
    //   )}>
    //   <div className="relative bg-neutral-700 pb-[100%] shadow-lg">
    //     {/* Image */}
    //     {artist.images.length !== 0 ? (
    //       <img
    //         className="absolute h-full w-full transform-gpu rounded-full object-cover object-center "
    //         src={artist.images[1].url}
    //       />
    //     ) : (
    //       <UserIcon className="absolute stroke-neutral-400 p-8" />
    //     )}

    //     {/* Action */}
    //     <div className="absolute right-0 bottom-0 translate-y-2 rounded-full bg-spotify-accent-base p-2 opacity-0 shadow transition group-hover:translate-y-0 group-hover:opacity-100">
    //       <PlusIcon className="h-5 w-5 stroke-black" />
    //     </div>
    //     {!isSelected ? (
    //       <div className="absolute flex h-full w-full items-center justify-center bg-spotify-accent-base opacity-0 transition group-hover:opacity-100">
    //         <div className="translate-y-2 transition group-hover:translate-y-0">
    //           <PlusIcon className="mx-auto h-6 w-6 stroke-black" />
    //           <span className="text-black">Aggiungi</span>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="absolute flex h-full w-full items-center justify-center rounded-full bg-spotify-accent-base opacity-0 transition group-hover:opacity-100">
    //         <div className="translate-y-2 transition group-hover:translate-y-0">
    //           <MinusIcon className="mx-auto h-6 w-6 stroke-black" />
    //           <span className="text-black">Rimuovi</span>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    //   <div className="mt-4 font-bold line-clamp-1">{artist.name}</div>
    // </div>
    <div
      title={artist.name}
      onClick={isSelected ? remove : add}
      className={classNames(
        "group w-full cursor-pointer rounded bg-neutral-800 p-3 transition duration-100 hover:bg-neutral-700",
        { "ring-2 ring-inset ring-spotify-accent-base": isSelected }
      )}>
      <div className="rounded-full bg-neutral-800 shadow-xl">
        <div className="relative rounded-full pb-[100%]">
          {/* Image */}
          {artist.images.length !== 0 ? (
            <img
              className="absolute h-full w-full transform-gpu rounded-full object-cover object-center"
              src={artist.images[1].url}
            />
          ) : (
            <UserIcon className="absolute stroke-neutral-400 p-8" />
          )}

          {/* Action */}
          {/* <div className="group absolute flex h-full w-full items-center justify-center rounded-full bg-neutral-900 bg-opacity-80 opacity-0 transition hover:opacity-100">
            <div className="translate-y-2 transition group-hover:translate-y-0">
              <MinusIcon className="mx-auto h-6 w-6" />
              <div>Carica foto</div>
            </div> */}
          <div className="absolute flex h-full w-full items-center justify-center rounded-full bg-spotify-accent-base opacity-0 transition group-hover:opacity-100">
            {!isSelected ? (
              <div className="translate-y-2 transition group-hover:translate-y-0">
                <PlusIcon className="mx-auto h-6 w-6 stroke-black" />
                <span className="text-black">Aggiungi</span>
              </div>
            ) : (
              <div className="translate-y-2 transition group-hover:translate-y-0">
                <MinusIcon className="mx-auto h-6 w-6 stroke-black" />
                <span className="text-black">Rimuovi</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 font-bold line-clamp-1">{artist.name}</div>
    </div>
  );
};

const artists = [
  "ariete",
  "andrea bocelli",
  "rocco hunt",
  "eros ramazzotti",
  "laura pausini",
  "ghali",
  "fred de palma",
  "pinguini tattici nucleari",
  "rhove",
  "geolier",
  "takagi & ketra",
  "zucchero",
  "salmo",
  "fedez",
  "sfera ebbasta",
  "blanco",
  "rkomi",
  "gue pequeno",
  "capo plaza",
  "marracash",
  "maneskin",
  "ernia",
  "tha supreme",
  "mara sattei",
];

export const ArtistsSelection = ({ isActive }: { isActive: boolean }) => {
  const { searchArtist } = useSpotify();

  const [query, trimmedQuery, setQuery] = useTrimmed("");
  const [result, setResult] = useState<SpotifyArtist[]>([]);

  const debouncedQuery = useDebounce(trimmedQuery, 400);

  const suggestedArtist = useMemo(
    () => artists[Math.floor(Math.random() * artists.length)],
    []
  );

  const set = () => {
    setQuery(suggestedArtist);
  };

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
  }, [debouncedQuery, searchArtist]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const showClearButton = () => {
    return query;
  };

  const clearInput = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setQuery("");
    setResult([]);
  };

  if (!isActive) return null;

  return (
    <>
      <div className="relative">
        <form role="search" onSubmit={onSubmitHandler}>
          <Input
            type="text"
            value={query}
            onChange={onChangeHandler}
            autoComplete="off"
            placeholder="Cerca un artista"
            className="w-full px-10 transition"
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
      </div>

      {!trimmedQuery && (
        <h2 className="mt-8 flex items-center justify-center text-neutral-500">
          <LightBulbIcon className="mr-2 inline h-6 w-6" />
          Cerca qualcuno! Prova con &quot;
          <span
            className="cursor-pointer text-white  hover:underline"
            onClick={set}>
            {suggestedArtist}
          </span>
          &quot;
        </h2>
      )}

      {trimmedQuery && result.length === 0 && (
        <div className="mt-4 text-center">
          <h2 className="text-lg font-bold">
            Nessun risultato trovato per &quot;
            <span>{trimmedQuery}</span>
            &quot;
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
