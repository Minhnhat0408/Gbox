import { create } from "zustand";

type GameRoomsProps = {
  isOpen: boolean;
  isLoading: boolean;
  mode: "join" | "create" | undefined
  setMode: (mode: "join" | "create" | undefined) => void;
  setIsLoading: (isLoading: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initValue = {
  isOpen: false,
  isLoading: false,
  mode: undefined,
};

const useGameRooms = create<GameRoomsProps>((set) => ({
  ...initValue,
  setMode: (mode) => set({ mode }),
  setIsLoading: (isLoading) => set({ isLoading }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initValue }),
}));

export default useGameRooms;
