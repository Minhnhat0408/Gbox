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
import { queryAll, queryDetail, subQueryAll } from "./genericTemplate";
import { GameRedditPostReturnType } from "@/types/gamePostType";
import { GameRecommendReturnType } from "@/types/gameRecommendType";
import { GameAchivementReturnType } from "@/types/gameAchivementType";
import { GameYoutubeVideoReturnType } from "@/types/gameYoutubeVideoType";
import { GameTopReturnType } from "@/types/gameTopType";

// use in server component and API Route
// flow: server service => axios => 3rd party
// => won't reveal request and secret key

export const querySearchGames = async (
  query: string,
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

/**
 * 
 * @param name tên game
 * @param currentPage trang hiện tại
 * @param pageSize số bản ghi của 1 trang
 * @returns mảng dữ liệu game, không thì trả về 404
 * author: NQHUY
 */
export const queryPagingGames = async (name: string, currentPage: number, pageSize: number) : Promise<GameSearchReturnType> => {
  try {
    const { data } = await rawgApi.get("games", {
      params: {
        search: name,
        page_size: pageSize,
        page: currentPage
      },
    });
    return { status: 200, data: data.results };
  } catch (error) {
    return {
      status: 404,
      data: [],
    };
  }
}

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

export const queryGameAchivement = async (
  id: string
): Promise<GameAchivementReturnType> => {
  return queryDetail<GameAchivementReturnType>(
    "games",
    id + "/achievements",
    30
  );
};

export const queryGameYoutubeVideo = async (
  id: string
): Promise<GameYoutubeVideoReturnType> => {
  return queryDetail<GameYoutubeVideoReturnType>("games", id + "/youtube", 20);
};

export const queryTopGame = async (): Promise<GameTopReturnType> => {
  return subQueryAll<GameTopReturnType>("games/lists/popular", {
    discover: true,
    page_size: "24",
    page: "1",
  });
};
