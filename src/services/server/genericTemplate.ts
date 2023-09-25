import { rawgApi } from "./config";

// generic template for get all data
const getAll = async <T>(url: string, limit?: number): Promise<T> => {
  try {
    const {
      data: { results },
    } = await rawgApi.get(url, limit ? { params: { limit } } : {});

    return { status: 200, data: results } as T;
  } catch (error) {
    return { status: 404, data: {} } as T;
  }
};

// generic template for get detail data
const getDetail = async <T>(url: string, id: string): Promise<T> => {
  try {
    const { data } = await rawgApi.get(url + "/" + id);

    return { status: 200, data: data } as T;
  } catch (error) {
    return { status: 404, data: {} } as T;
  }
};

export { getAll, getDetail };
