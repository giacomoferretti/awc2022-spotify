import axios from "redaxios";
import { BASE_API_URL, TOKEN_URL } from "./constants";
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

export const search = async (
  token: string,
  query: string,
  type: SearchType[]
) => {
  // https://developer.spotify.com/documentation/web-api/reference/#/operations/search
  const response = await axios.get(`${BASE_API_URL}/search`, {
    params: { q: query, type: type },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
