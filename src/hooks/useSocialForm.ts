import { create } from "zustand";

type SocialFormState = {
  data: {
    coachingHour: string;
    email: string;
    youtubeLink?: string;
    facebookLink?: string;
    discordLink?: string;
  };
  setData: (data: SocialFormState["data"]) => void;
};

export const useSocialForm = create<SocialFormState>((set) => ({
  data: {
    coachingHour: "",
    email: "",
  },
  setData: (data) => set({ data }),
}));
