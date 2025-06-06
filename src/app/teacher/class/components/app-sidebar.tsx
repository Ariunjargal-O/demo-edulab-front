import { PanelLeftOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Icon, icons, List, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Layout from "../layout";
import Image from "next/image";
import Link from "next/link";

interface MenuItem {
  group: string;
  links: MenuItemLink[];
}

interface MenuItemLink {
  title: string;
  url: string;
  icon: React.ComponentType;
}

const items = [
  {
    group: "Ангиуд",
    links: [
      { title: "11a", url: "/", icon: PanelLeftOpen },
      { title: "11b", url: "/", icon: PanelLeftOpen },
      { title: "12a", url: "/", icon: PanelLeftOpen },
      { title: "10a", url: "/", icon: PanelLeftOpen },
      { title: "10b", url: "/", icon: PanelLeftOpen },
      { title: "10g", url: "/", icon: PanelLeftOpen },
      { title: "10e", url: "/", icon: PanelLeftOpen },
      { title: "10d", url: "/", icon: PanelLeftOpen },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-30">
      <SidebarContent>
        <SidebarGroup className="px-2 py-9 flex flex-col gap-4">
          <SidebarGroupLabel>
            {/* <Image src={"/logo-back.svg"} alt="logo" width={150} height={50}/> */}
          </SidebarGroupLabel>
          <SidebarGroupContent className="">
            <SidebarMenu>
              {items.map((item: MenuItem) => (
                <div key={item.group}>
                  <div className="font-semibold text-2xl mb-5 ">
                    {item.group}
                  </div>
                  {item.links.map((link: MenuItemLink) => (
                    <SidebarMenuItem
                      key={link.title}
                      className="flex items-center gap-15 pl-3"
                    >
                      <SidebarMenuButton>
                        <div>
                          <a
                            href={link.url}
                            className="flex items-center justify-center gap-5"
                          >
                            <span>{link.title}</span> <link.icon />
                          </a>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
