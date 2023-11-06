import { GameProgress } from "@/types/gameProgressType";
import { create } from "zustand";

type PostFormProps = {
  isOpen: boolean;
  success: number;
  progress: GameProgress | null;
  isPosting: boolean;
  isEventPost?: boolean;
  eventID: string;
  eventName: string;
  onOpen: () => void;
  onClose: () => void;
  setIsPosting: (isPosting: boolean) => void;
  setProgress: (progress: GameProgress) => void;
  setIsEventPost: (isEventPost: boolean) => void;
  setEventName: (eventName: string) => void;
  reset: () => void;
  increaseSuccess: () => void;
  setEventID: (eventID: string) => void;
};

const initialValue = {
  isOpen: false,
  progress: null,
  isPosting: false,
  success: 0,
  isEventPost: false,
  eventID: "",
  eventName: "",
};

export const usePostFormModal = create<PostFormProps>((set) => ({
  ...initialValue,
  increaseSuccess: () => {
    set((state) => {
      return {
        success: state.success + 1,
      };
    });
  },
  setEventName: (eventName: string) => set({ eventName }),
  setEventID: (eventID: string) => set({ eventID }),
  setIsEventPost: (isEventPost: boolean) => set({ isEventPost }),
  setIsPosting: (isPosting: boolean) => set({ isPosting }),
  setProgress: (progress: GameProgress) => set({ progress }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initialValue }),
}));
