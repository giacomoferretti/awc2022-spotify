import { SpotifyAlbum, SpotifyArtist } from "./spotify";

export type Track = {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  duration: number;
};
