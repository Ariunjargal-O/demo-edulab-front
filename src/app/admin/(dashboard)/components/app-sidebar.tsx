import {
  BookCheck,
  Calendar,
  CalendarRange,
  Dock,
  GalleryHorizontal,
  GalleryHorizontalEnd,
  Home,
  Inbox,
  LayoutDashboard,
  LayoutGrid,
  LayoutList,
  NotebookTabs,
  PanelTop,
  ScanEye,
  Search,
  Settings,
  TrendingUp,
  User,
} from "lucide-react";

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
    group: "Профайл",
    links: [
      { title: "Home", url: "/admin", icon: Home },
      {
        title: "Профайл тохиргоо",
        url: "/admin/accountsettings",
        icon: User,
      },
     
    ],
  },
 
  {
    group: "Сургуулиуд",
    links: [
      { title: "Home", url: "/admin/school", icon: Home },
      {
        title: "Бүртгэлтэй сургуулиуд",
        url: "/admin/schoollist",
        icon: LayoutList,
      },
     
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="z-30">
      <SidebarContent>
        <SidebarGroup className="px-6 py-9 flex flex-col gap-4">
          <SidebarGroupLabel className="mt-5 flex justify-center flex-col gap-1">
            <div className="w-fit h-fit ">
              <Image src="/logo-back.svg" alt="logo" width={250} height={250} />
            </div>
            <h1 className="text-2xl font-bold leading-8 text-black ">Админ</h1>
          </SidebarGroupLabel>
          <SidebarGroupContent >
            <SidebarMenu className="pt-10">
              {items.map((item: MenuItem) => (
                <div key={item.group}>
                  <div className="text-gray-400 ">{item.group}</div>
                  {item.links.map((link: MenuItemLink) => (
                    <SidebarMenuItem key={link.title}>
                      <SidebarMenuButton className="h-15">
                        <div className="flex items-center gap-4 pt-4 pb-3 pl-3">
                          <a
                            href={link.url}
                            className="flex items-center gap-3"
                          >
                            <link.icon />
                            <span className="leading-4">{link.title}</span>
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
