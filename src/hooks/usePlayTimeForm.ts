import { createWithEqualityFn } from "zustand/traditional";

type Time = {
  type: "AM" | "PM";
  hour: number;
  minute: number;
};

type PlayTimeStoreType = {
  startTime: Time;
  endTime: Time;
  setStartTime: (startTime: Time) => void;
  setEndTime: (endTime: Time) => void;
};

const initialPlayTimeForm = {
  startTime: {
    type: "AM",
    hour: 12,
    minute: 0,
  },
  endTime: {
    type: "AM",
    hour: 12,
    minute: 0,
  },
} as PlayTimeStoreType;

// have to add 2nd paramaters to the store with "shallow"
export const usePlayTimeForm = createWithEqualityFn<PlayTimeStoreType>(
  (set) => ({
    ...initialPlayTimeForm,
    setStartTime: (startTime) => set({ startTime }),
    setEndTime: (endTime) => set({ endTime }),
  }),
  Object.is
);
