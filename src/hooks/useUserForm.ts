import { createWithEqualityFn } from "zustand/traditional";

type UserFormStore = {
  userName: string;
  bio: string;
  location: string;
  setUserName: (userName: string) => void;
  setBio: (bio: string) => void;
  setLocation: (location: string) => void;
  reset: () => void;
};

const initialUserFormState = {
  userName: "",
  bio: "",
  location: "",
};

// have to add 2nd paramaters to the store with "shallow"
export const useUserForm = createWithEqualityFn<UserFormStore>(
  (set) => ({
    ...initialUserFormState,
    setUserName: (userName) => set({ userName }),
    setBio: (bio) => set({ bio }),
    setLocation: (location) => set({ location }),
    reset: () => set(initialUserFormState),
  }),
  Object.is
);
