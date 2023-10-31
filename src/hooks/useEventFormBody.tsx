import { GameData } from "@/types/ign/GameSearchType";
import { toast } from "sonner";
import { createWithEqualityFn } from "zustand/traditional";

type ImageType = {
  file: File;
  preview: string;
};

type EventErrorProps = {
  startDate?: string | null;
  startTime?: string | null;
  endDate?: string | null;
  endTime?: string | null;
  image?: string | null;
};

type EventFormBodyProps = {
  eventName: string | null;
  gameData: GameData | null;
  startDate: Date | null;
  startTime: string | null;
  image: ImageType | null;
  eventDescription: string | null;
  endDate?: Date | null;
  endTime?: string | null;
  totalPeople?: number | null;
  eventTags?: string[] | null;
  eventRules?: string[] | null;
  setEventName: (eventName: string) => void;
  setGameData: (gameData: GameData) => void;
  setStartDate: (startDate: Date) => void;
  setStartTime: (startTime: string) => void;
  setEventDescription: (eventDescription: string) => void;
  setEndDate: (endDate: Date | null) => void;
  setEndTime: (endTime: string | null) => void;
  setTotalPeople: (totalPeople: number) => void;
  setEventTags: (eventTags: string[]) => void;
  setEventRules: (eventRules: string[]) => void;
  reset: () => void;
  error: EventErrorProps;
  setError: (error: EventErrorProps) => void;
  setImage: (image: File | null) => void;
};

const initialValue = {
  eventName: null,
  gameData: null,
  startDate: new Date(),
  startTime: null,
  eventDescription: null,
  endDate: new Date(),
  endTime: null,
  totalPeople: null,
  eventTags: null,
  eventRules: null,
  image: null,
  error: {},
};

export const useEventFormBodyModal = createWithEqualityFn<EventFormBodyProps>(
  (set) => ({
    ...initialValue,
    setEventName: (eventName) => set({ eventName }),
    setGameData: (gameData) => set({ gameData }),
    setStartDate: (startDate) => set({ startDate }),
    setStartTime: (startTime) => set({ startTime }),
    setEventDescription: (eventDescription) => set({ eventDescription }),
    setEndDate: (endDate) => set({ endDate }),
    setEndTime: (endTime) => set({ endTime }),
    setTotalPeople: (totalPeople) => set({ totalPeople }),
    setEventTags: (eventTags) => set({ eventTags }),
    setEventRules: (eventRules) => set({ eventRules }),
    setError: (error) => set({ error }),
    reset: () => set({ ...initialValue }),
    setImage: (image) => {
      if (!image) return;
      if (image.type.includes("image")) {
        set((state) => {
          if (state.image?.preview) {
            URL.revokeObjectURL(state.image.preview);
          }
          return {
            ...state,
            image: {
              file: image,
              preview: URL.createObjectURL(image),
            },
          };
        });
      } else {
        toast.error("Please select an image file", {
          duration: 1000,
        });
      }
    },
  }),
  Object.is
);
