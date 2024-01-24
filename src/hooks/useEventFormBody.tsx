import { GameData } from "@/types/ign/GameSearchType";
import { EventParticipationsDetailType } from "@/types/supabaseTableType";
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
  gameData: GameData | null;
  gameName: string | null;
  startDate: Date | null;
  startTime: string | null;
  image: ImageType | null;
  eventDescription: string | null;
  endDate?: Date | null;
  endTime?: string | null;
  totalPeople?: number | null;
  eventTags?: string[] | null;
  eventRules?: string[] | null;
  isPosting: boolean;
  setGameName: (name: string) => void;
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
  setIsPosting: (isPosting: boolean) => void;
  name?: string;
  setName: (name: string) => void;
  description?: string;
  setDescription: (description: string) => void;
  changeTime: number;
  setChangeTime: (changeTime: number) => void;
  oldImage?: string;
  setOldImage: (oldImage: string) => void;
  imageType?: string;
  setImageType: (imageType: string) => void;
  oldID?: string;
  setOldID: (oldID: string) => void;
  event_participations?: EventParticipationsDetailType[];
  setEventParticipations: (
    event_participations: EventParticipationsDetailType[]
  ) => void;
};

const initialValue = {
  gameData: null,
  gameName: null,
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
  isPosting: false,
  changeTime: 0,
};

export const useEventFormBodyModal = createWithEqualityFn<EventFormBodyProps>(
  (set) => ({
    ...initialValue,
    setEventParticipations: (event_participations) =>
      set({ event_participations }),
    setOldID: (oldID) => set({ oldID }),
    setImageType: (imageType) => set({ imageType }),
    setOldImage: (oldImage) => set({ oldImage }),
    setChangeTime: (changeTime) => set({ changeTime }),
    setName: (name) => set({ name }),
    setDescription: (description) => set({ description }),
    setIsPosting: (isPosting) => set({ isPosting }),
    setGameName: (name) => set({ gameName: name }),
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
