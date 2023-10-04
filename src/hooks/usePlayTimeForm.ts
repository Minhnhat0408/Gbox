import { createWithEqualityFn } from "zustand/traditional";

type Time = {
  type: "AM" | "PM";
  time: string;
};

type PlayTimeStoreType = {
  startTime: Time;
  endTime: Time;
  currentTimeSetting: "AM" | "PM";
  setStartTime: (startTime: Time) => void;
  setEndTime: (endTime: Time) => void;
  setCurrentTimeSetting: (currentTimeSetting: "AM" | "PM") => void;
};

const initialPlayTimeForm = {
  startTime: {
    type: "AM",
    time: "9:00",
  },
  endTime: {
    type: "AM",
    time: "9:00",
  },
  currentTimeSetting: "AM",
} as PlayTimeStoreType;

// have to add 2nd paramaters to the store with "shallow"
export const usePlayTimeForm = createWithEqualityFn<PlayTimeStoreType>(
  (set) => ({
    ...initialPlayTimeForm,
    setStartTime: (startTime) => set({ startTime }),
    setEndTime: (endTime) => set({ endTime }),
    setCurrentTimeSetting: (currentTimeSetting) => set({ currentTimeSetting }),
  }),
  Object.is
);
