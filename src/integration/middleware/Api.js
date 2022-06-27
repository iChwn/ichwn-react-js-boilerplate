/*eslint-disable */

import axios from "axios";
import { config } from "constant";
import { getCookies, removeCookies, setCookies } from "helper/functions";
import _ from "lodash";
import { setBannedUser } from "module/system/action";
import { CALL_API_TYPE } from "module/system/types";
import { AESDecrypt, AESEncrypt, ChecksumHash } from "utility";
import { handleLoginRedirect } from "./getUserByAuthToken";
// let lastAction;

export const customInstance = (props) => {
  const baseURI = config.UrlServer;

  const axiosInstance = axios.create({ baseURL: baseURI });
  axiosInstance.interceptors.request.use(
    (req) =>
      // console.log("request detail:", req);
      req
  );

  return axiosInstance;
};

export const handleLoading = (isLoading, dispatch) => {
  if (isLoading) {
    // dispatch(setLoading(loading));
    console.log("loading start");
  } else {
    console.log("loading end");
    // switch(apiType)
    // {
    // 	case systemActionType.API:
    // 		dispatch(setLoading(loadingMode.Modal));
    // 		break;
    // 	case systemActionType.API_PAGE:
    // 		dispatch(setLoading(loadingMode.Page));
    // 		break;
    // 	case systemActionType.API_LOGIN:
    // 		dispatch(setLoading(loadingMode.Login));
    // 		break;
    // 	case systemActionType.GET_SAMPLE_DATA:
    // 		dispatch(setLoading(loadingMode.Login));
    // 		break;
    // 	default:
    // 		break;
    // }
  }
};

export const headerData = (withAuth) => {
  const vidioCookie = JSON.parse(getCookies("vidioAuth"));
  const randomString = (Math.random() + 1).toString(36).substring(7);
  const header = {
    "request-token": randomString,
  };

  if (withAuth && vidioCookie) {
    if (vidioCookie.token) {
      header.Authorization = `Bearer ${vidioCookie.token}`;
      // token di atas harusnya ngambil dari /AccessToken/Get_Host_Token -> get api ini pake token vidioCookie.token
    }
  }

  return header;
};

export const createRequestParams = (apiData, getState) => {
  const { method, data = {}, params = {}, withAuth = true } = apiData;
  const requestParams = {
    method,
    headers: headerData(withAuth),
  };

  const checksum = ChecksumHash(JSON.stringify(data), config.saltKey);
  const encryptData = AESEncrypt(
    JSON.stringify(data),
    config.encryptKey,
    config.encryptIV
  );

  const encryptedData = {
    Checksum: checksum,
    Data: encryptData,
  };

  // assign data to request body
  if (!_.isEmpty(data)) {
    requestParams.data = encryptedData;
  }
  // assign params to request params
  if (!_.isEmpty(params)) {
    requestParams.params = params;
  }

  return requestParams;
};

export const serverRequest = ({ apiData, requestParams, dispatch, getState }) => {
	const { url, onStart, onSuccess, onError} = apiData;
	if(onStart) {
		onStart(dispatch);
	}
	// console.log(apiData)
  console.log("server request")
	return customInstance(apiData)
		.request({ url, ...requestParams })
		.then((res) => {
			const data = res.data
			const isBanned = getCookies("isBanned")
			const allowBanRequest = apiData.allowBanRequest || false
			const search = new URLSearchParams(window.location.search);
			const isLogin = search.get("login")
			let decryptedData = {}
			
			if(!allowBanRequest && (isBanned === "true" || (!_.isEmpty(data.BanData) && data.BanData.Ban_Level !== 0))) {
				if(data.BanData.Ban_Level !== 3) {
					decryptedData = JSON.parse(AESDecrypt(data.ResponseData, config.encryptKey, config.encryptIV));
				}
				decryptedData["BanData"] = data.BanData
				onSuccess({decryptedData})
				setCookies("isBanned", "true")
				setUserBan(dispatch)
			} else {
				if(isLogin) {
					removeCookies("isBanned", "/")
				}
				
				if(data.Body) {
					decryptedData = JSON.parse(AESDecrypt(data.Body.Data, config.encryptKey, config.encryptIV));
					decryptedData["token"] = data.Header.Token
				} else if(data.Error) {
					decryptedData = data
				} else {
					decryptedData = JSON.parse(AESDecrypt(data.ResponseData, config.encryptKey, config.encryptIV));
				}
				handleLoading(false)
				onSuccess({decryptedData})
			}
		})
		.catch((err) => {
			if(errorHandle(err).data.Id === "20026") {
				removeCookies("jwtToken","/")
			}
			console.log(err)
			onError(errorHandle(err))
			// dispatch(handleErrorRequest(true))
		})
};

export const errorHandle = (res) => {
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

  // console.log(res)
  return data;
};

const apiRequest = ({ dispatch, getState }) => (next) => {
	return (action) => {
    const {type, payload} = action
		const {isRequestError} = getState().systemState
		/**
		 * if you want to call api request, you need this type "CALL_API_TYPE"]
		 *
		 * @param   {[string]}  type           [Payload type from Redux]
		 * @param   {[string]}  CALL_API_TYPE  [CALL_API_TYPE is to flagging if this type for api request]
		 *
		 * @return  {[object]}                 [return api request data]
		 */
		if(type === CALL_API_TYPE) {	
			if(!isRequestError) {
				const apiData = payload;
				const allowBanRequest = payload.allowBanRequest || false
				const isBanned = getCookies("isBanned")
				handleLoading(true, dispatch);
				const requestParams = createRequestParams(apiData, getState);
				const request = () => serverRequest({ apiData, requestParams, dispatch, getState });
				// lastAction = request;

				if(!allowBanRequest && isBanned === "true") {
					setUserBan(dispatch)
				} else {
					request()
				}
			} else {
				console.log(isRequestError)
			}
    } else {
      next(action);
    }
  };
}
  

const setUserBan = (dispatch) => {
	handleLoginRedirect(dispatch)
	// dispatch(replace(routeList.bannedUser))
	dispatch(setBannedUser(true))
	handleLoading(false)
}

export default apiRequest;
