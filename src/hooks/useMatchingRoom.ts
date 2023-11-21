import {create} from "zustand";

// type ImageType = {
//   file: File;
//   preview: string;
// };



type useMatchingRoomProps = {
  isOpen: boolean;
  roomId: string | null;
  onOpen: () => void;
  onClose: () => void;
  setRoomId: (roomId: string) => void;
  reset: () => void;
};

const initialValue = {
    roomId: null,
  isOpen: false,
};

export const useMatchingRoom = create<useMatchingRoomProps>((set) => ({
    ...initialValue,
    onOpen: () => set({ isOpen: true }),
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
