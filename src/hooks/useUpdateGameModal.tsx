import { GameData } from "@/types/ign/GameSearchType";
import { createWithEqualityFn } from "zustand/traditional";

type UpdateGameModalProps = {
  isOpen: boolean;
  gameData: GameData[];
  popularGame: GameData[];
  isLoading: boolean;
  setGameData: (gameData: GameData[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setPopularGames: (popularGame: GameData[]) => void;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initValue = {
  isOpen: false,
  gameData: [],
  isLoading: false,
  popularGame: [],
};

const useUpdateGameModal = createWithEqualityFn<UpdateGameModalProps>(
  (set) => ({
    ...initValue,
    setGameData: (gameData) => set({ gameData }),
    setPopularGames: (popularGame) => set({ popularGame }),
    setIsLoading: (isLoading) => set({ isLoading }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    reset: () => set({ ...initValue }),
  }),
  Object.is
);

export default useUpdateGameModal;
