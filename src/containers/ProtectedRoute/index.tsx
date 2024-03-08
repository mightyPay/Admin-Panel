import React from "react";
import { LineWave } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import { LineWaveFullScreen } from "../../components";
import { useAuth } from "../../hooks";
import { IContainer } from "../types";

const ProtectedRoute = ({ children }: IContainer) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LineWaveFullScreen />;
  }

  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
