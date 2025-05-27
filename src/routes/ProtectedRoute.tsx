import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

import { Spinner } from "@/components/ui/spinner";
import { APP_ROUTES } from "@/lib/appRoutes";
import type { AppDispatch, RootState } from "@/store";
import { checkAuth } from "@/store/thunks/authThunk";

const ProtectedRoute: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const verifyAuth = async () => {
      if (!isAuthenticated) {
        try {
          await dispatch(checkAuth()).unwrap();
          console.info("checkAuth completed successfully");
        } catch (error) {
          console.error("checkAuth failed:", error);
        }
      }
      setIsAuthChecked(true);
    };

    verifyAuth();
  }, [dispatch, isAuthenticated]);

  if (!isAuthChecked) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <Spinner className="text-foreground" size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    console.warn("User not authenticated, redirecting to login");
    return <Navigate to={APP_ROUTES.auth.login} replace />;
  }

  if (user?.type === "Staff" && currentPath !== "/") {
    console.info(
      `Staff user attempted to access ${currentPath}, redirecting to /`,
    );
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
