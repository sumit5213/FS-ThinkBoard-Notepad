import React from "react";
import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // If no token, redirect to signin
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // Otherwise show the protected page
  return children;
}

export default ProtectedRoute;
