import { UserGameDataType } from "@/types/supabaseTableType";
import { create } from "zustand";

export type SortType =
  | "rating"
  | "status"
  | "name"
  | "date"
  | "is_favourite"
  | "";

export function convertSortType(sortType: SortType) {
  switch (sortType) {
    case "rating":
      return "score_rate";
    case "status":
      return "status";
    case "name":
      return "game_meta_data->name";
    case "date":
      return "modified_date";
    case "is_favourite":
      return "is_favourite";
    default:
      return "modified_date";
  }
}

type SortState = {
  sortBy: SortType | "";
  isAscending: boolean;
};

type UserGameLibraryProps = {
  gameData: UserGameDataType[];
  setGameData: (gameData: UserGameDataType[]) => void;
  sortType: SortState;
  setSortType: (sortType: SortState) => void;
};

const initalValue = {
  gameData: [],
  sortType: {
    sortBy: "date" as SortType,
    isAscending: false,
  },
};

export const useUserGameLibrary = create<UserGameLibraryProps>((set) => ({
  ...initalValue,
  setGameData: (gameData) => set({ gameData }),
  setSortType: (sortType) => set({ sortType }),
}));
