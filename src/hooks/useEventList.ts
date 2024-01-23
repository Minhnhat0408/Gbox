import { EventReturnType } from "@/types/supabaseTableType";
import { create } from "zustand";

type EventList = {
  eventsList: EventReturnType[];
  setEventsList: (events: EventReturnType[]) => void;
};

export const useEventList = create<EventList>((set) => ({
  eventsList: [],
  setEventsList: (events) => set({ eventsList: events }),
}));
