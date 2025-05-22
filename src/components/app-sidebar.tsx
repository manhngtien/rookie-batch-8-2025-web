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
} from "@/components/ui/sidebar";

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
          url: "/users",
          activePaths: ["/users", "/users/create-user", "/users/edit-user"],
        },
        {
          title: "Manage Asset",
          url: "/assets",
          activePaths: ["/assets", "/assets/create-asset"],
        },
        {
          title: "Manage Assignment",
          url: "/assignments",
        },
        {
          title: "Request for Returning",
          url: "/returns",
        },
        {
          title: "Report",
          url: "/reports",
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
      className="top-[4rem] !h-[calc(100svh-var(4rem))] w-xs px-2 py-4"
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

      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
