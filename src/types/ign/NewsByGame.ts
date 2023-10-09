import { GameNewsData } from "./GameNewsType";

// // news for only that game
export type NewsByGameServerReturnType =
  | {
      status: 200;
      data: {
        objectSelectByTypeAndSlug: {
          contentFeed: {
            feedItems: GameNewsData[];
          };
        };
      };
    }
  | {
      status: 400;
      data: null;
    };

export type NewsByGameClientReturnType =
  | {
      status: 200;
      data: GameNewsData[];
    }
  | {
      status: 400;
      data: null;
    };
