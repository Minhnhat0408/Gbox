import { BasicInformation } from "./gameSearchType";

type GameGenres = BasicInformation & {
  image_background: string;
  /** some example games of the genres */
  games?: BasicInformation[];
};

type GameGenresReturnType =
  | {
      status: 200;
      data: GameGenres[];
    }
  | {
      status: 404;
      data: [];
    };

type GameGenresDetail = BasicInformation & {
  image_background: string;
  /** HTML Text content */
  description?: string;
};

type GameGenresDetailReturnType =
  | {
      status: 200;
      data: GameGenresDetail;
    }
  | {
      status: 404;
      data: {};
    };

export type {
  GameGenres,
  GameGenresReturnType,
  GameGenresDetail,
  GameGenresDetailReturnType,
};
