/* eslint-disable import/no-cycle */
import axios from "axios";
import { config } from "constant";
import _ from "lodash";

/**
 * Get custom error data
 * @param {Object} res response from server
 * @returns
 */
export const getErrorHandlerData = (res) => {
  let data = {};

  if (res.response) {
    data = {
      status: false,
      statusCode: res.response.status,
      statusText: res.response.status.statusText,
      headers: res.response.headers,
      data: res.response.data,
    };
  } else if (res.request) {
    data = {
      status: false,
      statusCode: 0,
      statusText: res.request,
      headers: res.request.headers,
      data: { message: "Koneksi bermasalah" },
    };
  } else {
    data = {
      status: false,
      statusCode: 0,
      statusText: res.message,
      headers: res.headers,
      data: { message: res.message },
    };
  }

  return data;
};

/**
 * Get header data
 * @param {boolean} withAuth if true then will add key Authorization into header with value from user.token
 * @returns
 */
export const getHeaderData = (withAuth) => {
  const randomString = (Math.random() + 1).toString(36).substring(7);
  const header = {
    "request-token": randomString,
  };

  return header;
};

/**
 * Get encrypted api data
 * @param {Object} apiData
 * @returns
 */
export const createRequestParams = (apiData) => {
  const { method, data = {}, params = {}, withAuth = true } = apiData;
  const requestParams = {
    method,
    headers: getHeaderData(withAuth),
  };

  // assign data to request body
  if (!_.isEmpty(data)) {
    requestParams.data = "encryptedData";
  }
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
export const getInstance = () => {
  const baseURI = config.UrlServer;

  const axiosInstance = axios.create({ baseURL: baseURI });
  axiosInstance.interceptors.request.use(
    (req) =>
      // console.log("request detail:", req);
      req
  );

  return axiosInstance;
};

/**
 * Start request using axios
 * @param {Object} apiData required data
 * @returns
 */
export const startRequest = async (apiData = { url: "" }) => {
  const requestParams = createRequestParams(apiData);

  return getInstance()
    .request({ url: apiData.url, ...requestParams })
    .then((res) => res);
};
 