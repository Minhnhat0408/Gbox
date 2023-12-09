import { GroupMemberType } from "@/types/supabaseTableType";
import { create } from "zustand";

type GroupMembersProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  currentMember: GroupMemberType | undefined;
  setCurrentMember: (currentMember: GroupMemberType | undefined) => void;
  members: GroupMemberType[];
  setMembers: (members: GroupMemberType[]) => void;
};

const initValue = {
  isOpen: false,
  members: [],
  currentMember: undefined,
};

const useGroupMembers = create<GroupMembersProps>((set) => ({
  ...initValue,
  onOpen: () => set({ isOpen: true }),
  setCurrentMember: (currentMember) => set({ currentMember }),
  setMembers: (members) => set({ members }),
  onClose: () => set({ isOpen: false }),
}));

export default useGroupMembers;
