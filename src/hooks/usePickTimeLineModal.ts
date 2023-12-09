import { create } from "zustand";

type State = {
  isOpen: boolean;
  onOpen: (index: number) => void;
  onClose: () => void;
  time: string;
  setTime: (time: string) => void;
  date: Date;
  setDate: (date: Date) => void;
  index?: number;
  reset: () => void;
};

const initialState = {
  isOpen: false,
  time: "",
  date: new Date(),
};

export const usePickTimeLineModal = create<State>((set) => ({
  ...initialState,
  onOpen: (index) => set({ isOpen: true, index }),
  onClose: () => set({ isOpen: false }),
  setTime: (time) => set({ time }),
  setDate: (date) => set({ date }),
  reset: () => set(initialState),
}));
