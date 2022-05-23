import { useSpotify } from "@context";
import { useEffect, useState } from "react";
import { search as spotifySearch } from "./api/spotify";

const SearchResult = () => {
  return (
    <div>
      <img src="https://i.scdn.co/image/ab67616d0000b2736df5cc472d61a635abab06cf" />
    </div>
  );
};

// type Track = {
//   album: SimplifiedAlbum;
//   artists: SimplifiedArtist[];
//   available_markets?: string[];
//   disc_number: number;
//   duration_ms: number;
//   episode?: boolean;
//   explicit: boolean;
//   external_ids: ExternalID;
//   external_urls: ExternalURL;
//   href: string;
//   id: string;
//   is_playable?: boolean;
//   linked_from?: TrackLink;
//   restrictions?: Restrictions;
//   name: string;
//   popularity: number;
//   preview_url: string | null;
//   track?: boolean;
//   track_number: number;
//   type: 'track';
//   uri: string;
//   is_local: boolean;
// };

const Search = () => {
  const spotify = useSpotify();

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (query) {
      const delayDebounceFn = setTimeout(() => {
        console.log(query);

        spotifySearch(spotify.token!, query, ["track"]).then((res) => {
          setResult(res.tracks.items);
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

  return (
    <div>
      <form>
        <input
          type="text"
          className="w-full p-2.5 text-sm rounded border-0 bg-[#ffffff1a] text-[#ffffffb3] placeholder:text-[#ffffffb3] focus:ring-inset focus:ring-2 focus:ring-spotify-accent-base focus:border-spotify-accent-base"
          value={query}
          onChange={onChangeHandler}
        />
      </form>
      <div>
        {result.map((entry) => (
          <div>
            <SearchResult />
            {JSON.stringify(entry)}
          </div>
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="p-8">
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
      <h1 className="text-4xl font-bold">Spotify</h1>
    </header>
  );
};

const DebugData = () => {
  const spotify = useSpotify();

  return (
    <div className="fixed opacity-25 top-0 right-0 text-xs text-right">
      <p>
        Client ID:{" "}
        <span className="bg-gray-700 py-1 px-2 rounded-lg font-mono">
          {import.meta.env.VITE_SPOTIFY_CLIENT_ID}
        </span>
      </p>
      <p>
        Client Secret:{" "}
        <span className="bg-gray-700 py-1 px-2 rounded-lg font-mono">
          {import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}
        </span>
      </p>
      <p>
        Spotify Token:{" "}
        <span className="bg-gray-700 py-1 px-2 rounded-lg font-mono">
          {spotify.token}
        </span>
      </p>
      <p>
        Is Token Expired:{" "}
        <span className="bg-gray-700 py-1 px-2 rounded-lg font-mono">
          false
        </span>
      </p>
    </div>
  );
};

const App = () => {
  // const spotify = useSpotify();

  return (
    // <div className="min-h-screen bg-neutral-900 flex items-center justify-center flex-col text-white gap-4">
    //   <h1 className="text-4xl mb-4 font-bold">Spotify</h1>
    //   <h2 className="text-2xl font-mono">
    //     {import.meta.env.VITE_SPOTIFY_CLIENT_ID}
    //   </h2>
    //   <h2 className="text-2xl font-mono">
    //     {import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}
    //   </h2>
    //   <div></div>
    //   {/* <h2>{spotify.token ? spotify.token : "Loading"}</h2> */}
    //   <Search />
    // </div>
    <>
      <DebugData />
      <Header />
    </>
  );
};

export default App;
