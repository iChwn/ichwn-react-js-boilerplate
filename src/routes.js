import React from "react";
import Loadable from "react-loadable";
import Loading from "./components/LazyLoad";

const Login = Loadable({
  loader: () => import("./views/authentication/login"),
  loading: Loading,
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
});

const Dashboard = Loadable({
  loader: () => import("./views/dashboard"),
  loading: Loading,
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
});


const routes = [
  {
    path: "/home",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
    routeName: "dashboard",
  },
  {
    path: "/login",
    exact: true,
    name: "Login",
    component: Login,
    routeName: "login",
  },
]

export default routes;