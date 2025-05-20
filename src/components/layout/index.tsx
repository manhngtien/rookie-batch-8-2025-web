import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import UserLogout from "@/features/logout/components/user-logout";

import { Outlet } from "react-router";

import { useSelector } from "react-redux";
import { type RootState } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "@/lib/appRoutes";

export default function Layout() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const navigate = useNavigate();

  // COMMENTED TEMPORARILY FOR DEV. PLEASE DON'T REMOVE

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate(APP_ROUTES.auth.login);
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <header className="bg-foreground flex h-16 shrink-0 items-center gap-2 border-b px-4 text-white">
          <SidebarTrigger className="-ml-1 md:hidden" />
          <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
          <Breadcrumb>
            <BreadcrumbList className="text-white">
              <BreadcrumbItem className="">
                <BreadcrumbLink href="#" className="hover:text-white">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              {/* <BreadcrumbSeparator className="" /> */}
            </BreadcrumbList>
          </Breadcrumb>
          <UserLogout userName="joe" />
        </header>
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
