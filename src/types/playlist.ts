import { Track } from ".";

export type Playlist = {
  id: string;
  owner: string;
  isPublic: boolean;
  name: string;
  description: string;
  tracks: Track[];
};
