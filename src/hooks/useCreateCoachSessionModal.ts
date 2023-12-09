import { GameData } from "@/types/ign/GameSearchType";
import { create } from "zustand";

type State = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  game?: GameData;
  setGame: (game: GameData) => void;
  error: string | undefined;
  setError: (error: string | undefined) => void;
  reset: () => void;
};

export const useCreateCoachSessionModal = create<State>((set) => ({
  isOpen: false,
  error: undefined,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setGame: (game: GameData) => set({ game }),
  setError: (error: string | undefined) => set({ error }),
  reset: () =>
    set({
      isOpen: false,
      error: undefined,
      game: undefined,
    }),
}));
