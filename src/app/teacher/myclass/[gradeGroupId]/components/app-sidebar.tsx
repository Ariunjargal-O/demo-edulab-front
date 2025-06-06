"use client";

import {
  Activity,
  Backpack,
  BookOpen,
  House,
  Info,
  Settings,
  SkipBack,
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
import Image from "next/image";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constants/baseurl";
import { useAuthStore } from "@/stores/auth-store";

interface MenuItem {
  group: string;
  links: MenuItemLink[];
}

interface MenuItemLink {
  title: string;
  url: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface GradeGroup {
  id: string;
  name: string;
  gradeName: string;
  teacherName: string;
  year: string;
}

export function MyClassAppSidebar() {
  const pathname = usePathname();
  const params = useParams();
  const gradeGroupId = params.gradeGroupId as string;
  const [gradeGroup, setGradeGroup] = useState<GradeGroup | null>(null);

  const { schoolId, teacherId, token } = useAuthStore();

  useEffect(() => {
    async function fetchGradeGroup() {
      if (!schoolId || !teacherId || !gradeGroupId) return;

      try {
        const res = await fetch(
          `${BASE_URL}/grade-groups/${schoolId}/${teacherId}/${gradeGroupId}/myClass`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          },
        );
        const result = await res.json();
        setGradeGroup(result);
        console.log("app-data", result);
      } catch (err) {
        console.error("Ангийн мэдээлэл авахад алдаа гарлаа:", err);
      }
    }

    fetchGradeGroup();
  }, [schoolId, teacherId, gradeGroupId]);

  const items: MenuItem[] = [
    {
      group: "Анги",
      links: [
        { title: "Home", url: `/teacher/myclass/${gradeGroupId}`, icon: House },
        {
          title: "Сурагчдын жагсаалт",
          url: `/teacher/myclass/${gradeGroupId}/studentList`,
          icon: Backpack,
        },
        {
          title: "Ангийн үйл ажиллагаа",
          url: `/teacher/myclass/${gradeGroupId}/activity`,
          icon: Activity,
        },
        {
          title: "Эцэг эхийн мэдээлэл",
          url: `/teacher/myclass/${gradeGroupId}/parents`,
          icon: Info,
        },
        {
          title: "Буцах",
          url: "/teacher",
          icon: SkipBack,
        },
      ],
    },
  ];

  return (
    <Sidebar className="z-50">
      <SidebarContent>
        <SidebarGroup className="px-2 py-9 flex flex-col gap-4">
          <SidebarGroupLabel>
            <Link href="/teacher">
            <div className="flex items-center gap-3 group ml-5">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300"
                >
                  <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span
                  className="text-2xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent transition-all duration-300"
                >
                  EduLab
                </span>
              </div>
            </Link>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item: MenuItem) => (
                <div key={item.group}>
                  <div className="font-semibold text-2xl mb-5 ml-2 mt-4">
                    {item.group}
                  </div>
                  <div>
                    {item.links.map((link: MenuItemLink) => {
                      const isActive = (() => {
                        // Home хуудасны хувьд зөвхөн exact match
                        if (link.url === `/teacher/myclass/${gradeGroupId}`) {
                          return pathname === link.url;
                        }
                        // Буцах хуудасны хувьд exact match
                        if (link.url === "/teacher") {
                          return pathname === link.url;
                        }
                        // Бусад хуудсанд дэд хуудас байж болно
                        return pathname === link.url || pathname.startsWith(link.url + "/");
                      })();

                      return (
                        <SidebarMenuItem key={link.title} className="my-2">
                          <SidebarMenuButton
                            asChild
                            className={`
                              flex justify-between items-center w-full
                              hover:bg-blue-50 hover:text-blue-600
                              transition-colors duration-200
                              ${isActive
                                ? "bg-blue-100 text-blue-700 font-semibold"
                                : "text-gray-700 hover:text-blue-600"
                              }
                            `}
                          >
                            <Link
                              href={link.url}
                              className="flex justify-between items-center w-full px-3 py-2 rounded-md"
                            >
                              <span>{link.title}</span>
                              <link.icon className="h-4 w-4" />
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </div>
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}