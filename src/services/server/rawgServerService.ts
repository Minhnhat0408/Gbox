"use server";

import { GameSearchReturnType } from "@/types/gameSearchType";
import { rawgApi } from "./config";
import { GameDetailResponseType } from "@/types/gameDetailType";
import {
  GameGenresDetailReturnType,
  GameGenresReturnType,
} from "@/types/gameGenresType";
import {
  GamePlatformDetailReturnType,
  GamePlatformReturnType,
} from "@/types/gamePlatformType";
import {
  GameTagDetailReturnType,
  GameTagReturnType,
} from "@/types/gameTagType";
import { queryAll, queryDetail } from "./genericTemplate";
import { GameRedditPostReturnType } from "@/types/gamePostType";
import { GameRecommendReturnType } from "@/types/gameRecommendType";

export const querySearchGames = async (
  query: string
): Promise<GameSearchReturnType> => {
  try {
    const { data } = await rawgApi.get("games", {
      params: {
        search: query,
        page_size: 10,
      },
    });
    return { status: 200, data: data.results };
  } catch (error) {
    return {
      status: 404,
      data: [],
    };
  }
};

export const queryGameDetail = async (
  gameID: string
): Promise<GameDetailResponseType> => {
  return queryDetail<GameDetailResponseType>("games", gameID);
};

export const queryAllGameGenres = async (): Promise<GameGenresReturnType> => {
  return queryAll<GameGenresReturnType>("genres");
};

export const queryGenreDetail = async (
  id: string
): Promise<GameGenresDetailReturnType> => {
  return queryDetail<GameGenresDetailReturnType>("genres", id);
};

export const queryAllPlatform = async (): Promise<GamePlatformReturnType> => {
  return queryAll<GamePlatformReturnType>("platforms");
};

export const queryPlatformDetail = async (
  id: string
): Promise<GamePlatformDetailReturnType> => {
  return queryDetail<GamePlatformDetailReturnType>("platforms", id);
};

// 30 first popular tags
export const queryPopularTag = async (): Promise<GameTagReturnType> => {
  return queryAll<GameTagReturnType>("tags", 30);
};

export const queryTagDetail = async (
  id: string
): Promise<GameTagDetailReturnType> => {
  return queryDetail<GameTagDetailReturnType>("tags", id);
};

export const queryGameRedditPost = async (
  id: string
): Promise<GameRedditPostReturnType> => {
  return queryDetail<GameRedditPostReturnType>("games", id + "/reddit", 20);
};

export const querySimilarGame = async (
  id: string
): Promise<GameRecommendReturnType> => {
  return queryDetail<GameRecommendReturnType>("games", id + "/suggested", 20);
};
