import { ProfilesType } from "@/types/supabaseTableType";
import { create } from "zustand";

export type EventUser = ProfilesType & {
  type: "friend" | "anotherUser" | "withSimilarGame";
};

type InviteFriendProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  users: EventUser[];
  setUsers: (users: EventUser[]) => void;
  removeUsers: (index: number) => void;
};

const initialValue = {
  isOpen: false,
  isLoading: false,
  users: [],
};

export const useInviteFriendModal = create<InviteFriendProps>((set) => ({
  ...initialValue,
  setUsers: (users) => set({ users }),
  removeUsers: (index) =>
    set((state) => ({
      users: state.users.filter((_, i) => i !== index),
    })),
  setIsLoading: (isLoading) => set({ isLoading }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initialValue }),
}));
