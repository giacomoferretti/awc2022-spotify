import { createContext, useContext, useEffect, useState } from "react";
import {
  getClientCredentialsToken,
  search as spotifySearch,
  SpotifyToken,
} from "@api/spotify";
import { BASE_API_URL } from "@api/spotify/constants";

interface SpotifyContextType {
  token: string | null;
  tokenExpiration: number | null;
  search: (query: string) => Promise<any>;
}

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

export const useSpotify = () => {
  return useContext(SpotifyContext);
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const LS_KEYS = {
  ACCESS_TOKEN: "SPOTIFY_ACCESS_TOKEN",
  EXPIRATION_TIMESTAMP: "SPOTIFY_TOKEN_EXPIRATION_TIMESTAMP",
  // TOKEN_TYPE: "SPOTIFY_TOKEN_TYPE",
};

const useProvideSpotify = () => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenType, setTokenType] = useState<string | null>(null);
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);

  // const callEndpoint = async ({ path, method = "GET" }) => {
  //   // if (hasTokenExpired()) {
  //   //   invalidateToken();

  //   //   throw new Error("Token has expired.");
  //   // }

  //   return await (
  //     await fetch(`${BASE_API_URL}${path}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       method,
  //     })
  //   ).json();
  // };

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
      //window.localStorage.setItem(LS_KEYS.TOKEN_TYPE, tokenResponse.tokenType);

      setToken(tokenResponse.token);
      setTokenType(tokenResponse.tokenType);
      setTokenExpiration(expirationTimestamp);

      console.log("[spotify] token saved.");
    });
  };

  const hasTokenExpired = () => {
    try {
      const accessToken =
        token || window.localStorage.getItem(LS_KEYS.ACCESS_TOKEN);
      const expTimestamp =
        tokenExpiration ||
        parseInt(
          window.localStorage.getItem(LS_KEYS.EXPIRATION_TIMESTAMP) || "0",
          10
        );

      if (!accessToken || !expTimestamp || isNaN(expTimestamp)) {
        return false;
      }

      return Date.now() / 1000 > expTimestamp;
    } catch (err) {
      console.error(err);

      return true;
    }
  };

  const invalidateToken = () => {
    console.log("[spotify] invalidating token...");

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

    console.log("[spotify] token cleared.");
  };

  useEffect(() => {
    // try {
    //   const accessToken = window.localStorage.getItem(LS_KEYS.ACCESS_TOKEN);
    //   const expirationTimestamp = parseInt(
    //     window.localStorage.getItem(LS_KEYS.EXPIRATION_TIMESTAMP) || "0",
    //     10
    //   );
    //   const tokenType = window.localStorage.getItem(LS_KEYS.TOKEN_TYPE);
    //   if (
    //     accessToken &&
    //     expirationTimestamp &&
    //     Number.isInteger(expirationTimestamp) &&
    //     tokenType
    //   ) {
    //     setToken(accessToken);
    //     setTokenType(tokenType);
    //     setTokenExpiration(expirationTimestamp);
    //   } else {
    //     getNewToken();
    //   }
    // } catch (err) {
    //   console.error(err);
    // }

    const token = getToken();
    const expiration = getTokenExpiration();
    if (token && expiration) {
      setToken(token);
      setTokenExpiration(expiration);
    } else {
      getRefreshToken();
    }
  }, []);

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

  const getRefreshToken = async () => {
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
      window.localStorage.setItem(LS_KEYS.ACCESS_TOKEN, tokenResponse.token);
      window.localStorage.setItem(
        LS_KEYS.EXPIRATION_TIMESTAMP,
        expirationTimestamp.toString()
      );

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
    const updatedToken = await getRefreshToken();

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

    // console.log(response.status);

    // const data = await response.json();

    // if (response.status === 401) {
    //   const data = await response.json();

    //   console.log(data);

    //   if (
    //     data.error.status === 401 &&
    //     data.error.message === "The access token expired"
    //   ) {
    //     // Refresh token
    //   }
    // }

    // console.log(data);

    // const.then(
    //   (res) => {
    //     const body = await res.json();

    //     // Check if token has expired
    //     if (res.status == 401 )

    //     if (res.status >= 400) {
    //       throw new Error("Server responds with error!");
    //     }

    //     return res;
    //   },
    //   (err) => {
    //     console.log("ERROR>>>");
    //     console.error(err);
    //   }
    // );

    // return response;

    // , {
    //     params: { q: query, type: ["track"] },
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "User-Agent": "gcmo/1.0.0",
    //     },
    //   })
    //   .then((response) => {})
    //   .catch((error) => {
    //     console.error(error);
    //   });

    console.log(response);

    // // TODO: no paging, max 20 items
    return response.tracks.items;
  };

  return {
    token,
    tokenExpiration,
    search,
  };
};
