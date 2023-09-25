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
  try {
    const { data } = await rawgApi.get("games/" + gameID);
    return { status: 200, data: data };
  } catch (error) {
    return { status: 404, data: {} };
  }
};

export const getAllGameGenres = async (): Promise<GameGenresReturnType> => {
  try {
    const {
      data: { results },
    } = await rawgApi.get("genres");

    return { status: 200, data: results };
  } catch (error) {
    return { status: 404, data: [] };
  }
};

export const getGenreDetail = async (
  id: string
): Promise<GameGenresDetailReturnType> => {
  try {
    const { data } = await rawgApi.get("genres/" + id);
    return { status: 200, data: data };
  } catch (error) {
    return { status: 404, data: {} };
  }
};

export const getAllPlatform = async (): Promise<GamePlatformReturnType> => {
  try {
    const {
      data: { results },
    } = await rawgApi.get("platforms");

    return { status: 200, data: results };
  } catch (error) {
    return { status: 404, data: [] };
  }
};

export const getPlatformDetail = async (
  id: string
): Promise<GamePlatformDetailReturnType> => {
  try {
    const { data } = await rawgApi.get("platforms/" + id);
    console.log(data);

    return { status: 200, data: data };
  } catch (error) {
    return { status: 404, data: {} };
  }
};
