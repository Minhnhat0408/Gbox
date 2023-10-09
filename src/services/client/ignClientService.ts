import {
  GameRecommendIGNClientReturnType,
  GameRecommendIGNReturnType,
} from "@/types/ign/GameRecommendType";
import {
  GameIGNSearchClientType,
  GameIGNSearchReturnType,
} from "@/types/ign/GameSearchType";
import axios from "axios";

export const searchGameIGN = async (
  word: string,
  limit: number,
  startIndex: number
): Promise<GameIGNSearchClientType> => {
  try {
    const { data } = (await axios.get("/api/ign/search", {
      params: {
        word: word,
        limit: limit,
        startIndex: startIndex,
      },
    })) as { data: GameIGNSearchReturnType };
    return { status: 200, data: data.data!.searchObjectsByName.objects };
  } catch (err) {
    return { status: 400, data: null };
  }
};

export const recommendGame =
  async (): Promise<GameRecommendIGNClientReturnType> => {
    try {
      const { data } = (await axios.get("/api/ign/recommend")) as {
        data: GameRecommendIGNReturnType;
      };

      return { status: 200, data: data.data!.libraryRecommendations.objects };
    } catch (err) {
      return { status: 400, data: null };
    }
  };
