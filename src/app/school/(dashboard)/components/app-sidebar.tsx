"use client";
import {
  Calendar1,
  CalendarDays,
  ChartSpline,
  Home,
  LayoutDashboard,
  LayoutList,
  ListTodo,
  NotebookTabs,
  PanelTop,
  PhoneCall,
  ScanEye,
  Square,
  SquareChartGantt,
  SquareUser,
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Layout from "../layout";
import Image from "next/image";
import Link from "next/link";
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
      { title: "Home", url: "/school", icon: Home },
      {
        title: "Профайл тохиргоо",
        url: "/school/accountsettings",
        icon: User,
      },
    ],
  },
  {
    group: "Анги",
    links: [
      {
        title: "Ангийн жагсаалт",
        url: "/school/classlist",
        icon: LayoutDashboard,
      },
      {
        title: "Ангиудын үйл ажилгаа",
        url: "/school/classactivity",
        icon: Calendar1,
      },
      {
        title: "Хичээлийн хуваарь",
        url: "/school/schedules",
        icon: CalendarDays,
      },
    ],
  },
  {
    group: "Сурагч",
    links: [
      {
        title: "Сурагчдийн мэдээлэл",
        url: "/school/studentsinfo",
        icon: SquareUser,
      },
      {
        title: "Сурагчдийн үзүүлэлт",
        url: "/school/studentsassessment",
        icon: ChartSpline,
      },
      {
        title: "Сурагчдын үйл ажилгаа",
        url: "/school/studentactivity",
        icon: ListTodo,
      },
    ],
  },
  {
    group: "Сургууль",
    links: [
      { title: "HomePage", url: "https://erdmiinurguu.edu.mn/", icon: Home },
      {
        title: "Сургуулийн үйл ажилгаа",
        url: "/school/schoolActivity",
        icon: Home,
      },
      {
        title: "Багш нарын жагсаалт",
        url: "/school/teacherlist",
        icon: LayoutList,
      },
      // { title: "Холбоо барих", url: "/school/contact", icon: PhoneCall },
    ],
  },
];

export function AppSidebar() {
  const { schoolName, schoolAdminId, schoolId, firstName } = useAuthStore();

  return (
    <Sidebar className="z-30">
      <SidebarTrigger className="absolute top-5 left-70 w-10 h-10"></SidebarTrigger>
      <SidebarContent>
        <SidebarGroup className="px-6 py-10 flex flex-col gap-4">
          <SidebarGroupLabel className="mt-20 flex justify-center flex-col gap-1">
            <h1 className="text-2xl font-bold leading-8 text-black py-3 text-center">
              {schoolName || "Сургууль"}
            </h1>
            <div className="w-fit h-fit">
              <Image src="/avatar.png" alt="logo" width={150} height={150} />
              <h1 className="text-sm font-normal leading-5 text-black py-2"></h1>
              
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-5">
            <SidebarMenu className="pt-20">
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
