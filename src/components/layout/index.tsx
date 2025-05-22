// src/index.tsx (or src/layouts/index.tsx, depending on location)
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import apiClient from "@/services/apiClient";
import { setupAuthInterceptor } from "@/services/apiInterceptors";
import type { AppDispatch } from "@/store";

import SiteHeader from "../site-header";

export default function Layout() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setupAuthInterceptor(apiClient, dispatch);
  }, [dispatch]);

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
