import { createContext, useContext } from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Track } from "@/types";

type TracksContextType = {
  tracks: Record<string, Track>;
  clearAll: () => void;
  getTrackById: (id: Track["id"]) => Track;
  addTrack: (track: Track) => void;
};

const TracksContext = createContext<TracksContextType>({} as TracksContextType);

export const TracksProvider = ({ children }: { children: React.ReactNode }) => {
  const tracks = useProvideTracks();

  return (
    <TracksContext.Provider value={tracks}>{children}</TracksContext.Provider>
  );
};

export const useTracks = () => {
  return useContext(TracksContext);
};

const LS_KEYS = {
  TRACKS: "TRACKS",
};

const useProvideTracks = (): TracksContextType => {
  const [tracks, setTracks] = useLocalStorage<Record<string, Track>>(
    LS_KEYS.TRACKS,
    {}
  );

  const clearAll = () => setTracks({});

  const getTrackById = (id: Track["id"]) => tracks[id];

  const addTrack = (track: Track) => {
    setTracks((tracks) => {
      const copy = { ...tracks };
      copy[track.id] = track;
      return copy;
    });
  };

  return {
    tracks,
    clearAll,
    getTrackById,
    addTrack,
  };
};
