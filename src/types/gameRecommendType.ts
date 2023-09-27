import { GameSearchDetail } from "./gameSearchType";

type GameRecommendDetail = GameSearchDetail & {
  /** short descrption for the recommend game */
  short_description: string | null;
};

type GameRecommendReturnType =
  | {
      status: 200;
      data: {
        results: GameRecommendDetail[];
      };
    }
  | {
      status: 404;
      data: {
        results: [];
      };
    };

export type { GameRecommendDetail, GameRecommendReturnType };
