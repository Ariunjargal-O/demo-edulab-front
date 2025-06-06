"use client";
import {
  Home,
  LayoutList,
  MessageCircleWarning,
  NotebookTabs,
  Settings,
  SquareChartGantt,
  TrendingUp,
  UserCheck,
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth-store";

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
      { title: "Home", url: "/student", icon: Home },
      { title: "Профайл тохиргоо", url: "/student/accountsettings", icon: Settings },
      { title: "Ирц бүртгэл", url: "/student/attendance", icon: UserCheck },
      { title: "Багшийн мэдэгдэл", url: "/student/teachercomment", icon: MessageCircleWarning },
      { title: "Дүнгийн мэдээлэл", url: "/student/assessment", icon: TrendingUp },
    ],
  },
  {
    group: "Анги",
    links: [
      { title: "Сурагчийн жагсаалт", url: "/student/studentlist", icon: LayoutList },
      { title: "Ангийн үйл ажилгаа", url: "/student/myclass", icon: SquareChartGantt },
    ],
  },
  {
    group: "Сургууль",
    links: [
      { title: "Home", url: "https://erdmiinurguu.edu.mn/", icon: Home },
      { title: "Багшын мэдээлэл", url: "/student/teacherlist", icon: LayoutList },
      { title: "Холбоо барих", url: "/student/schoolcontact", icon: NotebookTabs },
    ],
  },
];

export function AppSidebar() {
const{firstName, lastName, schoolName, teacherId} = useAuthStore()
// console.log(teacherId)
// const myClassId = te
  return (
    <Sidebar className="z-40">
      <SidebarTrigger className="absolute top-5 left-70 w-10 h-10" />
      <SidebarContent>
        <SidebarGroup className="px-6 py-9 flex flex-col gap-4 ">
          <SidebarGroupLabel className="mt-25 flex justify-center flex-col gap-1">
            <h1 className="text-2xl font-bold text-black py-3 text-center">
              {schoolName || "Сургууль"}
            </h1>

            <div className="w-fit h-fit text-center">
              <Image src="/avatar.png" alt="logo" width={150} height={100} />
              <h1 className="text-sm font-bold py-2 text-blue-700">
                {firstName && lastName
                  ? `Сурагч: ${firstName} `
                  : "Сурагч"}
              </h1>
            </div>
          </SidebarGroupLabel>

          <SidebarGroupContent className="mt-10">
            <SidebarMenu className="pt-20">
              {items.map((item: MenuItem) => (
                <div key={item.group}>
                  <div className="text-gray-400 ">{item.group}</div>
                  {item.links.map((link: MenuItemLink) => (
                    <SidebarMenuItem key={link.title}>
                      <SidebarMenuButton className="h-15">
                        <div className="flex items-center gap-4 pt-4 pb-3 pl-3">
                          <a href={link.url} className="flex items-center gap-3">
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
