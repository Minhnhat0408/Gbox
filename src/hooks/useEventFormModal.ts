import { create } from "zustand";

type FormType = "create" | "edit";

type EventFormProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
  formType: FormType;
  setFormType: (formType: FormType) => void;
};

const initialValue = {
  isOpen: false,
  formType: "create" as FormType,
};

export const useEventFormModal = create<EventFormProps>((set) => ({
  ...initialValue,
  setFormType: (formType) => set({ formType }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initialValue }),
}));
