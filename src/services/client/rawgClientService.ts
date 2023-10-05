import { GameDetailResponseType } from "@/types/gameDetailType";
import {
  GameGenresDetailReturnType,
  GameGenresReturnType,
} from "@/types/gameGenresType";
import {
  GamePlatformDetailReturnType,
  GamePlatformReturnType,
} from "@/types/gamePlatformType";
import { GameSearchReturnType } from "@/types/gameSearchType";
import axios from "axios";
import { getAll, getDetail, getDetailByParams } from "./genericTemplateClient";
import {
  GameTagDetailReturnType,
  GameTagReturnType,
} from "@/types/gameTagType";
import { GameRedditPostReturnType } from "@/types/gamePostType";
import { GameRecommendReturnType } from "@/types/gameRecommendType";
import { GameAchivementReturnType } from "@/types/gameAchivementType";
import { GameYoutubeVideoReturnType } from "@/types/gameYoutubeVideoType";
import { GameTopReturnType } from "@/types/gameTopType";

// use to have easier query in client (in syntax => so you don't need to write axios)
// => which pretty had to know what it doing through the URL
// flow: client => client service => server API => server service => axios config => 3rd party API

export const searchGame = async (
  query: string
): Promise<GameSearchReturnType> => {
  const { data } = await axios.post("/api/games/search", {
    query: query,
  });

  return data as GameSearchReturnType;
};

/**
 * 
 * @param gameName tên game
 * @param currentPage trang hiện tại
 * @param pageSize kích thước trang
 * @returns mảng dữ liệu game
 * author: NQHUY
 */
export const pagingGame = async(gameName: string, currentPage: number, pageSize: number = 10) : 
Promise<GameSearchReturnType> => {
  const { data } = await axios.post("/api/games/paging", {
    name : gameName,
    currentPage: currentPage,
    pageSize: pageSize
  });

  return data as GameSearchReturnType;
}

export const getGameDetail = async (
  id: string
): Promise<GameDetailResponseType> => {
  return getDetailByParams<GameDetailResponseType>("detail", id);
};

export const getAllGenres = async (): Promise<GameGenresReturnType> => {
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

export const getAllTag = async (): Promise<GameTagReturnType> => {
  return getAll<GameTagReturnType>("tags");
};

export const getTagDetail = async (
  id: string
): Promise<GameTagDetailReturnType> => {
  return getDetail<GameTagDetailReturnType>("tags", id);
};

export const getGameRedditPost = async (
  id: string
): Promise<GameRedditPostReturnType> => {
  return getDetailByParams<GameRedditPostReturnType>("posts", id);
};

export const getSimiarGame = async (
  id: string
): Promise<GameRecommendReturnType> => {
  return getDetailByParams<GameRecommendReturnType>("recommend", id);
};

export const getGameAchivement = async (
  id: string
): Promise<GameAchivementReturnType> => {
  return getDetailByParams<GameAchivementReturnType>("achivements", id);
};

export const getGameYoutubeVideo = async (
  id: string
): Promise<GameYoutubeVideoReturnType> => {
  return getDetailByParams<GameYoutubeVideoReturnType>("youtube", id);
};

export const getAllTopGame = async (): Promise<GameTopReturnType> => {
  return getAll<GameTopReturnType>("top");
};
