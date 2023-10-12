import { create } from "zustand";

type FileInfor = {
  file: File;
  type: "image" | "video";
  preview: string;
};

type FormImageProps = {
  medias: FileInfor[];
  addMedia: (media: File) => void;
  removeMedia: (index: number) => void;
  error: string | null;
};

export const useFormMedia = create<FormImageProps>((set) => ({
  medias: [],
  error: null,
  addMedia: (media: File) => {
    if (!media) return;
    if (media.type.includes("image")) {
      set((state) => {
        if (state.medias.length >= 10)
          return {
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
    return {
      error: "Invalid file type",
    };
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
