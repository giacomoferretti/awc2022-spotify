import { BASE_API_URL, TOKEN_URL } from "./constants";
import { SearchType, SpotifyToken } from "./types";

type SpotifyTokenResult = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export const getClientCredentialsToken = async (
  clientId: string,
  clientSecret: string
): Promise<SpotifyToken> => {
  const response: SpotifyTokenResult = await (
    await fetch(TOKEN_URL, {
      method: "POST",
      body: new URLSearchParams({ grant_type: "client_credentials" }),
      headers: {
        Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
      },
    })
  ).json();

  return {
    token: response.access_token,
    tokenType: response.token_type,
    tokenExpiration: response.expires_in,
  };
};

export const search = async (
  token: string,
  query: string,
  type: SearchType[]
) => {
  // https://developer.spotify.com/documentation/web-api/reference/#/operations/search
  const response = await (
    await fetch(
      `${BASE_API_URL}/search?${new URLSearchParams({
        q: query,
        type: type.join(","),
      })}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).json();

  return response.data;
};
