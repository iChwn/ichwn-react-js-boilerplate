import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routeUrl } from "constant";

const AuthPage = React.lazy(() => import("page/authentication"))
const HomePage = React.lazy(() => import("page/home"))
const SampleFormPage = React.lazy(() => import("page/sampleForm"))

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading... </div>}>
        <Routes>
          <Route path={routeUrl.home} element={<HomePage/>} />
          <Route path={routeUrl.authentication} element={<AuthPage/>} />
          <Route path={routeUrl.sampleForm} element={<SampleFormPage/>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
 
export default Router