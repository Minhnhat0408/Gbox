import { create } from "zustand";

type FeedbackModalState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const initialState = {
  isOpen: false,
};

export const useProvideFeedbackModal = create<FeedbackModalState>((set) => ({
  ...initialState,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
