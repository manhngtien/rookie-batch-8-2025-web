// src/components/ProtectedRoute.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

import { APP_ROUTES } from "@/lib/appRoutes";
import type { AppDispatch, RootState } from "@/store";
import { checkAuth } from "@/store/thunks/authThunk";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isCheckingAuth } = useSelector(
    (state: RootState) => state.auth,
  );
  const location = useLocation();

  useEffect(() => {
    console.info("ProtectedRoute: Dispatching checkAuth");
    if (!isAuthenticated && !isCheckingAuth) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated, isCheckingAuth]);

  console.info(
    "ProtectedRoute: isAuthenticated =",
    isAuthenticated,
    "isCheckingAuth =",
    isCheckingAuth,
  );

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.info("ProtectedRoute: Redirecting to login");
    return (
      <Navigate to={APP_ROUTES.auth.login} state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;
