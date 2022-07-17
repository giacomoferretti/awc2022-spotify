import Fuse from "fuse.js";
import { useEffect, useState } from "react";

import { SearchInput } from "@/components/Input/SearchInput";
import { PlaylistList } from "@/components/PlaylistList";
import { usePlaylists, useTracks } from "@/context";
import { useDebounce } from "@/hooks/useDebounce";
import { useTrimmed } from "@/hooks/useTrimmed";
import { Playlist } from "@/types";

const Search = () => {
  const { playlists } = usePlaylists();
  const { getTrackById } = useTracks();

  const [query, trimmedQuery, setQuery] = useTrimmed("");
  const [result, setResult] = useState<any>([]);

  const debouncedQuery = useDebounce(trimmedQuery, 400);

  const showClearButton = () => {
    return query != null && query !== "";
  };

  const clearInput = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setQuery("");
    setResult([]);
  };

  const onChangeHandler = (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(value);
  };

  useEffect(() => {
    if (debouncedQuery) {
      // Search

      // Filter public playlists
      const data = Object.values(playlists).filter(
        (playlist) => playlist.isPublic
      );

      // Transform
      const dataNew = data.map((playlist) => {
        const tracks = playlist.tracks
          .map((track) => getTrackById(track.id))
          .map((track) => ({
            name: track.name,
          }));

        console.log(tracks);

        return {
          id: playlist.id,
          name: playlist.name,
          description: playlist.description,
          tracks: tracks,
        };
      });

      const fuse = new Fuse(dataNew, {
        keys: ["name", "description", "tracks.name"],
      });

      console.log("data", dataNew);
      console.log("fuse", fuse.search(debouncedQuery));

      setResult(fuse.search(debouncedQuery).map((v) => v.item.id));
    } else {
      setResult([]);
    }
  }, [debouncedQuery, playlists]);

  return (
    <>
      <SearchInput
        value={query}
        placeholder="Cerca playlist"
        onChangeValue={onChangeHandler}
        displayClearButton={showClearButton}
        clearButton={clearInput}
        className="w-full"
      />

      {query && result.length === 0 && (
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
        <div className="mt-4 flex flex-col pb-16">
          <PlaylistList playlists={result} />
        </div>
      )}

      {/* <ol className="list-decimal">
        {result.map((playlist) => (
          <li key={playlist.id}>{JSON.stringify(playlist)}</li>
        ))}
      </ol> */}
    </>
  );
};

export default Search;
