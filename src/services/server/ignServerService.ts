"use server";

import { GameIGNSearchReturnType } from "@/types/ign/GameSearchType";
import { ignQuery } from "./genericTemplate";

export const queryIGNSearchGame = async (
  word: string,
  limit: number,
  startIndex?: number
): Promise<GameIGNSearchReturnType> => {
  return ignQuery(
    "SearchObjectsByName",
    {
      term: word,
      count: limit,
      startIndex: startIndex ? startIndex : 0,
      objectType: "Game",
    },
    process.env.IGN_SEARCH_HASH as string
  );
};
