import { CommentType } from "@/types/supabaseTableType";
import { create } from "zustand";


type MessageProps = {
  isOpen: boolean;
  isLoading: boolean;
  messageId: string;
setMessageId: (messageId: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initValue = {
  isOpen: false,
  isLoading: false,
  messageId: "",
};

const useMessageBox = create<MessageProps>(
  (set) => ({
    ...initValue,
    setMessageId: (messageId) => set({ messageId }),
    setIsLoading: (isLoading) => set({ isLoading }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    reset: () => set({ ...initValue }),
  })
);

export default useMessageBox;
