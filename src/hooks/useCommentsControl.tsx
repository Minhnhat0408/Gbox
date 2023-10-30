import { CommentType } from "@/types/supabaseTableType";
import { create } from "zustand";


type CommentsControlProps = {
  isOpen: boolean;
  comments: CommentType[] | [];
  isLoading: boolean;
  scroll: boolean;//decide whether to scroll to the bottom of the comment section
  setComments: (comments: CommentType[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setScroll: (scroll: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initValue = {
  isOpen: false,
  isLoading: false,
  scroll: false,
  comments: [],
};

const useCommentsControl = create<CommentsControlProps>(
  (set) => ({
    ...initValue,
    setComments: (comments) => set({ comments }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setScroll: (scroll) => set({ scroll }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    reset: () => set({ ...initValue }),
  })
);

export default useCommentsControl;
