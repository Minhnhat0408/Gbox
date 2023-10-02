import { create } from "zustand";

type InformationFormType =
  | "user-form"
  | "information-form"
  | "gaming-form"
  | "played-form"
  | "playtime-form";

type InformationStore = {
  isOpen: boolean;
  formType: InformationFormType;
  setFormType: (formType: InformationFormType) => void;
  onOpen: () => void;
  onClose: () => void;
};

// every time we create a modal, we call this inside the component

const useInformationModal = create<InformationStore>((set) => ({
  isOpen: false,
  formType: "user-form",
  setFormType: (formType) => set({ formType }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useInformationModal;
