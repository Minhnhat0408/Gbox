import { createWithEqualityFn } from "zustand/traditional";

type GamingFormStore = {
  gaming_platform: string[];
  playtime: string[];
  playing_game: string[];
  setGamingPlatform: (gaming_platform: string[]) => void;
  setPlaytime: (playtime: string[]) => void;
  setPlayingGame: (playing_game: string[]) => void;
};

const initialGamingFormState = {
  gaming_platform: [],
  playtime: [],
  playing_game: [],
};

// set is true

export const useGamingForm = createWithEqualityFn<GamingFormStore>(
  (set) => ({
    ...initialGamingFormState,
    setGamingPlatform: (gaming_platform) => set({ gaming_platform }),
    setPlaytime: (playtime) => set({ playtime }),
    setPlayingGame: (playing_game) => set({ playing_game }),
  }),
  Object.is
);
