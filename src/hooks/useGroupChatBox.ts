import { CommentType, GroupChatHeadType, GroupData, GroupMemberType, MessageType, ProfilesType } from "@/types/supabaseTableType";
import { create } from "zustand";


type GroupChatProps = {
  isOpen: boolean;
  isLoading: boolean;
  newMsgLoading: boolean;
  reloadVariable: boolean;
  userUniqueLastMsg: { [key: string]: string};
  currentGroup: GroupChatHeadType | undefined;
  setCurrentGroup: (currentGroup: GroupChatHeadType | undefined) => void;
  setIsLoading: (isLoading: boolean) => void;
  setNewMsgLoading: (newMsgLoading: boolean) => void;
  setUserUniqueLastMsg: (userUniqueLastMsg: { [key: string]: string}) => void;
  reloadSeen: () => void;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initValue = {
  isOpen: false,
  isLoading: false,
  userUniqueLastMsg: {},
  currentGroup: undefined,
  newMsgLoading: false,
  reloadVariable: false,
};

const useGroupChatBox = create<GroupChatProps>(
  (set) => ({
    ...initValue,
    reloadSeen: () => set((state)  => ({ reloadVariable: !state.reloadVariable })),
    setUserUniqueLastMsg: (userUniqueLastMsg) => set({ userUniqueLastMsg }),
    setCurrentGroup: (currentGroup) => set({ currentGroup }),
    setNewMsgLoading: (newMsgLoading) => set({ newMsgLoading }),
    setIsLoading: (isLoading) => set({ isLoading }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    reset: () => set({ ...initValue }),
  })
);

export default useGroupChatBox;
