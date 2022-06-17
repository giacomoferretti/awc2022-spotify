import { createContext, useContext } from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getRandomUid } from "@/utils/uid";

type Track = {
  id: string;
};

type Playlist = {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
};

type PlaylistContextType = {
  playlists: Playlist[];
  generatePlaylist: () => void;
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

  const generatePlaylist = () => {
    // Only for debug purposes
    if (import.meta.env.PROD)
      throw new Error(`This function can only be used in DEBUG.`);

    const newPlaylist: Playlist = {
      id: getRandomUid(),
      name: "A very long name containing spaces",
      description: "A very long description containing spaces",
      tracks: [],
    };

    setPlaylists((playlists) => [...playlists, newPlaylist]);
  };

  return { playlists, generatePlaylist };
};
