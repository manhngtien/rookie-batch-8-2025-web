// src/index.tsx (or src/layouts/index.tsx, depending on location)
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import apiClient from "@/services/apiClient";
import { setupAuthInterceptor } from "@/services/apiInterceptors";

import SiteHeader from "../site-header";

export default function Layout() {
  const dispatch = useDispatch();

  // Set up auth interceptor after store is initialized
  useEffect(() => {
    setupAuthInterceptor(apiClient, dispatch);
  }, [dispatch]);

  // COMMENTED TEMPORARILY FOR DEV. PLEASE DON'T REMOVE
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate(APP_ROUTES.auth.login);
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="p-6">
              <Outlet />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
