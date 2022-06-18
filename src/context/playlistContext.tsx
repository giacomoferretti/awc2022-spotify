import { createContext, useContext } from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getRandomUid } from "@/utils/uid";

type PlaylistContextType = {
  playlists: Playlist[];
  generatePlaylist: () => void;
  getPlaylistById: (id: string) => Playlist;
  clearAll: () => void;
  createUserPlaylist: (owner: string) => string;
  getUserPlaylists: (ownerId: string) => Playlist[];
};

const PlaylistsContext = createContext<PlaylistContextType>(
  {} as PlaylistContextType
);

export const PlaylistsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const playlists = useProvidePlaylists();

  return (
    <PlaylistsContext.Provider value={playlists}>
      {children}
    </PlaylistsContext.Provider>
  );
};

export const usePlaylists = () => {
  return useContext(PlaylistsContext);
};

const LS_KEYS = {
  PLAYLISTS: "PLAYLISTS",
};

const useProvidePlaylists = (): PlaylistContextType => {
  const [playlists, setPlaylists] = useLocalStorage<Playlist[]>(
    LS_KEYS.PLAYLISTS,
    []
  );

  const getPlaylistById = (id: string) => {
    return playlists[playlists.findIndex((playlist) => playlist.id === id)];
  };

  const generatePlaylist = () => {
    // Only for debug purposes
    if (import.meta.env.PROD)
      throw new Error(`This function can only be used in DEBUG.`);

    const newPlaylist: Playlist = {
      id: getRandomUid(),
      owner: "",
      isPublic: true,
      name: "A very long name containing spaces",
      description: "A very long description containing spaces",
      tracks: [],
    };

    setPlaylists((playlists) => [...playlists, newPlaylist]);
  };

  const clearAll = () => {
    setPlaylists([]);
  };

  const createUserPlaylist = (ownerId: string) => {
    const newPlaylist: Playlist = {
      id: getRandomUid(),
      owner: ownerId,
      isPublic: true,
      name: "Playlist senza titolo",
      description: "",
      tracks: [],
    };

    setPlaylists((playlists) => [...playlists, newPlaylist]);

    return newPlaylist.id;
  };

  const getUserPlaylists = (ownerId: string) => {
    return playlists.filter((playlist) => playlist.owner === ownerId);
  };

  return {
    playlists,
    generatePlaylist,
    getPlaylistById,
    clearAll,
    createUserPlaylist,
    getUserPlaylists,
  };
};
