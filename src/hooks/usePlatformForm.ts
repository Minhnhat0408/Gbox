import { createWithEqualityFn } from "zustand/traditional";

export type Platform = {
  name: string;
  image_background: string;
  slug: string;
};

type GamingPlatform = {
  gaming_platform: Platform[];
  setGamingPlatform: (gaming_platform: Platform[]) => void;
};

const initialGamingFormState = {
  gaming_platform: [],
};

// set is true

export const usePlatformForm = createWithEqualityFn<GamingPlatform>(
  (set) => ({
    ...initialGamingFormState,
    setGamingPlatform: (gaming_platform) => set({ gaming_platform }),
  }),
  Object.is
);