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
