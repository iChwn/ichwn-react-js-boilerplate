import React, { Component } from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider, RouteAuthenticated, RouteHome } from "./helper";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const DefaultLayout = React.lazy(() => import("./containers/layouts/defaultLayout"));
const Login = React.lazy(() => import("./views/authentication/login"));
const NotFoundPage = React.lazy(() => import('./views/404'))

class App extends Component {
  render() {
    const auth = localStorage.getItem('apps:auth');

    return (
      <HashRouter>
        <AuthProvider value={auth ? { auth: JSON.parse(auth) } : {}}>
          <ToastContainer containerId="mainToast" />
          <React.Suspense fallback={loading()}>
            <Switch>
              <RouteHome
                path="/login"
                exact
                name="root"
                component={(props) => (
                  <Login cookies={this.props.cookies} />
                )}
              />
              <RouteAuthenticated
                path="/"
                name="Dashboard"
                render={(props) => (
                  <DefaultLayout
                    // getRoute={getRoute}
                    {...props}
                    cookies={this.props.cookies}
                  />
                )}
              />
              <Route exact name="404" render={(props) => <NotFoundPage/>} />
            </Switch>
          </React.Suspense>
        </AuthProvider>
      </HashRouter>
    );
  }
}


export default App;
