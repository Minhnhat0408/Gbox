"use server";

import { GameIGNSearchReturnType } from "@/types/ign/GameSearchType";
import { ignQuery } from "./genericTemplate";
import {
  ComingSoonGameType,
  UpcomingGameType,
} from "@/types/ign/ComingSoonGameType";

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

export const queryIGNNewsOverall = async (
  startIndex: number,
  count: number
): Promise<any> => {
  return ignQuery(
    "HomepageContentFeed",
    {
      filter: "Latest",
      region: "us",
      startIndex: startIndex,
      count: count,
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

export const queryGameComingSoon = async (): Promise<ComingSoonGameType> => {
  return ignQuery(
    "ComingSoon",
    { region: "us" },
    process.env.IGN_COMING_SOON_GAME_HASH as string
  );
};

export const queryUpcomingGameThisMonth =
  async (): Promise<UpcomingGameType> => {
    let now = new Date();
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth();

    return ignQuery(
      "Upcoming",
      {
        objectType: "Game",
        region: "us",
        startYear: currentYear,
        startMonth: currentMonth,
        count: 10,
      },
      process.env.IGN_UPCOMING_GAME_HASH as string
    );
  };

export const queryGameDetailBySlug = async (slug: string): Promise<any> => {
  return ignQuery(
    "ObjectInfo",
    {
      objectType: "Game",
      slug: slug,
    },
    process.env.IGN_GAME_INFORMATION_HASH as string
  );
};
