import { create } from "zustand";

type OpenState = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useOpenProfilesHeaders = create<OpenState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

export const useOpenNotification = create<OpenState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
