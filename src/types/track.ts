import { SpotifyAlbum, SpotifyArtist } from "@/api/spotify/types";

export type Track = {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  duration: number;
  genres: string[];
  release: string;
};
