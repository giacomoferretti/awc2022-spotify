export type UserCredentials = {
  username: string;
  password: string;
};

export type User = UserCredentials & {
  email: string;
  displayName: string;
  personalPlaylists: string[];
  savedPlaylists: string[];
  favoriteGenres: string[];
  favoriteArtists: string[];
};
