type Track = {
  id: string;
};

type Playlist = {
  id: string;
  owner: string;
  name: string;
  description: string;
  tracks: Track[];
};

type UserCredentials = {
  username: string;
  password: string;
};

type User = UserCredentials & {
  email: string;
  displayName: string;
  personalPlaylists: string[];
  savedPlaylists: string[];
  favoriteGenres: string[];
  favoriteArtists: string[];
};
