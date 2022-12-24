import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routeUrl } from "constant";

const AuthPage = React.lazy(() => import("page/authentication"))
const HomePage = React.lazy(() => import("page/home"))
const SampleFormPage = React.lazy(() => import("page/sampleForm"))

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routeUrl.home} exact element={<HomePage/>} />
        <Route path={routeUrl.authentication} exact element={<AuthPage/>} />
        <Route path={routeUrl.sampleForm} exact element={<SampleFormPage/>} />
      </Routes>
    </BrowserRouter>
  )
}
 
export default Router