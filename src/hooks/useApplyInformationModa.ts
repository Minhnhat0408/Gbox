import { CoachApplicationType } from "@/types/supabaseTableType";
import { create } from "zustand";

type ApplyModalProps = {
  isOpen: boolean;
  onOpen: (data: CoachApplicationType) => void;
  onClose: () => void;
  reset: () => void;
  data?: CoachApplicationType;
};

export const useApplyInformationModal = create<ApplyModalProps>((set) => ({
  isOpen: false,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ isOpen: false }),
}));
