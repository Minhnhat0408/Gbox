import { create } from "zustand";

type UpdateGameModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useUpdateGameModal = create<UpdateGameModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUpdateGameModal;
