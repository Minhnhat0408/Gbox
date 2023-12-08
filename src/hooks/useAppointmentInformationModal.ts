import { DetailedAppointmentType } from "@/types/supabaseTableType";
import { create } from "zustand";

type AppointmentInformationModalState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: (data: DetailedAppointmentType) => void;
  data?: DetailedAppointmentType;
};

export const useAppointmentInformationModal =
  create<AppointmentInformationModalState>((set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: (data) => set({ isOpen: true, data }),
  }));
