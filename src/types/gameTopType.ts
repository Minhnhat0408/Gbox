import { GameSearchDetail } from "./gameSearchType";

type GameTopReturnType = {
  status: 200 | 404;
  data: GameSearchDetail[];
};

export type { GameTopReturnType };
