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

const data = {
  navMain: [
    {
      title: null,
      url: "#",
      items: [
        {
          title: "Home",
          url: "#",
          isActive: true,
        },
        {
          title: "Manage User",
          url: "#",
        },
        {
          title: "Manage Asset",
          url: "#",
        },
        {
          title: "Manage Assignment",
          url: "#",
        },
        {
          title: "Request for Returning",
          url: "#",
        },
        {
          title: "Report",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <img src={NashLogo} className="w-32" />
        <span className="font-bold text-foreground">
          Online Asset Management
        </span>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            {/* <SidebarGroupLabel>{item.title}</SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      className="data-[active=true]:bg-foreground data-[active=true]:text-white"
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
