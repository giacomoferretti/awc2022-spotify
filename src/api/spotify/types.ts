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

export type SpotifyImage = {
  height: number;
  url: string;
  width: number;
};

export type SpotifyAlbum = {
  name: string;
  images: SpotifyImage[];
  release_date: string;
};

export type SpotifyArtist = {
  name: string;
  id: string;
  images: SpotifyImage[];
  genres: string[];
};

export type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  id: string;
  name: string;
  duration_ms: number;
  genres: string[];
};
