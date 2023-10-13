import { create } from "zustand";
import uuid from "react-uuid";

type FileInfor = {
  file: File;
  type: "image" | "video";
  preview: string;
};

type FormImageProps = {
  medias: FileInfor[];
  uuid: string;
  addMedia: (media: File) => void;
  removeMedia: (index: number) => void;
  setError: (error: string | null) => void;
  error: string | null;
  reset: () => void;
};

export const useFormMedia = create<FormImageProps>((set) => ({
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
        if (state.medias.some((m) => m.type === "video")) {
          return {
            medias: [{ file: media, type: "image", preview }],
            error: null,
          };
        }
        return {
          medias: [...state.medias, { file: media, type: "image", preview }],
          error: null,
        };
      });
    }
    if (media.type.includes("video")) {
      const preview = URL.createObjectURL(media);
      set((state) => {
        if (state.medias.some((m) => m.type === "video")) {
          return {
            uuid: uuid(),
            error: "You can only upload 1 video",
          };
        }
        if (state.medias.some((m) => m.type === "image")) {
          return {
            medias: [{ file: media, type: "video", preview }],
            error: null,
          };
        }
        return {
          medias: [...state.medias, { file: media, type: "video", preview }],
          error: null,
        };
      });
    }
    if (!media.type.includes("image") && !media.type.includes("video")) {
      set((state) => {
        return {
          uuid: uuid(),
          error: "You can only upload images and videos",
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
      if (media.type === "video" && media.preview) {
        URL.revokeObjectURL(media.preview);
      }
      medias.splice(index, 1);
      return { medias };
    });
  },
}));
