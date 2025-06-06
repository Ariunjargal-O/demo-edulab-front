"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BASE_URL } from "@/constants/baseurl";
import { ClassData } from "@/constants/type";
import { useAuthStore } from "@/stores/auth-store";

// ✅ User type тодорхойлно
type User = {
  id: string;
  lastname: string;
  firstname: string;
  email: string;
  contact: string;
  emergency: string;
  img: string;
};

export default function StudentListWithClassSelector() {
  const [classList, setClassList] = useState<ClassData[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>();
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [noClassAssigned, setNoClassAssigned] = useState(false);
  const { teacherId, schoolId, token } = useAuthStore();

  // ✅ Анги авах useEffect
  useEffect(() => {
    if (!teacherId || !schoolId || !token) return;

    const fetchTeacherData = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/teachers/${schoolId}/${teacherId}/teacherGradeGroup`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

        const data = await res.json();
        const teacher = data.data.teacher;

        if (!teacher || !teacher.gradeGroups?.length) {
          setNoClassAssigned(true);
          return;
        }

        const formatted: ClassData[] = teacher.gradeGroups.map((group: any) => ({
          id: group.id,
          grade: group.grade?.gradeNumber,
          group: group.group?.groupName,
          teacherName: `${teacher.firstName} ${teacher.lastName}`,
          studentIds: group.students?.map((s: any) => s.id) || [],
        }));

        setClassList(formatted);
        // ✅ Анхдагч анги автоматаар сонгох
        setSelectedClassId(formatted[0]?.id);
      } catch (error) {
        console.error("Алдаа:", error);
        setNoClassAssigned(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [teacherId, schoolId, token]);

  // ✅ Сурагчдын мэдээлэл авах useEffect
  useEffect(() => {
    if (!selectedClassId || !schoolId || !teacherId) return;

    const fetchStudentList = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/students/${schoolId}/${teacherId}/${selectedClassId}/classStudentList`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch students");

        const result = await res.json();
        const students = result.data || result.students || [];

        const formatted: User[] = students.map((s: any) => ({
          id: s.id || "",
          lastname: s.lastName || "",
          firstname: s.firstName || "",
          email: s.email || "",
          contact: s.phoneNumber || "",
          emergency: s.parents?.[0]?.phoneNumber1 || s.emergencyNumber || "",
          img: s.profilePhoto || s.img || "",
        }));

        setData(formatted);
        setFilteredData(formatted);
      } catch (error) {
        console.error("Сурагчдын мэдээлэл авахад алдаа гарлаа:", error);
      }
    };

    fetchStudentList();
  }, [selectedClassId, schoolId, teacherId, token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden pt-30">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-indigo-200/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200/20 rounded-full animate-ping"></div>
      </div>

      <div className="pt-8 px-4 md:px-10 pb-10 relative z-10">
        {/* Select анги */}
        <div className="flex justify-center items-center flex-col gap-3">
          <Select
            value={selectedClassId}
            onValueChange={(val) => setSelectedClassId(val)}
          >
            <SelectTrigger className="w-[300px] rounded-2xl border border-gray-300 shadow-lg backdrop-blur-sm bg-white/60 hover:border-blue-500 transition duration-300">
              <SelectValue placeholder="Анги бүлэг сонгох" />
            </SelectTrigger>
            <SelectContent className="rounded-xl shadow-xl border border-gray-100 bg-white/80 backdrop-blur-md">
              {loading ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Уншиж байна...
                </div>
              ) : noClassAssigned ? (
                <div className="px-3 py-2 text-sm text-red-500">
                  Танд хуваарилагдсан анги алга байна
                </div>
              ) : classList.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Анги бүлэг олдсонгүй
                </div>
              ) : (
                classList.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.grade}-р анги - {cls.group} бүлэг
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {!selectedClassId && !loading && (
            <p className="text-red-500 text-sm font-medium mt-1">
              Анги бүлгээ сонгоно уу!
            </p>
          )}
        </div>

        {/* Title */}
        <Card className="rounded-2xl border border-blue-100 shadow-md backdrop-blur bg-white/60 mt-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-blue-700">
              Ангийн сурагчдын нэрс
            </CardTitle>
          </CardHeader>
        </Card>

        {/* ✅ Сурагчдын мэдээлэл харагдах хэсэг */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              Сурагч олдсонгүй
            </p>
          ) : (
            filteredData.map((student) => (
              <div
                key={student.id}
                className="p-4 bg-white/70 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={student.img || "/default-avatar.png"}
                    alt={student.firstname}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <div>
                    <p className="text-lg font-semibold">
                      {student.firstname} {student.lastname}
                    </p>
                    <p className="text-sm text-gray-600">{student.email}</p>
                    <p className="text-sm text-gray-500">Утас: {student.contact}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
