// import {
//   AppBreadcrumb,
//   AppHeader,
//   AppSidebar,
//   AppSidebarFooter,
//   AppSidebarForm,
//   AppSidebarHeader,
//   AppSidebarMinimizer,
//   AppSidebarNav
// } from "@coreui/react";
import { Container } from '@material-ui/core';
import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// routes config
import routes from "../../routes";

// const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grantNavs: [],
      grantRoutes: [],
      userData: {}
    };
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );

  // async componentDidMount() {
  //   this.props.getRoute((result) => {
  //     const { grantNavs, grantRoutes, userData } = result;
  //     this.setState({ grantNavs, grantRoutes, userData });
  //   });
  // }

  render() {
    // const { grantNavs, grantRoutes } = this.state;

    return (
      <div className="app">
        {/* <AppHeader fixed className="header-bg-dark-green border-bottom-0">
          <Suspense fallback={this.loading()}>
            <DefaultHeader userData={this.state.userData}/>
          </Suspense>
        </AppHeader> */}
        <div className="app-body">
          {/* <AppSidebar fixed display="lg" className="navbar-bg-dark-green">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={{ items: grantNavs }}
                {...this.props}
                isOpen={true}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar> */}
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes} /> */}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                {routes.length !== 0 && (
                  <Switch>
                    {routes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={(props) => <route.component {...props} />}
                        />
                      ) : null;
                    })}
                    <Redirect from="/:any" to="/" />
                  </Switch>
                )}
              </Suspense>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
