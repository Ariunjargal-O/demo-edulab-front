"use client";
import React, { useEffect, useState } from "react";
import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalender";
import FinanceChart from "@/components/FinanceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserCard from "@/components/UserCard";
import { BASE_URL } from "@/constants/baseurl";
import { useAuthStore } from "@/stores/auth-store";

export default function SchoolPage() {
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [teacher, setTeacher] = useState<any>(null);

  const { schoolId, schoolName, schoolAdminId, token } = useAuthStore();

  console.log("📦 schoolId:", schoolId);
  console.log("📦 schoolName:", schoolName);
  console.log("📦 schoolAdminID:", schoolAdminId);
  // schoolId, teacherId оноогдсоны дараа fetch хийх
  useEffect(() => {
    if (!schoolId || !teacherId) {
      return;
    }

    const fetchTeacher = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/teachers/${schoolId}/${teacherId}/teacherInfo`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Fixed: removed extra }
            },
          }
        );

        if (!res.ok) {
          throw new Error("Багшийн мэдээлэл татахад алдаа гарлаа");
        }

        const data = await res.json();
        setTeacher(data);
      } catch (err) {
        console.error("Fetch teacher error:", err);
      }
    };

    fetchTeacher();
  }, [schoolId, teacherId, token]); // Added token to dependencies

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
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
              Сайн байна уу? {schoolName && `- ${schoolName}`}
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="flex gap-10 flex-col lg:flex-row">
          {/* Left Column - Main Content */}
          <div className="w-full lg:w-2/3 flex flex-col gap-10">
            {/* User Cards */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
              <CardContent className="p-0">
                <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-t-xl">
                  <CardTitle className="text-2xl font-bold leading-8 text-slate-800 p-6">
                    Хэрэглэгчдийн тоо
                  </CardTitle>
                </CardHeader>
                <div className="p-8">
                  <div className="flex gap-5 justify-between flex-wrap">
                    <UserCard type="student" />
                    <UserCard type="teacher" />
                    <UserCard type="parent" />
                    <UserCard type="staff" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Charts Row */}
            <div className="flex gap-10 flex-col lg:flex-row">
              <Card className="w-full lg:w-1/3 bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
                <CardContent className="p-0">
                  <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-t-xl">
                    <CardTitle className="text-xl font-bold leading-8 text-slate-800 p-6">
                      Тоо
                    </CardTitle>
                  </CardHeader>
                  <div className="p-6">
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30 h-[450px]">
                      <CountChart />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full lg:w-2/3 bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
                <CardContent className="p-0">
                  <CardHeader className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-t-xl">
                    <CardTitle className="text-xl font-bold leading-8 text-slate-800 p-6">
                      Ирц
                    </CardTitle>
                  </CardHeader>
                  <div className="p-6">
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30 h-[450px]">
                      <AttendanceChart />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Finance Chart */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
              <CardContent className="p-0">
                <CardHeader className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-t-xl">
                  <CardTitle className="text-2xl font-bold leading-8 text-slate-800 p-6">
                    Санхүү
                  </CardTitle>
                </CardHeader>
                <div className="p-6">
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30 h-[500px]">
                    <FinanceChart />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="w-full lg:w-1/3 flex flex-col gap-10">
            <EventCalendar />

            <Announcements />
          </div>
        </div>
      </div>
    </div>
  );
}
