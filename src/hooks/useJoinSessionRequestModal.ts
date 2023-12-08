import { StudentRequestTypeWithStudentAndCourse } from "@/types/supabaseTableType";
import { create } from "zustand";

type State = {
  isOpen: boolean;
  data?: StudentRequestTypeWithStudentAndCourse;
  onOpen: (data: StudentRequestTypeWithStudentAndCourse) => void;
  onClose: () => void;
};

export const useJoinSessionRequestModal = create<State>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: undefined }),
}));
