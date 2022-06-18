type Track = {
  id: string;
};

type Playlist = {
  id: string;
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
  favoriteGenres: string[];
  favoriteArtists: string[];
};
