import { create } from "zustand";
import uuid from "react-uuid";

type FileInfor = {
  file: File;
  type: "image";
  name: string;
  preview: string;
};

type CoachFinishImage = {
  medias: FileInfor[];
  uuid: string;
  addMedia: (media: File) => void;
  removeMedia: (index: number) => void;
  setError: (error: string | null) => void;
  error: string | null;
  reset: () => void;
};

export const useCoachFinishFormImage = create<CoachFinishImage>((set) => ({
  medias: [],
  error: null,
  uuid: uuid(),
  setError: (error: string | null) => {
    set({ error });
  },
  reset: () => {
    set({ medias: [], error: null });
  },
  addMedia: (media: File) => {
    if (!media) return;
    if (media.type.includes("image")) {
      set((state) => {
        if (state.medias.length >= 10)
          return {
            uuid: uuid(),
            error: "You can only upload 10 images",
          };
        const preview = URL.createObjectURL(media);
        return {
          medias: [
            ...state.medias,
            { file: media, type: "image", preview, name: media.name },
          ],
          error: null,
        };
      });
    }
    if (!media.type.includes("image")) {
      set((state) => {
        return {
          uuid: uuid(),
          error: "You can only upload images",
        };
      });
    }
  },
  removeMedia: (index: number) => {
    set((state) => {
      const medias = [...state.medias];
      const media = medias[index];
      if (media.type === "image" && media.preview) {
        URL.revokeObjectURL(media.preview);
      }
      medias.splice(index, 1);
      return { medias };
    });
  },
}));
