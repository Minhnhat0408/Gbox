import { GameProgress } from "@/types/gameProgressType";
import { UserGameDataType } from "@/types/supabaseTableType";
import { create } from "zustand";

export type EditDataProps = {
  status?: GameProgress;
  comment?: string;
  score?: number;
};

type ModalProps = {
  isOpen: boolean;
  onOpen: (data: UserGameDataType) => void;
  onClose: () => void;
  data?: UserGameDataType;
  editData?: EditDataProps;
  setEditData: (editData: EditDataProps) => void;
};

const initialState = {
  isOpen: false,
};

export const useEditGameLibraryModal = create<ModalProps>((set) => ({
  ...initialState,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
  setEditData: (editData: EditDataProps) => set({ editData }),
}));
