import { UserMissionsDetail } from "@/types/supabaseTableType";
import { create } from "zustand";

type MissionModalProps = {
  isOpen: boolean;
  onOpen: (missions: UserMissionsDetail[]) => void;
  onClose: () => void;
  missions: UserMissionsDetail[];
};

export const useMissionsModal = create<MissionModalProps>((set) => ({
  isOpen: false,
  onOpen: (missions) => set({ isOpen: true, missions }),
  onClose: () => set({ isOpen: false, missions: [] }),
  missions: [],
}));
