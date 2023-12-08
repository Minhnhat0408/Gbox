import { CommentType, GroupChatHeadType, GroupData, GroupMemberType, MessageType, ProfilesType } from "@/types/supabaseTableType";
import { create } from "zustand";


type GroupChatProps = {
  isOpen: boolean;
  isLoading: boolean;
  newMsgLoading: boolean;
  members: GroupMemberType[];
  currentGroup: GroupChatHeadType | undefined;
  setCurrentGroup: (currentGroup: GroupChatHeadType) => void;
  setIsLoading: (isLoading: boolean) => void;
  setNewMsgLoading: (newMsgLoading: boolean) => void;
  setMembers: (members: GroupMemberType[]) => void;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initValue = {
  isOpen: false,
  isLoading: false,
  currentGroup: undefined,
  newMsgLoading: false,
  members: [],
};

const useGroupChatBox = create<GroupChatProps>(
  (set) => ({
    ...initValue,
    setMembers: (members) => set({ members }),
    setCurrentGroup: (currentGroup) => set({ currentGroup }),
    setNewMsgLoading: (newMsgLoading) => set({ newMsgLoading }),
    setIsLoading: (isLoading) => set({ isLoading }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    reset: () => set({ ...initValue }),
  })
);

export default useGroupChatBox;
