import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

import { APP_ROUTES } from "@/lib/appRoutes";
import type { AppDispatch, RootState } from "@/store";
import { checkAuth } from "@/store/thunks/authThunk";

const ProtectedRoute: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

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
    return <div>Loading huhu...</div>;
  }

  console.info("ProtectedRoute render", { isAuthenticated, isAuthChecked });

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={APP_ROUTES.auth.login} replace />
  );
};

export default ProtectedRoute;
