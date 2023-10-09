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

export const queryIGNGameRecommend = async (): Promise<any> => {
  return ignQuery(
    "LibraryRecommendations",
    { count: 50 },
    process.env.IGN_RECOMMEND_HASH as string
  );
};

export const queryIGNNewsOverall = async (): Promise<any> => {
  return ignQuery(
    "HomepageContentFeed",
    {
      filter: "Latest",
      region: "us",
      startIndex: 0,
      count: 12,
      newsOnly: false,
    },
    process.env.IGN_NEWS_HASH as string
  );
};

export const queryIGNNewsForGame = async (
  name: string,
  startIndex: number,
  limit: number
): Promise<any> => {
  return ignQuery(
    "ObjectContentFeed",
    {
      slug: name,
      objectType: "Game",
      filter: "Latest",
      region: "us",
      startIndex: startIndex,
      count: limit,
    },
    process.env.IGN_NEWS_GAME_HASH as string
  );
};
