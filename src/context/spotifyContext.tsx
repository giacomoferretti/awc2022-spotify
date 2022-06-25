import { createContext, useContext, useEffect } from "react";

import { getClientCredentialsToken } from "@/api/spotify";
import { BASE_API_URL } from "@/api/spotify/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SpotifyArtist, SpotifyTrack } from "@/types";

interface SpotifyContextType {
  token: string | null;
  tokenExpiration: number | null;
  search: (query: string) => Promise<SpotifyTrack[]>;
  searchArtist: (query: string) => Promise<SpotifyArtist[]>;
}

const SpotifyContext = createContext<SpotifyContextType>(
  {} as SpotifyContextType
);

export const SpotifyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const spotify = useProvideSpotify();

  return (
    <SpotifyContext.Provider value={spotify}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => {
  return useContext(SpotifyContext);
};

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const LS_KEYS = {
  ACCESS_TOKEN: "SPOTIFY_ACCESS_TOKEN",
  EXPIRATION_TIMESTAMP: "SPOTIFY_TOKEN_EXPIRATION_TIMESTAMP",
};

const useProvideSpotify = (): SpotifyContextType => {
  const [token, setToken] = useLocalStorage<string | null>(
    LS_KEYS.ACCESS_TOKEN,
    null
  );
  const [tokenExpiration, setTokenExpiration] = useLocalStorage<number | null>(
    LS_KEYS.EXPIRATION_TIMESTAMP,
    null
  );

  const getToken = () => {
    return token || window.localStorage.getItem(LS_KEYS.ACCESS_TOKEN);
  };

  const getTokenExpiration = () => {
    const expiration = parseInt(
      window.localStorage.getItem(LS_KEYS.EXPIRATION_TIMESTAMP) || "0",
      10
    );

    return expiration !== 0 ? expiration : null;
  };

  const getNewToken = async () => {
    const token = getToken();
    const expiration = getTokenExpiration();

    if (token == null || expiration == null || Date.now() / 1000 > expiration) {
      console.log(
        "[spotify] token not available or expired, getting a new one..."
      );

      const tokenResponse = await getClientCredentialsToken(
        clientId,
        clientSecret
      );

      const expirationTimestamp = Math.floor(
        Date.now() / 1000 + tokenResponse.tokenExpiration
      );

      // Save token
      setToken(tokenResponse.token);
      setTokenExpiration(expirationTimestamp);

      // Return token
      return {
        token: tokenResponse.token,
        expiration: expirationTimestamp,
      };
    }

    return {
      token: token,
      expiration: expiration,
    };
  };

  const callEndpoint = async (path: string) => {
    const updatedToken = await getNewToken();

    // FIXME: Handle 401 and 404
    return await (
      await fetch(`${BASE_API_URL}${path}`, {
        headers: {
          Authorization: `Bearer ${updatedToken.token}`,
        },
      })
    ).json();
  };

  const search = async (query: string) => {
    const response = await callEndpoint(
      "/search?" +
        new URLSearchParams({
          q: query,
          type: "track",
        })
    );

    // // TODO: no paging, max 20 items
    return response.tracks.items;
  };

  const searchArtist = async (query: string) => {
    const response = await callEndpoint(
      "/search?" +
        new URLSearchParams({
          q: query,
          type: "artist",
          market: "IT",
        })
    );

    return response.artists.items;
  };

  useEffect(() => {
    // Get new token if not available
    getNewToken();
  }, []);

  return {
    token,
    tokenExpiration,
    search,
    searchArtist,
  };
};
