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
import { getDetail, getAll } from "./genericTemplate";

export const searchGames = async (
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

export const getGameDetail = async (
  gameID: string
): Promise<GameDetailResponseType> => {
  return getDetail<GameDetailResponseType>("games", gameID);
};

export const getAllGameGenres = async (): Promise<GameGenresReturnType> => {
  return getAll<GameGenresReturnType>("genres");
};

export const getGenreDetail = async (
  id: string
): Promise<GameGenresDetailReturnType> => {
  return getDetail<GameGenresDetailReturnType>("genres", id);
};

export const getAllPlatform = async (): Promise<GamePlatformReturnType> => {
  return getAll<GamePlatformReturnType>("platforms");
};

export const getPlatformDetail = async (
  id: string
): Promise<GamePlatformDetailReturnType> => {
  return getDetail<GamePlatformDetailReturnType>("platforms", id);
};

// 30 first popular tags
export const getPopularTag = async (): Promise<GameTagReturnType> => {
  return getAll<GameTagReturnType>("tags", 30);
};

export const getTagDetail = async (
  id: string
): Promise<GameTagDetailReturnType> => {
  return getDetail<GameTagDetailReturnType>("tags", id);
};
