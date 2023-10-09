import { ignAPI, rawgApi, rawgSubAPI } from "./config";

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
    const { data } = await rawgSubAPI.get(url, {
      params: params,
    });

    return { status: 200, data: data } as T;
  } catch (error) {
    console.log(error);
    return { status: 404, data: {} } as T;
  }
};

const ignQuery = async <T>(
  operationName: string,
  variables: any,
  sha256Hash: string
): Promise<T> => {
  try {
    const extensionsQuery = {
      persistedQuery: {
        version: 1,
        sha256Hash: sha256Hash,
      },
    };

    const encodedVariables = encodeURIComponent(JSON.stringify(variables));
    const encodedExtensions = encodeURIComponent(
      JSON.stringify(extensionsQuery)
    );

    const finalURL = `/graphql?operationName=${operationName}&variables=${encodedVariables}&extensions=${encodedExtensions}`;

    const { data } = await ignAPI.get(finalURL, {
      headers: {
        "apollo-require-preflight": "true",
      },
    });
    return { status: 200, data: data.data } as T;
  } catch (error) {
    console.log(error);
    return { status: 400, data: null } as T;
  }
};

export { queryAll, queryDetail, subQueryAll, ignQuery };
