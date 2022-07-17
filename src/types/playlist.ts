import { Track } from ".";

export type PlaylistTrack = {
  id: Track["id"];
  addedTimestamp: number;
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  owner: string;
  coverData: string | null;
  isPublic: boolean;
  tracks: PlaylistTrack[];
};
