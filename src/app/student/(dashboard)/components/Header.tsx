"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Icon, icons, List, Menu, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
type Notification = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
};

export const Header = () => {

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/notifications/getAll");
        if (!Array.isArray(res.data)) {
          console.error("Expected an array, got:", res.data);
          return;
        }
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  const router = useRouter();
  const logOut = () => {
    localStorage.clear();   // бүх localStorage-ийг устгана
    router.push("/login");
  };
  return (
    // <div className="fixed bg-blue-100 w-[calc(100%-255px)] h-20 py-5 px-10  ">
    <div className="fixed bg-blue-100 w-full h-20 py-5 px-10 z-20 ">
      <ToastContainer />
      <div className=" flex gap-6 items-center justify-self-end">
        <Link href={"/student/chat"}>
          <button className="px-5 py-3 cursor-pointer hover:bg-white rounded-3xl bg-transparent border-0">
            <MessageCircle className=" hover:text-black" />
          </button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="relative p-3 rounded-full hover:bg-gradient-to-tr from-pink-200 via-purple-200 to-blue-200 transition-all duration-300">
            <Bell className="w-6 h-6" />
            {notifications.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse">
                {notifications.length}
              </span>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-80 p-2 rounded-2xl shadow-xl border border-border bg-gradient-to-br from-white via-slate-50 to-slate-100">
            <DropdownMenuLabel className="text-base font-bold text-purple-700 mb-2 tracking-wide">
              🧾 Шинэ мэдээлэл
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 h-0.5" />

            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto custom-scrollbar px-1 py-2">
              {notifications.length === 0 ? (
                <DropdownMenuItem className="text-sm text-muted-foreground py-4 italic">
                  🚫 Мэдэгдэл байхгүй байна
                </DropdownMenuItem>
              ) : (
                notifications.map((notif, index) => (
                  <DropdownMenuItem
                    key={notif.id}
                    className={`flex flex-col items-start gap-1 px-4 py-3 rounded-xl shadow-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer ${index % 3 === 0
                        ? 'bg-pink-100'
                        : index % 3 === 1
                          ? 'bg-purple-100'
                          : 'bg-blue-100'
                      }`}
                  >
                    <h6 className="text-sm font-semibold text-foreground">{notif.title}</h6>
                    <p className="text-xs text-muted-foreground">{notif.message}</p>
                  </DropdownMenuItem>
                ))
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>




        <div className="flex gap-3 bg-white rounded-full w-fit px-3 py-1">
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/student"}>
                {" "}
                <DropdownMenuItem>Home</DropdownMenuItem>
              </Link>
              <Link href={"/student/accountsettings"}>
                {" "}
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link href={"/student/password"}>
                {" "}
                <DropdownMenuItem>Password change</DropdownMenuItem>
              </Link>

              <DropdownMenuItem className="text-red-500 font-semibold" onClick={logOut}>
                Log out
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};
