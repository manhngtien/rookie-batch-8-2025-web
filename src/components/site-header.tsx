import { NavUser } from "./nav-user";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export default function SiteHeader() {
  return (
    <header className="bg-foreground h-header-height fixed z-20 flex w-screen shrink-0 items-center gap-2 border-b px-4 text-white">
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
      <div className="flex flex-1 items-center justify-end gap-2">
        <NavUser
          user={{
            name: "John Doe",
          }}
        />
      </div>
    </header>
  );
}
