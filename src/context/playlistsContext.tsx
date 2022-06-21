import { createContext, useContext } from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Playlist, Track } from "@/types";
import { getRandomUid } from "@/utils/uid";

type PlaylistContextType = {
  playlists: Record<string, Playlist>;
  generatePlaylist: () => void;
  getPlaylistById: (id: string) => Playlist;
  clearAll: () => void;
  createUserPlaylist: (owner: string) => string;
  // getUserPlaylists: (ownerId: string) => Playlist[];
  addTrackToPlaylist: (id: Playlist["id"], track: Track["id"]) => void;
  setVisibilityPlaylist: (
    id: Playlist["id"],
    isPublic: Playlist["isPublic"]
  ) => void;
  removeTrackFromPlaylistAtPos: (id: Playlist["id"], pos: number) => void;
  setPlaylistName: (id: Playlist["id"], name: Playlist["name"]) => void;
  setPlaylistDescription: (
    id: Playlist["id"],
    name: Playlist["description"]
  ) => void;
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
  const [playlists, setPlaylists] = useLocalStorage<Record<string, Playlist>>(
    LS_KEYS.PLAYLISTS,
    {}
  );

  const clearAll = () => {
    setPlaylists({});
  };

  const playlistExists = (id: string) => {
    return Object.prototype.hasOwnProperty.call(playlists, id);
  };

  const addPlaylist = (playlist: Playlist) => {
    setPlaylists((playlists) => {
      const copy = { ...playlists };
      copy[playlist.id] = playlist;
      return copy;
    });
  };

  const getPlaylistById = (id: string) => {
    // Check if user exists
    if (!playlistExists(id)) {
      throw new Error(`${id} doesn't exist.`);
    }

    return playlists[id];
  };

  const generatePlaylist = () => {
    // Only for debug purposes
    if (import.meta.env.PROD)
      throw new Error(`This function can only be used in DEBUG.`);

    addPlaylist({
      id: getRandomUid(),
      owner: "",
      isPublic: true,
      name: "A very long name containing spaces",
      description: "A very long description containing spaces",
      tracks: [],
    });
  };

  const blankPlaylist = (owner: string) => {
    return {
      id: getRandomUid(),
      owner,
      isPublic: true,
      name: "Playlist senza titolo",
      description: "",
      tracks: [],
    };
  };

  const createUserPlaylist = (ownerId: string) => {
    const newPlaylist = blankPlaylist(ownerId);

    addPlaylist(newPlaylist);

    return newPlaylist.id;
  };

  const addTrackToPlaylist = (id: Playlist["id"], track: Track["id"]) => {
    setPlaylists((playlists) => {
      const copy = { ...playlists };
      const tracks = copy[id].tracks.slice();
      tracks.push({ id: track, addedTimestamp: Date.now() });
      copy[id].tracks = tracks;
      return copy;
    });
  };

  const removeTrackFromPlaylistAtPos = (id: Playlist["id"], pos: number) => {
    setPlaylists((playlists) => {
      const copy = { ...playlists };
      const tracks = copy[id].tracks.slice();
      tracks.splice(pos, 1);
      copy[id].tracks = tracks;
      return copy;
    });
  };

  const setVisibilityPlaylist = (
    id: Playlist["id"],
    isPublic: Playlist["isPublic"]
  ) => {
    setPlaylists((playlists) => {
      const copy = { ...playlists };
      copy[id].isPublic = isPublic;
      return copy;
    });
  };

  const setPlaylistName = (id: Playlist["id"], name: Playlist["name"]) => {
    setPlaylists((playlists) => {
      const copy = { ...playlists };
      copy[id].name = name;
      return copy;
    });
  };

  const setPlaylistDescription = (
    id: Playlist["id"],
    description: Playlist["description"]
  ) => {
    setPlaylists((playlists) => {
      const copy = { ...playlists };
      copy[id].description = description;
      return copy;
    });
  };

  return {
    playlists,
    generatePlaylist,
    getPlaylistById,
    clearAll,
    createUserPlaylist,
    addTrackToPlaylist,
    setVisibilityPlaylist,
    removeTrackFromPlaylistAtPos,
    setPlaylistName,
    setPlaylistDescription,
  };
};
