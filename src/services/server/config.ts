import axios from "axios";

export const rawgApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RAWG_API_URL,
  params: {
    key: process.env.NEXT_PUBLIC_RAWG_API_KEY,
  },
});

export const ignAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_IGN_API_URL,
  params: {
    //variables + extensions + operation name
  },
});
