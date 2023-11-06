import { create } from "zustand";

type FullscreenProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  src: string;
  setSrc: (src: string | '/placeholder.jpg') => void;
};

const initialValue = {
  src: '/placeholder.jpg',
    isOpen: false,
};

export const useFullscreenModal = create<FullscreenProps>((set) => ({
  ...initialValue,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setSrc: (src) => set({ src }),
}));
