import { CommentType, MessageType, ProfilesType } from "@/types/supabaseTableType";
import { create } from "zustand";


type MessageProps = {
  isOpen: boolean;
  isLoading: boolean;
  newMsgLoading: boolean;

  currentMessage: ProfilesType | undefined;
  setCurrentMessage: (currentMessage: ProfilesType) => void;
  setIsLoading: (isLoading: boolean) => void;
  // setMessages: ({fn,messages} : {fn?: (prev: MessageType[]) => MessageType[],messages?: MessageType[]}) => void;
  setNewMsgLoading: (newMsgLoading: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initValue = {
  isOpen: false,
  isLoading: false,
  currentMessage: undefined,
  newMsgLoading: false,
};

const useMessageBox = create<MessageProps>(
  (set) => ({
    ...initValue,

    setCurrentMessage: (currentMessage) => set({ currentMessage }),
    // setMessages: ({fn,messages}) => {
    //   if(fn){
    //    return  set((state => ({ messages: fn(state.messages) })));
    //   }else if(messages){
    //    return  set({messages})
    //   }
    // },
    setNewMsgLoading: (newMsgLoading) => set({ newMsgLoading }),
    setIsLoading: (isLoading) => set({ isLoading }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    reset: () => set({ ...initValue }),
  })
);

export default useMessageBox;
