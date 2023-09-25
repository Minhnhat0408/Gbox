"use server";

import { GameSearchReturnType } from "@/types/gameSearchType";
import { rawgApi } from "./config";
import { GameDetailResponseType } from "@/types/gameDetailType";

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
