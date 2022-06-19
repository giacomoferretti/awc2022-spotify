import { useEffect, useState } from "react";

import { useSpotify } from "@/context";
import { SpotifyTrack } from "@/types";
import { msToTime } from "@/utils/time";

export const SpotifySearch = () => {
  const { search } = useSpotify();

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SpotifyTrack[]>([]);

  useEffect(() => {
    if (query) {
      const delayDebounceFn = setTimeout(() => {
        console.log(query);

        search(query).then((response) => {
          console.log(response);
          setResult(response);
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
    <div className="mt-4 max-w-3xl">
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          className="w-full rounded border-0 bg-[#ffffff1a] p-2.5 text-sm text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:border-spotify-accent-base focus:ring-2 focus:ring-inset focus:ring-spotify-accent-base"
          value={query}
          onChange={onChangeHandler}
        />
      </form>
      {result.length > 0 ? (
        <h2>
          Found {result.length} result{result.length != 1 ? "s" : ""}
        </h2>
      ) : (
        <>
          <h2>No results found for &quot;{query}&quot;</h2>
          <h3>
            Please make sure your words are spelled correctly or use less or
            different keywords.
          </h3>
        </>
      )}
      <div className="mt-4 flex flex-col gap-2">
        {result.map((entry: any) => (
          <div
            key={entry.album.images[0].url}
            className="flex gap-4 rounded bg-[#ffffff1a] p-2">
            <img
              className="h-12 w-12 rounded"
              src={entry.album.images[0].url}
            />
            <div className="flex grow-[1.5] basis-0 flex-col overflow-hidden">
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {entry.name}
              </span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[#a7a7a7]">
                {entry.album.artists[0].name}
              </span>
            </div>
            <span className="grow-[1] basis-0 self-center overflow-hidden text-ellipsis whitespace-nowrap">
              {entry.album.name}
            </span>
            <span className="ml-auto mr-2 self-center tabular-nums">
              {msToTime(entry.duration_ms)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
