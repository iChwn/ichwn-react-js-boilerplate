/**
 * [Cookies function] [Set, Get and get total days by range date]
 */

const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const getCookie = (name) => {
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

const removeCookie = (name, path?, domain?) => {   
  if( getCookie( name ) ) {
    document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
      ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

export {
  getCookie, setCookie, removeCookie
}