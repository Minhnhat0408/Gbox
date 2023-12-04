import { SessionApplicationTypeWithProfile } from "@/types/supabaseTableType";
import { create } from "zustand";

type SessionRequestModalState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: (data: SessionApplicationTypeWithProfile) => void;
  data?: SessionApplicationTypeWithProfile;
};

export const useSessionRequestModal = create<SessionRequestModalState>(
  (set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: (data) => set({ isOpen: true, data }),
  })
);
