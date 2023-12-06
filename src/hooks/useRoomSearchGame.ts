import { GameData } from "@/types/ign/GameSearchType";
import { create } from "zustand";

type RoomSearchGameProps = {
  gameData: GameData[];
  currentGame: GameData | undefined;
  isLoading: boolean;
  openOption: boolean;
  searchValue: string;
  err:boolean;
  setSearchValue: (searchValue: string) => void;
  setGameData: (data: GameData[]) => void;
  setCurrentGame: (currentGame: GameData | undefined) => void;
  setOpenOption: (openOption: boolean) => void;
  setErr: (err:boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
};

const initialState = {
  gameData: [],
  searchValue: "",
  err:false,
  currentGame: undefined,
  isLoading: false,
  openOption: false,
};

export const useRoomSearchGame = create<RoomSearchGameProps>((set) => ({
  ...initialState,
  setErr: (err:boolean) => set({ err }),
  setSearchValue: (searchValue: string) => set({ searchValue }),
  setCurrentGame: (currentGame: GameData | undefined) => set({ currentGame }),
  setOpenOption: (openOption: boolean) => set({ openOption }),
  setGameData: (data: GameData[]) => set({ gameData: data }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
