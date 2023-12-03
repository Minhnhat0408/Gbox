import { create } from "zustand";

type ViewMode = "feed" | "information" | "library";

type ProfileViewMode = {
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
};

export const useProfileViewMode = create<ProfileViewMode>((set) => ({
  viewMode: "feed",
  setViewMode: (viewMode) => set({ viewMode }),
}));
