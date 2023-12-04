import { GameData } from "@/types/ign/GameSearchType";
import { GameMetaData } from "@/types/supabaseTableType";
import { create } from "zustand";

type ChooseGameForSession = {
  gameData: GameData[];
  currentGame: GameData | undefined;
  isLoading: boolean;
  openOption: boolean;
  searchValue: string;
  gameMetaData: GameMetaData | undefined;
  setGameMetaData: (data: GameMetaData) => void;
  setSearchValue: (searchValue: string) => void;
  setGameData: (data: GameData[]) => void;
  setCurrentGame: (currentGame: GameData | undefined) => void;
  setOpenOption: (openOption: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  reset: () => void;
};

const initialState = {
  gameData: [],
  searchValue: "",
  currentGame: undefined,
  isLoading: false,
  openOption: false,
  gameMetaData: undefined,
};

export const useChooseGameForSession = create<ChooseGameForSession>((set) => ({
  ...initialState,
  setGameMetaData: (gameMetaData: GameMetaData) => set({ gameMetaData }),
  setSearchValue: (searchValue: string) => set({ searchValue }),
  setCurrentGame: (currentGame: GameData | undefined) => set({ currentGame }),
  setOpenOption: (openOption: boolean) => set({ openOption }),
  setGameData: (data: GameData[]) => set({ gameData: data }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  reset: () => set(initialState),
}));
