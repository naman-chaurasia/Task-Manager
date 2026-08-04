import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#2D3B36] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-[#6B6560]">Loading your workspace...</span>
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#2D3B36] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-[#6B6560]">Loading...</span>
        </div>
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PrivateRoute;
