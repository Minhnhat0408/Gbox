import { GameData } from "@/types/ign/GameSearchType";
import { create } from "zustand";

type ChooseGame = {
  data: GameData;
  ingameName?: string;
};

type CoachProfile = {
  description: string;
  firstName: string;
  lastName: string;
  country: string;
};

type ApplyFormData = {
  gameData: GameData[];
  initialGameData?: GameData[];
  isLoading: boolean;
  openOption: boolean;
  searchValue: string;
  choosedGame: ChooseGame[];
  anotherGame: string[];
  coachProfile: CoachProfile;
  chooseGameError?: string;
  setCoachProfile: (coachProfile: CoachProfile) => void;
  setSearchValue: (searchValue: string) => void;
  setChooseGameError: (chooseGameError: string) => void;
  setGameData: (data: GameData[]) => void;
  setInitialGameData: (data: GameData[]) => void;
  setOpenOption: (openOption: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  addChoosedGame: (choosedGame: ChooseGame) => void;
  removeChoosedGame: (index: number) => void;
  addIngameName: (index: number, ingameName: string) => void;
  addAnotherGame: (anotherGame: string, index: number) => void;
  removeAnotherGame: (index: number) => void;
  setAnotherGame: (anotherGame: string[]) => void;
};

const initialState = {
  gameData: [],
  choosedGame: [],
  searchValue: "",
  isLoading: false,
  openOption: false,
  anotherGame: [],
  coachProfile: {
    description: "",
    firstName: "",
    lastName: "",
    country: "",
  },
};

export const useApplyFormData = create<ApplyFormData>((set) => ({
  ...initialState,
  setCoachProfile: (coachProfile: CoachProfile) => set({ coachProfile }),
  setChooseGameError: (chooseGameError: string) => set({ chooseGameError }),
  setSearchValue: (searchValue: string) => set({ searchValue }),
  setInitialGameData: (initialGameData: GameData[]) => set({ initialGameData }),
  setOpenOption: (openOption: boolean) => set({ openOption }),
  setGameData: (data: GameData[]) => set({ gameData: data }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setAnotherGame: (anotherGame: string[]) => set({ anotherGame }),
  addChoosedGame: (choosedGame: ChooseGame) =>
    set((state) => {
      // only add if not exist
      const isExist = state.choosedGame.some(
        (item) => item.data.slug === choosedGame.data.slug
      );
      if (!isExist) {
        return {
          choosedGame: [...state.choosedGame, choosedGame],
        };
      }
      return {
        choosedGame: [...state.choosedGame],
      };
    }),
  removeChoosedGame: (index: number) =>
    set((state) => {
      const newChoosedGame = [...state.choosedGame];
      newChoosedGame.splice(index, 1);
      return {
        choosedGame: newChoosedGame,
      };
    }),
  addIngameName: (index: number, ingameName: string) =>
    set((state) => {
      const newChoosedGame = [...state.choosedGame];
      newChoosedGame[index].ingameName = ingameName;
      return {
        choosedGame: newChoosedGame,
      };
    }),
  addAnotherGame: (anotherGame: string, index: number) =>
    set((state) => {
      const newAnotherGame = [...state.anotherGame];
      newAnotherGame[index] = anotherGame;
      return {
        anotherGame: newAnotherGame,
      };
    }),
  removeAnotherGame: (index: number) =>
    set((state) => {
      const newAnotherGame = [...state.anotherGame];
      newAnotherGame.splice(index, 1);
      return {
        anotherGame: newAnotherGame,
      };
    }),
}));
