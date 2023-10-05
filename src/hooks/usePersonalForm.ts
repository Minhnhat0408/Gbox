import { createWithEqualityFn } from "zustand/traditional";

export type Gender = "male" | "female" | "other" | "";

type PersonamFormStore = {
  avatar: File | undefined;
  gender: Gender;
  month: string;
  date: string;
  year: string;
  setAvatar: (avatar: File) => void;
  setGender: (gender: Gender) => void;
  setMonth: (month: string) => void;
  setDate: (date: string) => void;
  setYear: (year: string) => void;
};

const initialPersonalFormState = {
  avatar: undefined,
  gender: "" as Gender,
  month: "",
  date: "",
  year: "",
};

export const userPersonalForm = createWithEqualityFn<PersonamFormStore>(
  (set) => ({
    ...initialPersonalFormState,
    setAvatar: (avatar) => set({ avatar }),
    setGender: (gender) => set({ gender }),
    setDate: (date) => set({ date }),
    setMonth: (month) => set({ month }),
    setYear: (year) => set({ year }),
  }),
  Object.is
);
