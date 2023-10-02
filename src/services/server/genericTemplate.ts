import { rawgApi, rawgSubAPI } from "./config";

// generic template for get all data
const queryAll = async <T>(url: string, limit?: number): Promise<T> => {
  try {
    const {
      data: { results },
    } = await rawgApi.get(url, limit ? { params: { page_size: limit } } : {});

    return { status: 200, data: results } as T;
  } catch (error) {
    return { status: 404, data: {} } as T;
  }
};

// generic template for get detail data
const queryDetail = async <T>(
  url: string,
  id: string,
  limit?: number
): Promise<T> => {
  try {
    const { data } = await rawgApi.get(
      url + "/" + id,
      limit ? { params: { page_size: limit } } : {}
    );

    return { status: 200, data: data } as T;
  } catch (error) {
    console.log(error);

    return { status: 404, data: {} } as T;
  }
};

const subQueryAll = async <T>(
  url: string,
  params?: {
    [key: string]: any;
  }
): Promise<T> => {
  try {
    const { data } = await rawgSubAPI.get(url, params);
    return { status: 200, data: data } as T;
  } catch (error) {
    console.log(error);
    return { status: 404, data: {} } as T;
  }
};
export { queryAll, queryDetail, subQueryAll };
