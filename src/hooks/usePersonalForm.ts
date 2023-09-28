import { createWithEqualityFn } from "zustand/traditional";

type Gender = "man" | "woman" | "other";

type PersonamFormStore = {
  avatar: string;
  gender: Gender;
  month: string;
  date: string;
  year: string;
  setAvatar: (avatar: string) => void;
  setGender: (gender: Gender) => void;
  setMonth: (month: string) => void;
  setDate: (date: string) => void;
  setYear: (year: string) => void;
};

const initialPersonalFormState = {
  avatar: "",
  gender: "man" as Gender,
  month: "",
  date: "",
  year: "",
};

export const usePersonamForm = createWithEqualityFn<PersonamFormStore>(
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
