export type SpotifyImage = {
  height: number;
  url: string;
  width: number;
};

export type SpotifyAlbum = {
  name: string;
  images: SpotifyImage[];
};

export type SpotifyArtist = {
  name: string;
  id: string;
  images: SpotifyImage[];
};

export type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  id: string;
  name: string;
  duration_ms: number;
};
