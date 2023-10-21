import { CommentType, PostDataType } from "@/types/supabaseTableType";
import { create } from "zustand";

type PostDetailsProps = {
  isOpen: boolean;
  postData: PostDataType | null;
  comments: CommentType[];
  isLoading: boolean;
  postId: string;
  setPostData: (postData: PostDataType) => void;
  setIsLoading: (isLoading: boolean) => void;
  setComments: (comments: CommentType[]) => void;
  setPostId: (id: string) => void;
  onOpen: (id : string) => void;
  onClose: () => void;
  reset: () => void;
};

const initValue = {
  isOpen: false,
  isLoading: false,
  postData: null,
  postId: "",
  comments: [],
};

const usePostDetailsModal = create<PostDetailsProps>((set) => ({
  ...initValue,
  setPostData: (postData) => set({ postData }),
  setComments: (comments) => set({ comments }),
  setPostId: (id) => set({ postId: id }),
  setIsLoading: (isLoading) => set({ isLoading }),
  onOpen: (id) => {
    set({ postId: id })
    set({ isOpen: true })
  },
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initValue }),
}));

export default usePostDetailsModal;
