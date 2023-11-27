import {
  GameInformationClientReturnType,
  GameInformationReturnType,
} from "@/types/ign/GameInformationBySlugType";
import {
  GameNewsIGNClientReturnType,
  GameNewsIGNServerReturnType,
} from "@/types/ign/GameNewsType";
import {
  GameRecommendIGNClientReturnType,
  GameRecommendIGNReturnType,
} from "@/types/ign/GameRecommendType";
import {
  GameIGNSearchClientType,
  GameIGNSearchReturnType,
} from "@/types/ign/GameSearchType";
import {
  NewsByGameClientReturnType,
  NewsByGameServerReturnType,
} from "@/types/ign/NewsByGame";
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

export const getAllNews = async (
  startIndex: number,
  countIndex: number
): Promise<GameNewsIGNClientReturnType> => {
  try {
    const { data } = (await axios.get("/api/ign/news", {
      params: {
        startIndex: startIndex,
        count: countIndex,
      },
    })) as {
      data: GameNewsIGNServerReturnType;
    };

    return {
      status: 200,
      data: data.data!.homepage.contentFeed.feedItems.map(
        (item) => item.content
      ),
    };
  } catch (err) {
    return { status: 400, data: null };
  }
};

export const getNewsByGame = async (
  slug: string
): Promise<NewsByGameClientReturnType> => {
  try {
    const { data } = (await axios.get("/api/ign/news/" + slug)) as {
      data: NewsByGameServerReturnType;
    };

    return {
      status: 200,
      data: data.data!.objectSelectByTypeAndSlug.contentFeed.feedItems,
    };
  } catch (err) {
    return { status: 400, data: null };
  }
};

export const getGameDetailBySlug = async (
  slug: string
): Promise<GameInformationClientReturnType> => {
  try {
    const { data } = (await axios.get("/api/ign/game/" + slug)) as {
      data: GameInformationReturnType;
    };

    return { status: 200, data: data.data!.objectSelectByTypeAndSlug };
  } catch (error) {
    return { status: 400, data: null };
  }
};
