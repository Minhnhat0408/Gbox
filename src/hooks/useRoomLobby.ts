import { create } from "zustand";

type RoomLobbyProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const initValue = {
  isOpen: false,

};

const useRoomLobby = create<RoomLobbyProps>((set) => ({
  ...initValue,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRoomLobby;
