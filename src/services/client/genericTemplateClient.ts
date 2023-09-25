import axios from "axios";

// generic template for get all data in client
const queryALl = async <T>(url: string): Promise<T> => {
  const { data } = await axios.get("/api/games/" + url);

  return data as T;
};

// generic template for get detail data in client
const queryDetail = async <T>(url: string, id: string): Promise<T> => {
  const { data } = await axios.get("/api/games/" + url + "/" + id);

  return data as T;
};

export { queryALl, queryDetail };
