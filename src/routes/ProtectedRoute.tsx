// src/components/ProtectedRoute.tsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

import { APP_ROUTES } from "@/lib/appRoutes";
import type { RootState } from "@/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={APP_ROUTES.auth.login} state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;
