import { CommentType, GroupData, MessageType, ProfilesType } from "@/types/supabaseTableType";
import { create } from "zustand";


type GroupChatProps = {
  isOpen: boolean;
  isLoading: boolean;
  newMsgLoading: boolean;
  currentGroup: GroupData | undefined;
  setCurrentGroup: (currentGroup: GroupData) => void;
  setIsLoading: (isLoading: boolean) => void;
  setNewMsgLoading: (newMsgLoading: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initValue = {
  isOpen: false,
  isLoading: false,
  currentGroup: undefined,
  newMsgLoading: false,
};

const useGroupChatBox = create<GroupChatProps>(
  (set) => ({
    ...initValue,
    setCurrentGroup: (currentGroup) => set({ currentGroup }),
    setNewMsgLoading: (newMsgLoading) => set({ newMsgLoading }),
    setIsLoading: (isLoading) => set({ isLoading }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    reset: () => set({ ...initValue }),
  })
);

export default useGroupChatBox;
