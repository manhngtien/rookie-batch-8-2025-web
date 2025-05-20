import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import NashLogo from "@/assets/nash_tech_logo.png";
import { NavUser } from "@/components/nav-user";
import { useLocation } from "react-router";

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
          activePaths: ["/users", "/create-user", "/edit-user"],
        },
        {
          title: "Manage Asset",
          url: "/assets",
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
    <Sidebar className="top-[4rem] !h-[calc(100svh-var(4rem))]" {...props}>
      <SidebarHeader>
        <img src={NashLogo} className="w-32" />
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
                        <a href={item.url}>{item.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser
          user={{
            email: "test@nashtechglobals.com",
          }}
        />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
