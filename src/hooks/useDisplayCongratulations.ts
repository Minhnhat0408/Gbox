
import { create } from "zustand";

type DisplayCongratulationsModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initialValue = {
    isOpen: false,

};

export const useDisplayCongratulations = create<DisplayCongratulationsModalProps>((set) => ({
  ...initialValue,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initialValue }),
}));
