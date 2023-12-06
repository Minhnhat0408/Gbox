import { create } from "zustand";

type MatchingOptionsProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const initValue = {
  isOpen: false,

};

const useMatchingOptions = create<MatchingOptionsProps>((set) => ({
  ...initValue,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useMatchingOptions;
