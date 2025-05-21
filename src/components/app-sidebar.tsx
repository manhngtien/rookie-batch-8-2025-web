import * as React from "react";
import { Link, useLocation } from "react-router";

import NashLogo from "@/assets/nash_tech_logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { APP_ROUTES } from "@/lib/appRoutes";

const data = {
  navMain: [
    {
      title: null,
      url: "#",
      items: [
        {
          title: "Home",
          url: "/",
          isActive: true,
        },
        {
          title: "Manage User",
          url: APP_ROUTES.users.path,
          activePaths: [
            APP_ROUTES.users.path,
            `${APP_ROUTES.users.path}/${APP_ROUTES.users.create}`,
            `${APP_ROUTES.users.path}/${APP_ROUTES.users.edit}`,
          ],
        },
        {
          title: "Manage Asset",
          url: APP_ROUTES.assets.path,
          activePaths: [
            APP_ROUTES.assets.path,
            `${APP_ROUTES.assets.path}/${APP_ROUTES.assets.create}`,
          ],
        },
        {
          title: "Manage Assignment",
          url: APP_ROUTES.assignment.path,
        },
        {
          title: "Request for Returning",
          url: APP_ROUTES.returns.path,
        },
        {
          title: "Report",
          url: APP_ROUTES.reports.path,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar
      className="top-header-height !h-[calc(100svh-var(--spacing-header-height))] py-10"
      {...props}
    >
      <SidebarHeader>
        <img alt="Nashtech Logo" src={NashLogo} className="w-32" />
        <span className="text-foreground font-bold">
          Online Asset Management
        </span>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {item.items.map((item) => {
                  const isActive = item.activePaths
                    ? item.activePaths.includes(currentPath)
                    : currentPath === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="data-[active=true]:bg-foreground h-16 max-h-16 text-lg data-[active=true]:text-white"
                      >
                        <Link to={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
