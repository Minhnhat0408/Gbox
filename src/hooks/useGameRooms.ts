import { create } from "zustand";

type GameRoomsProps = {
  isOpen: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initValue = {
  isOpen: false,
  isLoading: false,
};

const useGameRooms = create<GameRoomsProps>((set) => ({
  ...initValue,
  setIsLoading: (isLoading) => set({ isLoading }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initValue }),
}));

export default useGameRooms;
