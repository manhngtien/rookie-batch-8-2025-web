import * as React from "react";
import { useSelector } from "react-redux";
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
} from "@/components/ui/sidebar";
import { APP_ROUTES } from "@/lib/appRoutes";
import type { RootState } from "@/store";

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
            `${APP_ROUTES.users.path}/${APP_ROUTES.users.edit}/:staffCode`,
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
          activePaths: [
            APP_ROUTES.assignment.path,
            `${APP_ROUTES.assignment.path}/${APP_ROUTES.assignment.create}`,
          ],
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
  const { user } = useSelector((state: RootState) => state.auth);

  const filteredNavMain = data.navMain.map((group) => ({
    ...group,
    items:
      user?.type === "Staff"
        ? group.items.filter((item) => item.title === "Home")
        : group.items,
  }));

  return (
    <Sidebar className="top-header-height px-2 pt-4" {...props}>
      <SidebarHeader>
        <img alt="Nashtech Logo" src={NashLogo} className="w-32" />
        <span className="text-foreground font-bold">
          Online Asset Management
        </span>
      </SidebarHeader>
      <SidebarContent>
        {filteredNavMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {group.items.map((item) => {
                  const isActive = item.activePaths
                    ? item.activePaths.some((path) => {
                        const regexPath = path.replace(/:staffCode/, "[^/]+");
                        const regex = new RegExp(`^${regexPath}$`);
                        return regex.test(currentPath);
                      })
                    : currentPath === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="data-[active=true]:bg-foreground h-16 max-h-16 bg-[#F3F4F6] text-lg data-[active=true]:text-white"
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
    </Sidebar>
  );
}
