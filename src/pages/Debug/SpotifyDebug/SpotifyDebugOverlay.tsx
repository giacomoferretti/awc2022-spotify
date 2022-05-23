import { useEffect, useState } from "react";
import { useSpotify } from "@context";
import { useEpoch } from "@/hooks/useEpoch";

export const SpotifyDebugOverlay = () => {
  const { token, tokenExpiration } = useSpotify();

  const epoch = useEpoch();

  return (
    <div className="fixed opacity-25 top-0 right-0 text-xs text-right space-y-2 p-4">
      <p>
        Client ID:{" "}
        <span className="bg-gray-700 py-1 px-2 rounded font-mono">
          {import.meta.env.VITE_SPOTIFY_CLIENT_ID}
        </span>
      </p>
      <p>
        Client Secret:{" "}
        <span className="bg-gray-700 py-1 px-2 rounded font-mono">
          {import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}
        </span>
      </p>
      <p>
        Spotify Token:{" "}
        <span className="bg-gray-700 py-1 px-2 rounded font-mono">
          {token ? token : "N/A"}
        </span>
      </p>
      <p>
        Token expires in:{" "}
        <span className="bg-gray-700 py-1 px-2 rounded font-mono">
          {tokenExpiration ? tokenExpiration - epoch : "N/A"}
        </span>
      </p>
    </div>
  );
};
