import { RoomData } from "@/types/supabaseTableType";
import {create} from "zustand";

type useMatchingRoomProps = {
  isOpen: boolean;
  roomId: string | null;
  roomData: RoomData | null;
  onOpen: () => void;
  onClose: () => void;
  setRoomData: (roomData: RoomData | null) => void;
  setRoomId: (roomId: string | null) => void;
  reset: () => void;
};

const initialValue = {
    roomId: null,
  isOpen: false,
  roomData: null,
};

export const useMatchingRoom = create<useMatchingRoomProps>((set) => ({
    ...initialValue,
    onOpen: () => set({ isOpen: true }),
    setRoomData: (roomData) => set({ roomData }),
    onClose: () => set({ isOpen: false }),
    setRoomId: (roomId) => set({ roomId }),
    reset: () => set({ ...initialValue }),
//     setImage: (image) => {
//       if (!image) return;
//       if (image.type.includes("image")) {
//         set((state) => {
//           if (state.image?.preview) {
//             URL.revokeObjectURL(state.image.preview);
//           }
//           return {
//             ...state,
//             image: {
//               file: image,
//               preview: URL.createObjectURL(image),
//             },
//           };
//         });
//       } else {
//         toast.error("Please select an image file", {
//           duration: 1000,
//         });
//       }
//     },
})
);
