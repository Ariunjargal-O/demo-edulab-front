"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalender";
import Announcements from "@/components/Announcements";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth-store";

export default function StudentPage() {
  const { firstName, lastName } = useAuthStore();
  console.log(firstName, lastName);
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200/15 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-28 h-28 bg-indigo-200/15 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-purple-200/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-40 w-36 h-36 bg-pink-200/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-cyan-200/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-emerald-200/10 rounded-full animate-pulse"></div>
      </div>

      <div className="pt-32 pb-10 px-4 md:px-10 flex flex-col gap-10 relative z-10">
        {/* Welcome Header */}
        <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-0">
          <CardHeader className="">
            <CardTitle className="text-3xl font-bold leading-8 text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text p-8">
              Сайн байна уу? Сурагч: {firstName}
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="flex gap-10 flex-col xl:flex-row">
          {/* Left Column - Main Content */}
          <div className="w-full xl:w-2/3 flex flex-col gap-10">
            {/* Schedule Card */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
              <CardContent className="p-0">
                <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-t-xl">
                  <CardTitle className="text-2xl font-bold leading-8 text-slate-800 p-6">
                    Хичээлийн хуваарь
                  </CardTitle>
                </CardHeader>
                <div className="p-6">
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30 min-h-[600px]">
                    <BigCalendar />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Content Card - You can add more content here */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
              <CardContent className="p-0">
                <CardHeader className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-t-xl">
                  <CardTitle className="text-2xl font-bold leading-8 text-slate-800 p-6">
                    Миний үзүүлэлтүүд
                  </CardTitle>
                </CardHeader>
                <div className="p-6">
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30 min-h-[300px]">
                    {/* Add student performance charts or other content here */}
                    <div className="flex items-center justify-center h-full text-slate-600">
                      Тун удахгүй нэмэгдэнэ...
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="w-full xl:w-1/3 flex flex-col gap-10">
            <EventCalendar />
            <Announcements />
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
