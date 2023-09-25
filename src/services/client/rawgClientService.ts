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
import { getAll, getDetail } from "./genericTemplateClient";
import {
  GameTagDetailReturnType,
  GameTagReturnType,
} from "@/types/gameTagType";
import { queryDetail } from "../server/genericTemplate";

// use to have easier query in client (in syntax => so you don't need to write axios)
// => which pretty had to know what it doing through the URL
// flow: client => client service => server => axios config => 3rd party API

export const searchGame = async (
  query: string
): Promise<GameSearchReturnType> => {
  const { data } = await axios.post("/api/games/search", {
    query: query,
  });

  return data as GameSearchReturnType;
};

export const getGameDetail = async (
  id: string
): Promise<GameDetailResponseType> => {
  const { data } = await axios.get("/api/games/detail", {
    params: {
      id: id,
    },
  });
  return data as GameDetailResponseType;
};

export const getAllGenres = async (): Promise<GameGenresReturnType> => {
  return getAll<GameGenresReturnType>("genres");
};

export const getGenreDetail = async (
  id: string
): Promise<GameGenresDetailReturnType> => {
  return queryDetail<GameGenresDetailReturnType>("genres", id);
};

export const getAllPlatform = async (): Promise<GamePlatformReturnType> => {
  return getAll<GamePlatformReturnType>("platforms");
};

export const getPlatformDetail = async (
  id: string
): Promise<GamePlatformDetailReturnType> => {
  return queryDetail<GamePlatformDetailReturnType>("platforms", id);
};

export const getAllTag = async (): Promise<GameTagReturnType> => {
  return getAll<GameTagReturnType>("tags");
};

export const getTagDetail = async (
  id: string
): Promise<GameTagDetailReturnType> => {
  return queryDetail<GameTagDetailReturnType>("tags", id);
};
