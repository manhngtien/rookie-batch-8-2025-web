// src/index.tsx (or src/layouts/index.tsx, depending on location)
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ChangePasswordFirstDialog from "@/features/change-password/components/change-password-first-dialog";
import apiClient from "@/services/apiClient";
import { setupAuthInterceptor } from "@/services/apiInterceptors";
import type { AppDispatch, RootState } from "@/store";

import SiteHeader from "../site-header";

export default function Layout() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    setupAuthInterceptor(apiClient, dispatch);
  }, [dispatch]);

  return (
    <SidebarProvider className="flex flex-col">
      <SiteHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="mt-header-height w-full p-6 md:w-[calc(100vw-var(--sidebar-width))]">
          <Outlet />
        </main>
      </div>
      {isAuthenticated && user?.isFirstLogin && (
        <ChangePasswordFirstDialog user={user} />
      )}
    </SidebarProvider>
  );
}
