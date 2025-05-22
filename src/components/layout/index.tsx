import { Outlet } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

// import { useSelector } from "react-redux";
// import { type RootState } from "@/store";
// import { useEffect } from "react";
// import { useNavigate } from "react-router";
// import { APP_ROUTES } from "@/lib/appRoutes";
import SiteHeader from "../site-header";

export default function Layout() {
  // COMMENTED TEMPORARILY FOR DEV. PLEASE DON'T REMOVE

  // const isAuthenticated = useSelector(
  //   (state: RootState) => state.auth.isAuthenticated,
  // );
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate(APP_ROUTES.auth.login);
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <SidebarProvider className="flex flex-col">
      <SiteHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="mt-header-height w-full p-6 md:w-[calc(100vw-var(--sidebar-width))]">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
