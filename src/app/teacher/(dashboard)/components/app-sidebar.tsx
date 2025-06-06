"use client";

import {
  BetweenHorizonalEnd,
  BookCheck,
  CalendarRange,
  Grid2X2Plus,
  Home,
  LayoutDashboard,
  LayoutList,
  NotebookTabs,
  PanelTop,
  ScanEye,
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

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { BASE_URL } from "@/constants/baseurl";
import { TeacherType } from "@/constants/type";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";  // Sonner ашиглана

interface MenuItem {
  group: string;
  links: MenuItemLink[];
}

interface MenuItemLink {
  title: string;
  url: string;
  icon: React.ComponentType;
}

export function AppSidebar() {
  const [teacher, setTeacher] = useState<TeacherType>();
  const [gradeGroupId, setGradeGroupId] = useState<string>("");

  const { schoolId, teacherId, schoolName, token } = useAuthStore();

  const fetchTeacher = async () => {
    try {
      if (!schoolId || !teacherId) return;

      const res = await fetch(
        `${BASE_URL}/teachers/${schoolId}/${teacherId}/teacherInfo`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();
      if (result.success && result.data) {
        setTeacher(result.data);
      }
    } catch (err) {
      console.error("Багшийн мэдээлэл татахад алдаа:", err);
    }
  };

  const fetchTeacherDetails = async () => {
    try {
      if (!schoolId || !teacherId) return;

      const res = await fetch(
        `${BASE_URL}/teachers/${schoolId}/${teacherId}/teacherGradeGroup`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();
      if (
        result.success &&
        result.data?.teacher?.gradeGroups?.[0]?.id
      ) {
        setGradeGroupId(result.data.teacher.gradeGroups[0].id);
      }
    } catch (err) {
      console.error("GradeGroup ID татахад алдаа:", err);
    }
  };

  useEffect(() => {
    if (schoolId && teacherId) {
      fetchTeacher();
      fetchTeacherDetails();
    }
  }, [schoolId, teacherId]);

  const sidebarItems: MenuItem[] = useMemo(
    () => [
      {
        group: "Профайл",
        links: [
          { title: "Home", url: "/teacher", icon: Home },
          { title: "Профайл тохиргоо", url: "/teacher/accountsettings", icon: User },
          { title: "Ирц", url: "/teacher/attendance", icon: ScanEye },
          { title: "Багшийн үнэлгээ", url: "/teacher/assessment", icon: TrendingUp },
        ],
      },
      {
        group: "Анги",
        links: [
          {
            title: "Даасан анги",
            url: gradeGroupId ? `/teacher/myclass/${gradeGroupId}` : "#",
            icon: PanelTop,
          },
          { title: "Хичээлийн анги", url: "/teacher/class", icon: LayoutDashboard },
          { title: "Сонгон анги үүсгэх", url: "/teacher/createClass", icon: Grid2X2Plus },
        ],
      },
      {
        group: "Хичээл",
        links: [
          { title: "Хичээлийн хөтөлбөр", url: "/teacher/plan", icon: CalendarRange },
          { title: "Шалгалт", url: "/teacher/exam", icon: BookCheck },
          // { title: "Хичээлийн анги нэмэх", url: "/teacher/classAdd", icon: BetweenHorizonalEnd },
        ],
      },
      {
        group: "Сургууль",
        links: [
          { title: "Home", url: "https://erdmiinurguu.edu.mn/", icon: Home },
          { title: "Багш нарын мэдээлэл", url: "/teacher/teacherlist", icon: LayoutList },
          // { title: "Холбоо барих", url: "/teacher/contact", icon: NotebookTabs },
        ],
      },
    ],
    [gradeGroupId]
  );

  return (
    <Sidebar className="z-40">
      <SidebarTrigger className="absolute top-5 left-70 w-10 h-10" />
      <SidebarContent>
        <SidebarGroup className="px-6 py-9 flex flex-col gap-4">
          <SidebarGroupLabel className="mt-25 flex justify-center flex-col gap-1">
            <h1 className="text-2xl text-center font-bold text-black py-3">
              {schoolName || "Сургууль"}
            </h1>
            <div className="w-fit h-fit">
              <Image src="/avatar.png" alt="logo" width={150} height={150} />
              <h1 className="text-sm font-bold py-2 text-blue-700">
                {teacher ? `Багш: ${teacher.firstName} ${teacher.lastName}` : "Багш"}
              </h1>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-35">
            <SidebarMenu>
              {sidebarItems.map((item: MenuItem) => (
                <div key={item.group}>
                  <div className="text-gray-400">{item.group}</div>
                  {item.links.map((link: MenuItemLink) => (
                    <SidebarMenuItem key={link.title}>
                      <SidebarMenuButton
                        className="h-15"
                        onClick={(e) => {
                          if (link.title === "Даасан анги" && !gradeGroupId) {
                            e.preventDefault();
                            toast.error("Та анги даагаагүй байна.");
                          } else {
                            window.location.href = link.url;
                          }
                        }}
                      >
                        <div className="flex items-center gap-4 pt-4 pb-3 pl-3">
                          <link.icon />
                          <span className="leading-4">{link.title}</span>
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
