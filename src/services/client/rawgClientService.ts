import { GameDetailResponseType } from "@/types/gameDetailType";
import { GameSearchDetail } from "@/types/gameSearchType";
import axios from "axios";

// use to have easier query in client
// flow: client => client service => server => axios config => 3rd party API

export const searchGame = async (
  query: string
): Promise<GameSearchDetail[]> => {
  const {
    data: { result },
  } = await axios.post("/api/games/search", {
    query: query,
  });
  return result as GameSearchDetail[];
};

export const getGameDetail = async (
  id: string
): Promise<GameDetailResponseType> => {
  const {
    data: { result },
  } = await axios.get("/api/games/detail", {
    params: {
      id: id,
    },
  });
  return result as GameDetailResponseType;
};

export const getAllGenres = async () => {};
