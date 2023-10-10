import { GameData } from "@/types/ign/GameSearchType";
import { UserGameDataType } from "@/types/supabaseTableType";
import { createWithEqualityFn } from "zustand/traditional";

type UpdateGameModalProps = {
  isOpen: boolean;
  gameData: GameData[];
  userGameData: UserGameDataType[];
  popularGame: GameData[];
  isLoading: boolean;
  setGameData: (gameData: GameData[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setPopularGames: (popularGame: GameData[]) => void;
  setUserGameData: (userGameData: UserGameDataType[]) => void;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initValue = {
  isOpen: false,
  isLoading: false,
  gameData: [],
  userGameData: [],
  popularGame: [],
};

const useUpdateGameModal = createWithEqualityFn<UpdateGameModalProps>(
  (set) => ({
    ...initValue,
    setUserGameData: (userGameData) => set({ userGameData }),
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
