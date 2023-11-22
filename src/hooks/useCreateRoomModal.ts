import { GameData } from "@/types/ign/GameSearchType";
import {create} from "zustand";

// type ImageType = {
//   file: File;
//   preview: string;
// };



type useCreateRoomProps = {
  isOpen: boolean;
  // gameData: GameData | null;
  // gameName: string;
  // roomName: string | null;
  // totalPeople: number;
  // currentPeople: number;
  onOpen: () => void;
  onClose: () => void;
  // setGameName: (name: string) => void;
  // setGameData: (gameData: GameData) => void;
  // setRoomName: (roomName: string) => void;
  // setTotalPeople: (totalPeople: number) => void;
  // setCurrentPeople: (currentPeople: number) => void;
  reset: () => void;
};

const initialValue = {
  // gameData: null,
  // gameName: "",
  // roomName: null,
  // totalPeople: 1,
  // currentPeople: 1,
  isOpen: false,
};

export const useCreateRoomModal = create<useCreateRoomProps>((set) => ({
    ...initialValue,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    // setGameName: (name) => set({ gameName: name }),
    // setGameData: (gameData) => set({ gameData }),
    // setTotalPeople: (totalPeople) => set({ totalPeople }),
    // setCurrentPeople: (currentPeople) => set({ currentPeople }),
    // setRoomName: (roomName) => set({ roomName }),
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
