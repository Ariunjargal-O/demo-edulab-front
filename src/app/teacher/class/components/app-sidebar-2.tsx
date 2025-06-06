"use client";

import {
  BookOpen,
  ChartLine,
  ContactRoundIcon,
  NotebookPen,
  SkipBack,
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
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BASE_URL } from "@/constants/baseurl";
import { ClassData } from "@/constants/type";

const items = [
  {
    title: "Сурагчдын лист",
    url: "/teacher/class",
    icon: UserCheck,
  },
  {
    title: "Ирц",
    url: "/teacher/class/attandance",
    icon: UserCheck,
  },
  {
    title: "Дүн",
    url: "/teacher/class/score",
    icon: ChartLine,
  },
  {
    title: "Шалгалт",
    url: "/teacher/class/exam",
    icon: NotebookPen,
  },
  {
    title: "Буцах",
    url: "/teacher",
    icon: SkipBack,
  },
];

export function AppSidebar2() {
  const pathname = usePathname();
  const [classList, setClassList] = useState<ClassData[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [noClassAssigned, setNoClassAssigned] = useState(false);

  return (
    <Sidebar className="z-40">
      <SidebarContent>
        <SidebarGroup className="px-2 py-9 flex flex-col gap-4">
          <SidebarGroupLabel>
            <Link href="/teacher">
              <div className="flex items-center gap-3 group ml-5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                  <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-2xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent transition-all duration-300">
                  EduLab
                </span>
              </div>
            </Link>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {/* Always show other menu items */}
              <div>
                {items.map((item) => {
                  const isActive = (() => {
                    // Буцах хуудасны хувьд exact match
                    if (item.url === "/teacher") {
                      return pathname === item.url;
                    }
                    // Бусад хуудсанд дэд хуудас байж болно
                    return (
                      pathname === item.url ||
                      pathname.startsWith(item.url + "/")
                    );
                  })();

                  return (
                    <SidebarMenuItem key={item.title} className="my-2">
                      <SidebarMenuButton
                        asChild
                        className={`
                        flex justify-between items-center w-full
                        hover:bg-blue-50 hover:text-blue-600
                        transition-colors duration-200
                        ${
                          isActive
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "text-gray-700 hover:text-blue-600"
                        }
                      `}
                      >
                        <Link
                          href={item.url}
                          className="flex justify-between items-center w-full px-3 py-2 rounded-md"
                        >
                          <span>{item.title}</span>
                          <item.icon className="h-4 w-4" />
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
