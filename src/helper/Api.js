import axios from "axios";
import Swal from "sweetalert2";
import { getCookies } from "./functions";

const success = (res) => {
  return {
    status: true,
    statusCode: res.status,
    statusText: res.statusText,
    headers: res.headers,
    data: res.data,
  };
};

const error = (res) => {
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

const headerData = ({ token, ...data } = {}) => {
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...data,
  };
  if (token) {
    header["Authorization"] = `Bearer ${token}`;
  }

  return header;
};

let cancelRequest;

const Api = ({ headers, withAuth = false, ...axiosConfig } = {}) => {
  const CancelToken = axios.CancelToken;

  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: headerData(headers),
    cancelToken: new CancelToken(function executor(c) {
      // An executor function receives a cancel function as a parameter
      cancelRequest = c;
    }),
    ...axiosConfig,
  });

  instance.interceptors.request.use(
    async (request) => {
      if (withAuth) {
        if (getCookies("auth_token") === null) {
          localStorage.removeItem("enterprise:auth");
          Swal.fire({
            title: "The session is expired!",
            text: "Please relogin and try again",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Relogin",
          }).then((result) => {
            window.location.href = "/";
          });
          return false;
        } else {
          const auth = JSON.parse(
            localStorage.getItem("enterprise:auth") || "{}"
          );
          if (!Object.keys(auth).length) {
            return request;
          }
          request.headers = headerData({ token: auth.access_token });
        }
      }

      return request;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default Api;
export { cancelRequest as CancelRequest };
export { success as ResponseSuccess };
export { error as ResponseError };

