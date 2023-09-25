import axios from "axios";

// generic template for get all data in client
const getAll = async <T>(url: string): Promise<T> => {
  const { data } = await axios.get("/api/games/" + url);

  return data as T;
};

// generic template for get detail data in client
const getDetail = async <T>(url: string, id: string): Promise<T> => {
  const { data } = await axios.get("/api/games/" + url + "/" + id);

  return data as T;
};

// generic template for get detail with ID in search params
const getDetailByParams = async <T>(url: string, id: string): Promise<T> => {
  const { data } = await axios.get("/api/games/" + url, {
    params: {
      id: id,
    },
  });

  return data as T;
};

export { getAll, getDetail, getDetailByParams };
