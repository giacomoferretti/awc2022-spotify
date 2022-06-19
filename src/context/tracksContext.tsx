import { createContext, useContext } from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Track } from "@/types";

type TracksContextType = {
  tracks: Record<string, Track>;
  clearAll: () => void;
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

  const clearAll = () => {
    setTracks({});
  };

  return {
    tracks,
    clearAll,
  };
};
