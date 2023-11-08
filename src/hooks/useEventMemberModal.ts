import { EventParticipationsDetailType } from "@/types/supabaseTableType";
import { create } from "zustand";

type EventMemberModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
  members: EventParticipationsDetailType[];
  setMembers: (members: EventParticipationsDetailType[]) => void;
  removeMember: (index: number) => void;
};

const initialValue = {
  isOpen: false,
  members: [],
};

export const useEventMemberModal = create<EventMemberModalProps>((set) => ({
  ...initialValue,
  setMembers: (members) => set({ members }),
  removeMember: (index) =>
    set((state) => ({
      members: state.members.filter((_, i) => i !== index),
    })),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initialValue }),
}));
