import { GameData } from "@/types/ign/GameSearchType";
import { createWithEqualityFn } from "zustand/traditional";

type EventFormBodyProps = {
  eventName: string | null;
  gameData: GameData | null;
  startDate: Date | null;
  startTime: string | null;
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
};

const initialValue = {
  eventName: null,
  gameData: null,
  startDate: null,
  startTime: null,
  eventDescription: null,
  endDate: null,
  endTime: null,
  totalPeople: null,
  eventTags: null,
  eventRules: null,
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
    reset: () => set({ ...initialValue }),
  }),
  Object.is
);
