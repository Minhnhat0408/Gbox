import { GameData } from "@/types/ign/GameSearchType";
import { createWithEqualityFn } from "zustand/traditional";

type UpdateGameModalProps = {
  isOpen: boolean;
  gameData: GameData[];
  isLoading: boolean;
  setGameData: (gameData: GameData[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initValue = {
  isOpen: false,
  gameData: [],
  isLoading: false,
};

const useUpdateGameModal = createWithEqualityFn<UpdateGameModalProps>(
  (set) => ({
    ...initValue,
    setGameData: (gameData) => set({ gameData }),
    setIsLoading: (isLoading) => set({ isLoading }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    reset: () => set({ ...initValue }),
  }),
  Object.is
);

export default useUpdateGameModal;
