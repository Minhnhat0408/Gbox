import { create } from "zustand";

type EventMoreInformationProps = {
  tags: string[];
  addTags: (tag: string) => void;
  removeTags: (index: number) => void;
  clearTags: () => void;
  inputTags: string;
  setInputTags: (tag: string) => void;
  people: string;
  setPeople: (people: string) => void;
  rules: string[];
  addRules: (rule: string) => void;
  removeRules: (index: number) => void;
  clearRules: () => void;
  inputRules: string;
  setInputRules: (rule: string) => void;
  resetAll: () => void;
};

const initialState = {
  tags: [],
  people: "",
  rules: [],
  inputTags: "",
  inputRules: "",
};

export const useEventMoreInformation = create<EventMoreInformationProps>(
  (set) => ({
    ...initialState,
    addTags: (tag) =>
      set((state) => ({
        tags: [...state.tags, tag],
      })),
    removeTags: (index) =>
      set((state) => ({
        tags: state.tags.filter((_, i) => i !== index),
      })),
    clearTags: () =>
      set((state) => ({
        tags: [],
      })),
    setPeople: (people) =>
      set(() => ({
        people,
      })),
    addRules: (rule) =>
      set((state) => ({
        rules: [...state.rules, rule],
      })),
    removeRules: (index) =>
      set((state) => ({
        rules: state.rules.filter((_, i) => i !== index),
      })),
    clearRules: () =>
      set((state) => ({
        rules: [],
      })),

    setInputTags: (tag) =>
      set(() => ({
        inputTags: tag,
      })),
    setInputRules: (rule) =>
      set(() => ({
        inputRules: rule,
      })),
    resetAll: () =>
      set(() => ({
        ...initialState,
      })),
  })
);
