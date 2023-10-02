import { createWithEqualityFn } from "zustand/traditional";

export type Game = {
  name: string;
  image_background: string;
  slug: string;
};

type PlayedGameForm = {
  playedGame: Game[];
  setPlayedgame: (playedGame: Game[]) => void;
};

const initialPlayedGame = {
  playedGame: [],
};

// set is true

export const usePlatformForm = createWithEqualityFn<PlayedGameForm>(
  (set) => ({
    ...initialPlayedGame,
    setPlayedgame: (playedGame) => set({ playedGame }),
  }),
  Object.is
);
