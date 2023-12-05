import { CourseSessionType } from "@/types/supabaseTableType";
import { toast } from "sonner";
import { create } from "zustand";

type Schedule = {
  startTime: string;
  date: Date;
};

type State = {
  isOpen: boolean;
  onOpen: (courseData: CourseSessionType, quantity: number) => void;
  onClose: () => void;
  quantity: number;
  courseData?: CourseSessionType;
  setQuantity: (quantity: number) => void;
  schedules: Schedule[];
  addSchedule: (schedule: Schedule, index: number) => void;
  removeSchedule: (index: number) => void;
  reset: () => void;
};

const initialState = {
  isOpen: false,
  quantity: 1,
  schedules: [],
};

export const useProcessBuySessionModal = create<State>((set) => ({
  ...initialState,
  onOpen: (courseData, quantity) => set({ isOpen: true, quantity, courseData }),
  onClose: () => set({ isOpen: false }),
  setQuantity: (quantity) => set({ quantity }),
  reset: () => set(initialState),
  addSchedule: (schedule, index) =>
    set((state) => {
      // check if schedule time and date is already exist
      const isExist = state.schedules.find(
        (s) =>
          s.startTime === schedule.startTime &&
          s.date.getTime() === schedule.date.getTime()
      );
      if (isExist) {
        toast.error("Schedule already exist");
        return state;
      }
      // add schedule
      const newSchedules = [...state.schedules];
      newSchedules[index] = schedule;
      return { schedules: newSchedules };
    }),
  removeSchedule: (index) =>
    set((state) => ({
      schedules: state.schedules.filter((_, i) => i !== index),
    })),
}));
