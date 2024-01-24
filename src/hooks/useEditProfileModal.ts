import { toast } from "sonner";
import {create} from "zustand";

type ImageType = {
  file: File;
  preview: string;
};



type useEditProfileModalProps = {
  isOpen: boolean;
  onOpen: (inviteID: string) => void;
  onClose: () => void;
  reset: () => void;
  media: ImageType | null;
  addMedia: (media: File) => void;
  removeMedia: () => void;
};

const initialValue = {
  isOpen: false,
  media:null,
};

export const useEditProfileModal = create<useEditProfileModalProps>((set) => ({
    ...initialValue,
    onOpen: (inviteID) => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    reset: () => set({ ...initialValue }),
    addMedia: (media: File) => {
      set((state => {
        if(!media) {
          toast.error('Please select an image')
          return {
            media: undefined
          }
        }
        if(!media.type.includes("image")) {
          toast.error('Please select image type')
          return {
            media: undefined
          }
        } else {
          const preview = URL.createObjectURL(media);
          return {
            media: {
              file: media,
              preview
            }
          }
        }
      }))
    },
    removeMedia: () => {
      set((state => {
        //revoke
        if(state.media) {
          URL.revokeObjectURL(state.media.preview)
        }
        return {
          media: undefined
        }
      }))
    }
})
);
