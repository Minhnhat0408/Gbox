import { MessageHeadType } from "@/types/supabaseTableType";
import { create } from "zustand";

type FriendMessagesProps = {
  isOpen: boolean;
  isLoading: boolean;
  messageHeads: MessageHeadType[];
  inComingMessage: { [k: string]: number };
  setMessageHeads: (messageHeads: MessageHeadType[]) => void;
  setInComingMessage: (inComingMessage: { [k: string]: number }) => void;
  setIsLoading: (isLoading: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initValue = {
  isOpen: false,
  messageHeads: [],
  inComingMessage: {},
  isLoading: false,
};

const useFriendMessages = create<FriendMessagesProps>((set) => ({
  ...initValue,
  setMessageHeads: (messageHeads) => set({ messageHeads }),
  setInComingMessage: (inComingMessage) => set({ inComingMessage }),
  setIsLoading: (isLoading) => set({ isLoading }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initValue }),
}));

export default useFriendMessages;
