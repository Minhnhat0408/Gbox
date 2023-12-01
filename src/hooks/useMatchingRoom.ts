import { RoomData, RoomUserType } from "@/types/supabaseTableType";
import {create} from "zustand";

type useMatchingRoomProps = {
  isOpen: boolean;
  roomId: string | null;
  members: (RoomUserType | 'dummy' | null )[] | null;
  roomData: RoomData | null;
  isOpenLeaveWarning: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenLeaveWarning: () => void;
  onCloseLeaveWarning: () => void;
  setMembers: (members: (RoomUserType | 'dummy' | null )[] | null) => void;
  setRoomData: (roomData: RoomData | null) => void;
  setRoomId: (roomId: string | null) => void;
  reset: () => void;
};

const initialValue = {
    roomId: null,
  isOpen: false,
  members: null,
  roomData: null,
  isOpenLeaveWarning: false,
};

export const useMatchingRoom = create<useMatchingRoomProps>((set) => ({
    ...initialValue,
    setMembers: (members) => set({ members }),
    onOpenLeaveWarning: () => set({ isOpenLeaveWarning: true }),
    onCloseLeaveWarning: () => set({ isOpenLeaveWarning: false }),
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
