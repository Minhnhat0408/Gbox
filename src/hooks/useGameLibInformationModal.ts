import { UserGameDataType } from "@/types/supabaseTableType";
import { create } from "zustand";

type GameLibInformationModalState = {
  isOpen: boolean;
  onOpen: (gameData: UserGameDataType) => void;
  onClose: () => void;
  gameData?: UserGameDataType;
};

const initialState = {
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
};

export const useGameLibInformationModal = create<GameLibInformationModalState>(
  (set) => ({
    isOpen: false,
    onOpen: (gameData) => {
      set({ isOpen: true, gameData });
    },
    onClose: () => set({ isOpen: false }),
  })
);
