import { create } from "zustand";

type ApplyProcessState = "coach-profile" | "social-media" | "finish";

type ApplyProcessStore = {
  applyProcess: ApplyProcessState;
  setApplyProcess: (applyProcess: ApplyProcessState) => void;
};

export const useApplyProcess = create<ApplyProcessStore>((set) => ({
  applyProcess: "coach-profile",
  setApplyProcess: (applyProcess) => set({ applyProcess }),
}));
