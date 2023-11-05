import { MessageHeadType } from "@/types/supabaseTableType";
import { create } from "zustand";

type FriendMessagesProps = {
  isOpen: boolean;
  isLoading: boolean;
  messageHeads: MessageHeadType[];
  setMessageHeads: (messageHeads: MessageHeadType[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initValue = {
  isOpen: false,
  messageHeads: [],
  isLoading: false,
};

const useFriendMessages = create<FriendMessagesProps>((set) => ({
  ...initValue,
  setMessageHeads: (messageHeads) => set({ messageHeads }),
  setIsLoading: (isLoading) => set({ isLoading }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initValue }),
}));

export default useFriendMessages;
