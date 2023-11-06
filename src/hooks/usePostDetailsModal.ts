import {  PostDataType } from "@/types/supabaseTableType";
import { createWithEqualityFn } from "zustand/traditional";

type PostDetailsProps = {
  isOpen: boolean;
  postData: PostDataType | null;
  isLoading: boolean;
  postId: string;
  setPostData: (postData: PostDataType) => void;
  setIsLoading: (isLoading: boolean) => void;
  setPostId: (id: string) => void;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initValue = {
  isOpen: false,
  isLoading: false,
  postData: null,
  postId: "",
};

const usePostDetailsModal = createWithEqualityFn<PostDetailsProps>(
  (set) => ({
    ...initValue,
    setPostData: (postData) => set({ postData }),
    setPostId: (id) => set({ postId: id }),
    setIsLoading: (isLoading) => set({ isLoading }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    reset: () => set({ ...initValue }),
  }),
  Object.is
);

export default usePostDetailsModal;
