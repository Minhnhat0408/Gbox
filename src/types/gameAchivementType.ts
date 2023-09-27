type AchivementDetail = {
  id: number;
  name: string;
  description: string;
  image?: string;
  /** percent of player achive this achivement in game */
  percent?: string;
};

type GameAchivementReturnType =
  | {
      status: 200;
      data: {
        results: AchivementDetail[];
      };
    }
  | {
      status: 404;
      data: [];
    };

export type { AchivementDetail, GameAchivementReturnType };
