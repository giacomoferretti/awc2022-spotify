import axios from "redaxios";
import { TOKEN_URL } from "./constants";
import { SearchType, SpotifyToken } from "./types";

export const getClientCredentialsToken = async (
  clientId: string,
  clientSecret: string
): Promise<SpotifyToken> => {
  const response = await axios.post(
    TOKEN_URL,
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
      },
    }
  );

  return {
    token: response.data.access_token,
    tokenType: response.data.token_type,
    tokenExpiration: parseInt(response.data.expires_in, 10),
  };
};

export const search = async (query: string, type: SearchType[]) => {
  // https://developer.spotify.com/documentation/web-api/reference/#/operations/search
};
