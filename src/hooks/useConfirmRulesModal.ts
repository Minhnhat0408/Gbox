import { create } from "zustand";
type ConfirmRulesProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const initialValue = {
  isOpen: false,
  isLoading: false,
};

export const useConfirmRulesModal = create<ConfirmRulesProps>((set) => ({
  ...initialValue,
  setIsLoading: (isLoading) => set({ isLoading }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initialValue }),
}));
