import { GroupMemberType } from "@/types/supabaseTableType";
import { create } from "zustand";

type GroupAddMembersProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
 
};

const initValue = {
  isOpen: false,

};

const useGroupAddMembers = create<GroupAddMembersProps>((set) => ({
  ...initValue,
  onOpen: () => set({ isOpen: true }),

  onClose: () => set({ isOpen: false }),
}));

export default useGroupAddMembers;
