import { createWithEqualityFn } from "zustand/traditional";

export type Game = {
  name: string;
  image_background: string;
  slug: string;
};

type PlayedGameForm = {
  playedGame: Game[];
  topGame: Game[];
  setTopGame: (topGame: Game[]) => void;
  setPlayedgame: (playedGame: Game[]) => void;
};

const initialPlayedGame = {
  playedGame: [],
  topGame: [],
};

// set is true

export const usePlayedGameForm = createWithEqualityFn<PlayedGameForm>(
  (set) => ({
    ...initialPlayedGame,
    setPlayedgame: (playedGame) => set({ playedGame }),
    setTopGame: (topGame) => set({ topGame }),
  }),
  Object.is
);
