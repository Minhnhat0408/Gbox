import { GameData } from "./GameSearchType";

export type GameRecommendIGNReturnType =
  | {
      status: 200;
      data: GameSearchData;
    }
  | {
      status: 400;
      data: null;
    };

export type GameRecommendIGNClientReturnType =
  | {
      status: 200;
      data: GameData[];
    }
  | {
      status: 400;
      data: null;
    };

export type GameSearchData = {
  libraryRecommendations: {
    objects: GameData[];
    pageInfo: {
      hasNext: boolean;
      nextCursor: number;
      total: number;
    };
  };
};
