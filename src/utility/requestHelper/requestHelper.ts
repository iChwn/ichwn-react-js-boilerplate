import axios from "axios";
import _ from "lodash";
import { config } from "constant";

/**
 * Get custom error data
 * @param {Object} result response from server
 * @returns
 */
export const getErrorHandlerData = (result:any) => {
  let data = {};

  if (result.response) {
    data = {
      status: false,
      statusCode: result.response.status,
      statusText: result.response.status.statusText,
      headers: result.response.headers,
      data: result.response.data,
    };
  } else if (result.request) {
    data = {
      status: false,
      statusCode: 0,
      statusText: result.request,
      headers: result.request.headers,
      data: { message: "Koneksi bermasalah" },
    };
  } else {
    data = {
      status: false,
      statusCode: 0,
      statusText: result.message,
      headers: result.headers,
      data: { message: result.message },
    };
  }

  return data;
};

/**
 * Get custom success data
 * @param {Object} result response from server
 * @returns
 */
export const getSuccessHandlerData = (result:any) => {
  let data = {
    statusCode: result.status,
    statusText: result.statusText,
    headers: result.headers,
    data: result.data,
  }

  return data;
};

/**
 * Get header data
 * @param {boolean} withAuth if true then will add key Authorization into header with value from user.token
 * @returns
 */
export const getHeaderData = (headers:object) => {
  const header = {
    ...headers
  };

  return header;
};

/**
 * Get encrypted api data
 * @param {Object} apiData
 * @returns
 */
export const createRequestParams = (apiData:any) => {
  const { method, data = {}, params = {}, headers = {}} = apiData;
  const requestParams:any = {
    method,
    headers: getHeaderData(headers),
  };

  // assign data to request body
  // if (!_.isEmpty(data)) {
    requestParams.data = data;
  // }
  // assign params to request params
  if (!_.isEmpty(params)) {
    requestParams.params = params;
  }

  return requestParams;
};

/**
 * Get axios instance
 * @returns
 */
export const getInstance = (override_base_url: string) => {
  let app_url = config.UrlServer
  if(override_base_url !== "") {
    app_url = override_base_url
  }

  const axiosInstance = axios.create({ baseURL: app_url });
  axiosInstance.interceptors.request.use(
    (request) =>
      // console.log("request detail:", req);
      request
  );

  return axiosInstance;
};

/**
 * Start request using axios
 * @param {Object} apiData required data
 * @returns
 */
export const startRequest = async (apiData = { url: "" }, override_base_url = "") => {
  const requestParams = createRequestParams(apiData);

  return getInstance(override_base_url)
    .request({ url: apiData.url, ...requestParams })
    .then((res) => res);
};
 