import { useSpotify } from "@context";

const App = () => {
  const spotify = useSpotify();

  return (
    <div className="h-full bg-neutral-900 flex items-center justify-center flex-col text-white gap-4">
      <h1 className="text-4xl mb-4 font-bold">Spotify</h1>
      <h2 className="text-2xl font-mono">
        {import.meta.env.VITE_SPOTIFY_CLIENT_ID}
      </h2>
      <h2 className="text-2xl font-mono">
        {import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}
      </h2>
      <h2>{spotify.token ? spotify.token : "Loading"}</h2>
    </div>
  );
};

export default App;
