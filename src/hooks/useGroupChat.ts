import { GroupChatHeadType, MessageHeadType } from "@/types/supabaseTableType";
import { create } from "zustand";

type GroupChatProps = {
  isOpen: boolean;
  isLoading: boolean;
  groupChatHeads: GroupChatHeadType[];
  inComingMessage: { [k: string]: number };
  setGroupChatHeads: (groupChatHeads: GroupChatHeadType[]) => void;
  setInComingMessage: (inComingMessage: { [k: string]: number }) => void;
  setIsLoading: (isLoading: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initValue = {
  isOpen: false,
  groupChatHeads: [],
  inComingMessage: {},
  isLoading: false,
};

const useGroupChat = create<GroupChatProps>((set) => ({
  ...initValue,
  setGroupChatHeads: (groupChatHeads) => set({ groupChatHeads }),
  setInComingMessage: (inComingMessage) => set({ inComingMessage }),
  setIsLoading: (isLoading) => set({ isLoading }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initValue }),
}));

export default useGroupChat;
