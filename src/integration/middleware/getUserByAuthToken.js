/*eslint-disable */

import { replace } from "connected-react-router";
import { confirmPageData, routeList } from "constant";
import apiList from "constant/apiUrl";
import { getCookies, getUserAgent, removeCookies, setCookies } from "helper/functions";
import _ from "lodash";
import { setBannedUser, setCheckAuthUrl, setConfirmPage } from "module/system/action";
import { CHECK_AUTH_URL } from "module/system/types";
import dayjs from "dayjs";
import { createRequestParams, handleLoading, serverRequest } from "./Api";


let baseStyles = [
  "color: #000",
  "background-color: #ffff00",
  "padding: 2px 4px",
  "border-radius: 2px"
].join(";");

const getUserByAuthToken = ({dispatch, getState}) => (next) => {
  const search = new URLSearchParams(window.location.search)
  const userJWT = search.get("user") // -> "get user queery param"
  const tokenJWT = search.get("token") // -> "get token queery param"
  const cookiesJWT = getCookies("jwtToken") // -> "saved jwt token in cookie for 999 days"
  const isLogin = search.get("login") //"get login queery param"
  const vidioCookie = getCookies("vidioAuth") // -> "saved vidio auth response data in cookie for 3 days"
  const pathUrl = window.location.pathname // -> "get current path url"
  const jwtToken = userJWT ? userJWT : tokenJWT

  return (action) => {
    // const isJwtCheck = getState().systemState.isJwtAvailable
    const isActionType = action.type === CHECK_AUTH_URL
    if(isActionType) {
      if(action.isRefresh) {
        // const assignToken = _.isNull(cookiesJWT) ? userJWT : cookiesJWT
        console.log("%cVIDIO_SCENARIO-1", baseStyles)
        handleGetUserDetail()
      } else if(jwtToken && isLogin) {
        console.log("%cVIDIO_SCENARIO-2", baseStyles)
        removeCookies("isBanned", "/")
        handleLoginVidio({jwtToken, next, action, dispatch})
      } else if(!_.isNull(jwtToken) && !_.isNull(cookiesJWT)) {
        console.log("%cVIDIO_SCENARIO-3", baseStyles)
        dispatch(replace(routeList.redeem))
        dispatch(setCheckAuthUrl(true))
        next(action)
      } else if(cookiesJWT && _.isNull(vidioCookie)) {
        console.log("%cVIDIO_SCENARIO-4", baseStyles)
        dispatch(setConfirmPage(confirmPageData.sessionExpired))
        dispatch(setCheckAuthUrl(true))
      } else if(_.isNull(cookiesJWT) && _.isNull(vidioCookie)) {
        console.log("%cVIDIO_SCENARIO-5", baseStyles)
        dispatch(setConfirmPage(confirmPageData.errorLogin))
        dispatch(setCheckAuthUrl(true))
      } else if(pathUrl === "/redeem") {
        console.log("%cVIDIO_SCENARIO-6", baseStyles)
        handleGetUserDetail()
        dispatch(replace(routeList.redeem))
        dispatch(setCheckAuthUrl(true))
        next(action)
      } else {
        console.log("%cVIDIO_SCENARIO-7", baseStyles)
        // handleGetUserDetail()\
        if(JSON.parse(vidioCookie).BanData && !_.isNull(JSON.parse(vidioCookie).BanData.Ban_Level !== 0)) {
          dispatch(setBannedUser(true))
        }
        
        handleLoginRedirect(dispatch, false)
        dispatch(setCheckAuthUrl(true))
        next(action)
      }
    } else {        
      next(action)
    }
  }
}

const handleGetUserDetail = () => {
  const vidioCookie = getCookies("vidioAuth") // -> "saved vidio auth response data in cookie for 3 days"
  let data = _.cloneDeep(JSON.parse(vidioCookie))
  const apiData = {
    url: apiList.getUserDetail,
    method: "POST",
    data: {
      TimeStamp: dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    },
    onSuccess: callback =>  {
      // console.log("THIS IS DATA", callback.decryptedData.User_Wallets)
      let walletLength = callback.decryptedData.User_Wallets.length
      data.User_Wallets = [callback.decryptedData.User_Wallets[walletLength-1]]

      setCookies("vidioAuth", JSON.stringify(data), 3)
    },
    onError: callback => console.log(callback),
  }

  handleLoading(true);
  const requestParams = createRequestParams(apiData);
  const request = () => serverRequest({ apiData, requestParams });
  request()
}

const handleLoginVidio = (params, isRefresh = false) => {
  const {jwtToken, next, action, dispatch} = params
  const apiData = {
    url: apiList.loginWithVidio,
    method: "POST",
    data: {
      User_Host_Token: jwtToken,
      TimeStamp: dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      User_Agent: getUserAgent()
    },
    withAuth: false,
    onSuccess: callback => setUserData(callback, next, action, dispatch, isRefresh),
    onError: callback => setErrorHandler(callback, next, action, dispatch)
  }

  handleLoading(true);
  const requestParams = createRequestParams(apiData);
  const request = () => serverRequest({ apiData, requestParams, dispatch });
  request()
}

const setUserData = (params, next, action, dispatch, isRefresh) => {
  const search = new URLSearchParams(window.location.search)
  const userJWT = search.get("user") // -> "get user queery param"
  const tokenJWT = search.get("token") // -> "get token queery param"
  const cookiesJWT = getCookies("jwtToken") // -> "saved jwt token in cookie for 999 days"
  let assignJWT = ""
  if(!_.isNull(userJWT)) {
    assignJWT = userJWT
  } else if(!_.isNull(tokenJWT)) {
    assignJWT = tokenJWT
  } else {
    assignJWT = cookiesJWT
  }
  
  let authCloneData = _.cloneDeep(params.decryptedData)
  let walletLength = authCloneData.User_Wallets.length
  authCloneData.User_Wallets = [authCloneData.User_Wallets[walletLength-1]]
  /**
   * [if the params.decryptedData.BanData is null -> user will be banned]
   */
  setCookies("jwtToken", assignJWT, 3)
  setCookies("vidioAuth", JSON.stringify(authCloneData), 3)
  if(params.decryptedData.BanData) {
    handleLoginRedirect(dispatch)
    dispatch(setBannedUser(true))
    // dispatch(replace(routeList.bannedUser))
    dispatch(setCheckAuthUrl(true))
  } else {
    if(!isRefresh) {
      handleLoginRedirect(dispatch)
    }
  } 
}

const setErrorHandler = (params, next, action, dispatch) => {
  console.log("REMOVE COOKIE", params)
  removeCookies("vidioAuth","/")
  removeCookies("jwtToken","/")
  dispatch(setConfirmPage(confirmPageData.errorLogin))
  dispatch(setCheckAuthUrl(true))
}

export const handleLoginRedirect = (dispatch, isAuth = true) => {
  const stringLocation = decodeURIComponent(window.location.href)
  const keys = Object.keys(routeList)
  const search = new URLSearchParams(window.location.search);
  const direct = search.get("direct")
  const urlData = search.get("urlData")
  const isLogin = search.get("login")

  // flagging untuk direct route
  if(direct === "true") {
    setCookies("isDirect", "true", 3)
  } else {
    if(isLogin) {
      removeCookies("isDirect", "/")
    }
  }

  // lookup url pada routeList, ketika ada yang sama, maka akan dilanjutnak kepada next route
  let hasUrl = routeList.redeem
  keys.forEach((key) => {
    if(stringLocation.indexOf(`${routeList[key]}`) > 5) {
      hasUrl = routeList[key]
    }
  })

  // console.log(urlData)
  // console.log(hasUrl)
  if(hasUrl === "/redeem/detail" || hasUrl === "/user-redeem-history") {
    dispatch(replace(urlData))
  } else {
    dispatch(replace(hasUrl))
  }
  dispatch(setCheckAuthUrl(true))
}
 
export default getUserByAuthToken