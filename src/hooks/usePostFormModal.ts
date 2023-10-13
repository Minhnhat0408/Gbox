import { GameProgress } from "@/types/gameProgressType";
import { create } from "zustand";

type PostFormProps = {
  isOpen: boolean;
  success: number;
  progress: GameProgress | null;
  isPosting: boolean;
  onOpen: () => void;
  onClose: () => void;
  setIsPosting: (isPosting: boolean) => void;
  setProgress: (progress: GameProgress) => void;
  reset: () => void;
  increaseSuccess: () => void;
};

const initialValue = {
  isOpen: false,
  progress: null,
  isPosting: false,
  success: 0,
};

export const usePostFormModal = create<PostFormProps>((set) => ({
  ...initialValue,
  increaseSuccess: () => {set((state) => {
    return {
      success: state.success + 1
    }
  })},
  setIsPosting: (isPosting: boolean) => set({ isPosting }),
  setProgress: (progress: GameProgress) => set({ progress }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initialValue }),
}));
