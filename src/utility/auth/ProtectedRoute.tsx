import { routeUrl } from "constant";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "utility/helper/cookie";

const ProtectedRoute = () => {
  const isUserLogin = getCookie("auth"); // Cek apakah token ada

  return isUserLogin ? <Outlet /> : <Navigate to={routeUrl.authentication} replace />;
};

export default ProtectedRoute;
