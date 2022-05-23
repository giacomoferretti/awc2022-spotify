import axios from "redaxios";
import { createContext, useContext, useEffect, useState } from "react";
import { TOKEN_URL } from "@api/spotify/constants";

interface TokenContextType {
  token: string | null;
  isExpired: boolean;
  checkToken: () => void;
}

const TokenContext = createContext<TokenContextType>(null!);

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useProvideToken();

  return (
    <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
  );
};

export const useToken = () => {
  return useContext(TokenContext);
};

const useProvideToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenType, setTokenType] = useState<string | null>(null);
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);

  const getNewToken = () => {
    axios
      .post(
        TOKEN_URL,
        new URLSearchParams({ grant_type: "client_credentials" }),
        {
          headers: {
            Authorization:
              "Basic " +
              btoa(
                `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${
                  import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
                }`
              ),
          },
        }
      )
      .then((response) => {
        // const expirationTimestamp = Math.floor(
        //   Date.now() / 1000 + parseInt(response.data.expires_in, 10)
        // );
        const expirationTimestamp = Math.floor(Date.now() / 1000 + 10);

        setToken(response.data.access_token);
        setTokenType(response.data.token_type);
        setTokenExpiration(expirationTimestamp);
      });
  };

  const checkExpiration = () => {
    if (token && tokenExpiration) {
      console.log(Math.floor(Date.now() / 1000) >= tokenExpiration);

      if (Math.floor(Date.now() / 1000) >= tokenExpiration) {
        getNewToken();
      }
    }
  };

  useEffect(() => {
    if (!token && !tokenType && !tokenExpiration) {
      getNewToken();
    }
  }, []);

  return {
    token: token,
    isExpired: Math.floor(Date.now() / 1000) >= tokenExpiration!,
    checkToken: checkExpiration,
  };
};
