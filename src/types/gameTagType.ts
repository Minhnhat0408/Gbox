import { GameGenres, GameGenresDetailReturnType } from "./gameGenresType";

type GameTag = GameGenres & {
  /** expect to be "eng", not "rus" */
  language: string;
};

type GameTagReturnType =
  | {
      status: 200;
      data: GameTag[];
    }
  | {
      status: 404;
      data: [];
    };

type GameTagDetailReturnType = GameGenresDetailReturnType;

export type { GameTagReturnType, GameTagDetailReturnType };
