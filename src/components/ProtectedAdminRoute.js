import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/Admin" />;
}

export default ProtectedAdminRoute;
