import { GameData } from "@/types/ign/GameSearchType";
import { create } from "zustand";

type SearchGameFormProps = {
  gameData: GameData[];
  currentGame: GameData | undefined;
  isLoading: boolean;
  openOption: boolean;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  setGameData: (data: GameData[]) => void;
  setCurrentGame: (currentGame: GameData | undefined) => void;
  setOpenOption: (openOption: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
};

const initialState = {
  gameData: [],
  searchValue: "",
  currentGame: undefined,
  isLoading: false,
  openOption: false,
};

export const useSearchGameForm = create<SearchGameFormProps>((set) => ({
  ...initialState,
  setSearchValue: (searchValue: string) => set({ searchValue }),
  setCurrentGame: (currentGame: GameData | undefined) => set({ currentGame }),
  setOpenOption: (openOption: boolean) => set({ openOption }),
  setGameData: (data: GameData[]) => set({ gameData: data }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));