import { UserGameDataType } from "@/types/supabaseTableType";
import { create } from "zustand";

type GameLibInformationModalState = {
  isOpen: boolean;
  onOpen: (gameData: UserGameDataType) => void;
  onClose: () => void;
  gameData?: UserGameDataType;
  setGameData: (gameData: UserGameDataType) => void;
  avatarUrl?: string;
  setAvatarUrl: (avatarUrl: string) => void;
};

const initialState = {
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
};

export const useGameLibInformationPageModal =
  create<GameLibInformationModalState>((set) => ({
    isOpen: false,
    onOpen: (gameData) => {
      set({ isOpen: true, gameData });
    },
    setAvatarUrl: (avatarUrl) => set({ avatarUrl }),
    onClose: () => set({ isOpen: false }),
    setGameData: (gameData) => set({ gameData }),
  }));
