export type SpotifyToken = {
  token: string;
  tokenType: string;
  tokenExpiration: number;
};

export type SearchType =
  | "album"
  | "artist"
  | "playlist"
  | "track"
  | "show"
  | "episode";
