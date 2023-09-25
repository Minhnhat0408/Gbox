import { rawgApi } from "./config";

export const searchGames = async (query: string) => {
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
      message: "No games found",
    };
  }
};
