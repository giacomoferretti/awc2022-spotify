import { createContext, useContext, useEffect, useState } from "react";
import { getClientCredentialsToken } from "@api/spotify";

interface SpotifyContextType {
  token: string | null;
}

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const SpotifyContext = createContext<SpotifyContextType>(null!);

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

export function useSpotify() {
  return useContext(SpotifyContext);
}

const LS_KEYS = {
  ACCESS_TOKEN: "SPOTIFY_ACCESS_TOKEN",
  EXPIRATION_TIMESTAMP: "SPOTIFY_TOKEN_EXPIRATION_TIMESTAMP",
  TOKEN_TYPE: "SPOTIFY_TOKEN_TYPE",
};

const useProvideSpotify = () => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenType, setTokenType] = useState<string | null>(null);
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);

  const getNewToken = () => {
    console.log("[spotify] getting new token...");

    getClientCredentialsToken(clientId, clientSecret).then((tokenResponse) => {
      const expirationTimestamp = Math.floor(
        Date.now() / 1000 + tokenResponse.tokenExpiration
      );

      window.localStorage.setItem(LS_KEYS.ACCESS_TOKEN, tokenResponse.token);
      window.localStorage.setItem(
        LS_KEYS.EXPIRATION_TIMESTAMP,
        expirationTimestamp.toString()
      );
      window.localStorage.setItem(LS_KEYS.TOKEN_TYPE, tokenResponse.tokenType);

      setToken(tokenResponse.token);
      setTokenType(tokenResponse.tokenType);
      setTokenExpiration(expirationTimestamp);
    });
  };

  const invalidateToken = () => {
    try {
      Object.values(LS_KEYS).forEach((key) => {
        window.localStorage.removeItem(key);
      });
    } catch (err) {
      console.error(err);
    }

    setToken(null);
    setTokenType(null);
    setTokenExpiration(null);
  };

  useEffect(() => {
    try {
      const accessToken = window.localStorage.getItem(LS_KEYS.ACCESS_TOKEN);
      const expirationTimestamp = parseInt(
        window.localStorage.getItem(LS_KEYS.EXPIRATION_TIMESTAMP) || "0",
        10
      );
      const tokenType = window.localStorage.getItem(LS_KEYS.TOKEN_TYPE);

      if (
        accessToken &&
        expirationTimestamp &&
        Number.isInteger(expirationTimestamp) &&
        tokenType
      ) {
        setToken(accessToken);
        setTokenType(tokenType);
        setTokenExpiration(expirationTimestamp);
      } else {
        getNewToken();
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  return { token };
};
