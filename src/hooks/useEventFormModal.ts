import { create } from "zustand";

type EventFormProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initialValue = {
  isOpen: false,
};

export const useEventFormModal = create<EventFormProps>((set) => ({
  ...initialValue,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initialValue }),
}));
