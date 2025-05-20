import * as React from "react";
import { useLocation } from "react-router";

import NashLogo from "@/assets/nash_tech_logo.png";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
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
    <Sidebar {...props}>
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
            {/* <SidebarGroupLabel>{item.title}</SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={currentPath === item.url}
                      className="data-[active=true]:bg-foreground h-16 max-h-16 text-lg data-[active=true]:text-white"
                    >
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            email: "test@nashtechglobals.com",
          }}
          // logout={logout}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
