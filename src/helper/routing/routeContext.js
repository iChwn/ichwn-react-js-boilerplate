import _ from "lodash";
import React from "react";
import { Api, ResponseError, ResponseSuccess } from "../";
import routesList from "../../routes";
import _navs from "../../_nav";

const filterRoutes = (list = [], data = [], result = []) => {
  const items = _.cloneDeep(list);
  if (!items.length) {
    return result;
  }
  const { routeName } = list[0];
  // console.log(items)
  let isAllowed = _.chain(data)
    .cloneDeep()
    .some((mod) => mod.route === routeName)
    .value();
  if (isAllowed || routeName === "dashboard") {
    result.push(items[0]);
  }
  list.shift();
  return filterRoutes(list, data, result);
};

const filterNavs = (list = [], data = [], title, result = []) => {
  if (!list.length) {
    return result;
  }
  const { children, url, routeName, name, ...item } = list[0];

  const searchProperty = { route: routeName };
  if (title) {
    // searchProperty.name = name -> validate route name
  }
  let isAllowed = _.chain(data).some(searchProperty).value();
  if (isAllowed || routeName === "dashboard") {
    const nav = { ...item, url, name, routeName };
    if (children) {
      const childNavs = filterNavs(children, data, routeName);
      title = null;
      nav.children = childNavs;
    }
    result.push(nav);
  }
  list.shift();
  return filterNavs(list, data, title, result);
};

const routes = [];

const RouteContext = React.createContext({
  routes: [],
  getRoute: (_callback) => {
    const filtering = {
      "page[limit]": 1,
      "page[offset]": 1,
    };
    const profile = localStorage.getItem("enterprise:auth");

    Api({ withAuth: true })
      .get("/directory/profile/me", {
        params: {
          "route-type": "directory",
        },
      })
      .then((result) => {
        const { status: xhrStatus, data } = ResponseSuccess(result);
        if (!xhrStatus) {
          return;
        }
        let header_available = [];
        let route_collective = [];
        let per_school_route = {};

        data.data.route_access.map((parentObj) => {
          parentObj.school_routes.map((childObj) => {
            header_available.push({
              country_id: parentObj.country,
              school_id: childObj.school.id,
              school_name: childObj.school.name,
              type: childObj.school.type,
            });
            Object.assign(per_school_route, {
              [childObj.school.id]: childObj.routes,
            });
            route_collective.push(...childObj.routes);
          });
        });

        route_collective = _.uniqBy(route_collective, "id");
        const grantNavs = filterNavs(
          _.cloneDeep(_navs.items),
          per_school_route[header_available[0].school_id]
        );
        const grantRoutes = filterRoutes(
          _.cloneDeep(routesList),
          per_school_route[header_available[0].school_id]
        );
        const userData = data.data
        console.log(data.data);
        routes.push(...header_available);
        // console.log(routes);
        localStorage.setItem("user-data", JSON.stringify(data.data));
        localStorage.setItem("user-policy", JSON.stringify(data.data.policies));
        localStorage.setItem(
          "user-header-available",
          JSON.stringify(header_available)
        );
        _callback({ grantRoutes, grantNavs, userData });
        // console.log(header_available);
        // _callback({ header_available, per_school_route, route_collective });
      })
      .catch((result) => {
        const errors = ResponseError(result);
      });
  },
});

export { routes, RouteContext };

