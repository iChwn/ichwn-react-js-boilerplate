import moment from "moment";
import { Api, ResponseError, ResponseSuccess } from "./";

/**
 * [Cookies function] [Set, Get and get total days by range date]
 */

const setCookies = (name, value, days) => {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const getCookies = (name) => {
  let cookiesName = name + "=";
  let splitCookies = document.cookie.split(";");
  for (let i = 0; i < splitCookies.length; i++) {
    let cookiesLoop = splitCookies[i];
    while (cookiesLoop.charAt(0) === " ") {
      cookiesLoop = cookiesLoop.substring(1, cookiesLoop.length);
    }
    if (cookiesLoop.indexOf(cookiesName) === 0) {
      return cookiesLoop.substring(cookiesName.length, cookiesLoop.length);
    }
  }
  return null;
};

const getDaysRange = (date1, date2) => {
  if (date1 && date2) {
    return Math.abs(moment(date2).diff(moment(date1), "days")) + 1;
  }
  return undefined;
};
/**
 * End of Cookies function
 */

/**
 * [Get country and school list]
 */

const getCountryList = (response) => {
  Api({ withAuth: true })
    .get("/directory/countries", {
      // params: {
      //   'filter[type]': 'content-admin,directory-admin,superadmin',
      // }
    })
    .then((result) => {
      const { status: xhrStatus, data } = ResponseSuccess(result);
      if (!xhrStatus) {
        return;
      }
      response({ status: xhrStatus, data: data.data });
    })
    .catch((result) => {
      const errors = ResponseError(result);
      response(errors);
    });
};

const getSchoolList = (response, filter) => {
  Api({ withAuth: true })
    .get("/directory/schools", { params: filter })
    .then((result) => {
      const { status: xhrStatus, data } = ResponseSuccess(result);
      if (!xhrStatus) {
        return;
      }
      response({ status: xhrStatus, data: data.data });
    })
    .catch((result) => {
      const errors = ResponseError(result);
      response(errors);
    });
};

export { setCookies, getCookies, getDaysRange, getCountryList, getSchoolList };

