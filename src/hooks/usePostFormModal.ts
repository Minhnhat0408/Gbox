import { create } from "zustand";

type PostFormProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initialValue = {
  isOpen: false,
};

export const usePostFormModal = create<PostFormProps>((set) => ({
  ...initialValue,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initialValue }),
}));
