"use server";

import axios from "axios";

console.log(process.env.RAWG_API_URL);

export const rawgApi = axios.create({
  baseURL: process.env.RAWG_API_URL,
  params: {
    key: process.env.RAWG_API_KEY,
  },
});

export const ignAPI = axios.create({
  baseURL: process.env.IGN_API_URL,
  params: {
    //variables + extensions + operation name
  },
});
