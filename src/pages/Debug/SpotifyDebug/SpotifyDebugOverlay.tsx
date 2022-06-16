import { useSpotify } from "@/context";
import { useEpoch } from "@/hooks/useEpoch";

export const SpotifyDebugOverlay = () => {
  const { token, tokenExpiration } = useSpotify();

  const epoch = useEpoch();

  return (
    <div className="fixed top-0 right-0 space-y-2 p-4 text-right text-xs opacity-25">
      <p>
        Client ID:{" "}
        <span className="rounded bg-gray-700 py-1 px-2 font-mono">
          {import.meta.env.VITE_SPOTIFY_CLIENT_ID}
        </span>
      </p>
      <p>
        Client Secret:{" "}
        <span className="rounded bg-gray-700 py-1 px-2 font-mono">
          {import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}
        </span>
      </p>
      <p>
        Spotify Token:{" "}
        <span className="rounded bg-gray-700 py-1 px-2 font-mono">
          {token ? token : "N/A"}
        </span>
      </p>
      <p>
        Token expires in:{" "}
        <span className="rounded bg-gray-700 py-1 px-2 font-mono">
          {tokenExpiration ? tokenExpiration - epoch : "N/A"}
        </span>
      </p>
    </div>
  );
};
