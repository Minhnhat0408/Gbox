import { ProfilesType } from "@/types/supabaseTableType";
import { create } from "zustand";

export type RoomUser = ProfilesType & {
  type: "friend" | "anotherUser" | "withSimilarGame";
};

type RoomInviteProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  users: RoomUser[];
  setUsers: (users: RoomUser[]) => void;
  removeUsers: (index: number) => void;
};

const initialValue = {
  isOpen: false,
  isLoading: false,
  users: [],
};

export const useRoomInvite = create<RoomInviteProps>((set) => ({
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
