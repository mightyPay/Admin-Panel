import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LineWaveFullScreen } from "../../components";
import { useAuth } from "../../hooks";

const BaseLayout = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <LineWaveFullScreen />;
  }

  if (user) {
    // user is authenticated
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="h-screen w-full bg-[#f2f3f8]">
      <Outlet />
    </div>
  );
};

export default BaseLayout;
