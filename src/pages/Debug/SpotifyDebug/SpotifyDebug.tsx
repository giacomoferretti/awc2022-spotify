import { Helmet } from "react-helmet-async";

import { SpotifyDebugOverlay } from "./SpotifyDebugOverlay";
import { SpotifySearch } from "./SpotifySearch";

export const SpotifyDebug = () => {
  return (
    <>
      <Helmet>
        <title>Spotify Debug</title>
      </Helmet>
      <div className="p-4">
        <SpotifyDebugOverlay />

        <h1 className="text-4xl font-bold">Spotify Debug</h1>
        <SpotifySearch />
      </div>
    </>
  );
};
