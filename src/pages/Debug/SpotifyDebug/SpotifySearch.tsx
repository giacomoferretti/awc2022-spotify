import { msToTime } from "@/utils/time";
import { useSpotify } from "@context";
import { useEffect, useState } from "react";

export const SpotifySearch = () => {
  const { search } = useSpotify();

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

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
    <div className="max-w-3xl mt-4">
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          className="w-full p-2.5 text-sm rounded border-0 bg-[#ffffff1a] text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:ring-inset focus:ring-2 focus:ring-spotify-accent-base focus:border-spotify-accent-base"
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
          <h2>No results found for "{query}"</h2>
          <h3>
            Please make sure your words are spelled correctly or use less or
            different keywords.
          </h3>
        </>
      )}
      <div className="flex flex-col gap-2 mt-4">
        {result.map((entry: any) => (
          <div className="flex bg-[#ffffff1a] p-2 rounded gap-4">
            <img
              className="w-12 h-12 rounded"
              src={entry.album.images[0].url}
            />
            <div className="flex flex-col basis-0 grow-[1.5] overflow-hidden">
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {entry.name}
              </span>
              <span className="text-[#a7a7a7] whitespace-nowrap overflow-hidden text-ellipsis">
                {entry.album.artists[0].name}
              </span>
            </div>
            <span className="self-center grow-[1] basis-0 text-ellipsis overflow-hidden whitespace-nowrap">
              {entry.album.name}
            </span>
            <span className="self-center ml-auto tabular-nums mr-2">
              {msToTime(entry.duration_ms)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
