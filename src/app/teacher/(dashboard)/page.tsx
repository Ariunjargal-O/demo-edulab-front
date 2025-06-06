"use client";

import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalender";
import Announcements from "@/components/Announcements";
import { BASE_URL } from "@/constants/baseurl";
import { TeacherType } from "@/constants/type";
import { useAuthStore } from "@/stores/auth-store";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export type TeacherDetailType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export default function Home() {
  const schoolId = useAuthStore((state) => state.schoolId);
  const teacherId = useAuthStore((state) => state.teacherId);
  const schoolName = useAuthStore((state) => state.schoolName);
  const token = useAuthStore((state) => state.token);

  const [teacher, setTeacher] = useState<TeacherType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [gradeGroupId, setGradeGroupId] = useState<string>("");

  const fetchTeacher = async () => {
    try {
      if (!schoolId || !teacherId) {
        throw new Error("Сургуулийн ID болон багшийн ID байх ёстой");
      }
      setLoading(true);
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
      if (!res.ok) {
        throw new Error(
          `Багшийн мэдээлэл татахад алдаа гарлаа: ${res.statusText}`
        );
      }
      const result = await res.json();
      console.log(teacherId);
      if (result && result.success && result.data) {
        setTeacher(result.data);
        setError("");
      } else {
        setError("Өгөгдөл олдсонгүй. Төлөв байдлыг шалгана уу.");
      }
    } catch (err: any) {
      setError(err.message || "Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeacherDetails = async () => {
    try {
      if (!schoolId || !teacherId) {
        throw new Error("Сургуулийн ID болон багшийн ID байх ёстой");
      }

      const res = await fetch(
        `${BASE_URL}/teachers/${schoolId}/${teacherId}/teacherDetails`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(
          `Багшийн дэлгэрэнгүй мэдээлэл татахад алдаа гарлаа: ${res.statusText}`
        );
      }

      const result = await res.json();
      console.log("API response:", result);

      const gradeGroups = result?.data?.teacher?.gradeGroups;

      if (
        result.success &&
        Array.isArray(gradeGroups) &&
        gradeGroups.length > 0
      ) {
        const id = gradeGroups[0]?.id;

        if (id) {
          setGradeGroupId(id); // ✅ Даасан анги байна
        } else {
          setGradeGroupId(""); // ⚠️ Даасан анги ID байхгүй
        }
      } else {
        setGradeGroupId(""); // ⚠️ Даасан анги алга, гэхдээ алдаа биш!
      }

      setError(""); // ✔️ Амжилттай дууссан бол алдаа арилгана
    } catch (err: any) {
      setError(err.message || "Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (schoolId && teacherId) {
      fetchTeacher();
      fetchTeacherDetails();
    }
  }, [schoolId, teacherId]);

  const handleRetry = () => {
    fetchTeacher();
    fetchTeacherDetails();
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden pt-30">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-indigo-200/20 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200/20 rounded-full animate-ping"></div>
        </div>

        <div className="pt-8 px-4 md:px-10 pb-10 relative ">
          <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-xl">
            <CardContent className="p-12">
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
                </div>
                <p className="text-xl text-slate-600 mt-6 animate-pulse">
                  Багш нарын мэдээлэл уншиж байна...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className=" bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-red-200/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-pink-200/20 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-200/20 rounded-full animate-ping"></div>
        </div>

        <div className="flex items-center justify-center px-4 relative z-10">
          <Card className="w-full max-w-md bg-white/80 backdrop-blur-md border-white/50 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="text-red-500 mb-6">
                <AlertCircle className="h-16 w-16 mx-auto drop-shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">
                Алдаа гарлаа
              </h3>
              <p className="text-slate-600 mb-6 text-lg">{error}</p>
              <Button
                onClick={handleRetry}
                variant="outline"
                className="bg-white/60 hover:bg-white/80 border-blue-200/50 text-blue-700 hover:text-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Дахин оролдох
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200/15 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-28 h-28 bg-indigo-200/15 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-purple-200/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-40 w-36 h-36 bg-pink-200/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-cyan-200/20 rounded-full animate-bounce"></div>
      </div>
      <div className="pt-32 pb-10 px-4 md:px-10 flex flex-col gap-10 relative z-10">
        {/* Welcome Header */}
        <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader className="">
            <CardTitle className="text-3xl font-bold leading-8 text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text ">
              Сайн байна уу? Багш: {teacher?.lastName} {teacher?.firstName}
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="flex gap-10 flex-col xl:flex-row">
          {/* Left Column */}
          <div className="flex gap-10 flex-col flex-1">
            {/* Schedule Card */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
              <CardContent className="p-0">
                <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-t-lg">
                  <CardTitle className="text-2xl font-bold leading-8 text-slate-800 py-4">
                    Хичээлийн хуваарь
                  </CardTitle>
                </CardHeader>
                <div className="p-8">
                  <BigCalendar />
                </div>
              </CardContent>
            </Card>

            {/* Academic Year Progress */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
              <CardContent className="p-0">
                <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-t-lg">
                  <CardTitle className="text-2xl font-bold leading-8 text-slate-800 mb-0  py-4">
                    Хичээлийн жилийн үйл явц
                  </CardTitle>
                </CardHeader>
                <div className="p-8">
                  <div className="space-y-6">
                    <ol className="border-l-4 border-gradient-to-b from-blue-400 to-indigo-400 pl-8 space-y-6">
                      <li className="relative">
                        <div className="absolute -left-10 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-white/30 hover:bg-white/70 transition-all duration-300">
                          <div className="text-sm text-slate-500 font-medium mb-2">
                            2024 оны 9 сар
                          </div>
                          <p className="text-base font-semibold text-slate-700">
                            Хичээлийн шинэ жил эхэлсэн
                          </p>
                        </div>
                      </li>
                      <li className="relative">
                        <div className="absolute -left-10 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-lg"></div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-white/30 hover:bg-white/70 transition-all duration-300">
                          <div className="text-sm text-slate-500 font-medium mb-2">
                            2024 оны 11 сар
                          </div>
                          <p className="text-base font-semibold text-slate-700">
                            Намрын шалгалт
                          </p>
                        </div>
                      </li>
                      <li className="relative">
                        <div className="absolute -left-10 w-4 h-4 bg-indigo-500 rounded-full border-4 border-white shadow-lg"></div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-white/30 hover:bg-white/70 transition-all duration-300">
                          <div className="text-sm text-slate-500 font-medium mb-2">
                            2025 оны 1 сар
                          </div>
                          <p className="text-base font-semibold text-slate-700">
                            Хичээлийн улирал дуусгавар болсон
                          </p>
                        </div>
                      </li>
                      <li className="relative">
                        <div className="absolute -left-10 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-lg"></div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-white/30 hover:bg-white/70 transition-all duration-300">
                          <div className="text-sm text-slate-500 font-medium mb-2">
                            2025 оны 3 сар
                          </div>
                          <p className="text-base font-semibold text-slate-700">
                            Хаврын семестер эхэлсэн
                          </p>
                        </div>
                      </li>
                      <li className="relative">
                        <div className="absolute -left-10 w-4 h-4 bg-rose-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                        <div className="bg-gradient-to-r from-rose-50/80 to-pink-50/80 backdrop-blur-sm rounded-lg p-4 border border-rose-200/50 hover:from-rose-100/80 hover:to-pink-100/80 transition-all duration-300">
                          <div className="text-sm text-rose-600 font-medium mb-2">
                            2025 оны 6 сар
                          </div>
                          <p className="text-base font-semibold text-slate-700">
                            Төгсөлтийн шалгалтууд
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="w-full xl:w-1/3 flex flex-col gap-10">
            <EventCalendar />

            {/* Announcements Card */}

            <Announcements />
          </div>
        </div>
      </div>
    </div>
  );
}
