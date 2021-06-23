import React from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthConsumer } from "./Auth";
import withContext from "./withContext";

const RouteAuthenticated = ({component: Component, render, auth, ...res}) => {
  console.log("Rout Auth")
  const isLoggedIn = false
  const authData = localStorage.getItem('apps:auth')
  if (!authData) {
    return <Redirect from="/:any" to="/login"/>
  }
  return <Route {...res} render={render ? render : props => <Component {...props}/>}/>
}

const RouteHome = ({component: Component, render, auth, ...res}) => {
  console.log("Rout Home")
  // const isLoggedIn = false
  const authData = localStorage.getItem('apps:auth')
  if (authData) {
    return <Redirect from="/:any" to="/"/>
  }
  return <Route {...res} render={render ? render : props => <Component {...props}/>}/>
}

export default withContext(RouteAuthenticated, AuthConsumer)
export { RouteHome };

