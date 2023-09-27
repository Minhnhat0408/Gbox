import { create } from "zustand";

type InformationStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

// every time we create a modal, we call this inside the component

const useInformationModal = create<InformationStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useInformationModal;
