"use client";

import React, { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Users, Mail, Phone, BookOpen, GraduationCap, Plus, User } from "lucide-react";
import { BASE_URL } from "@/constants/baseurl";
import type { Teacher } from "@/constants/type";
import { useAuthStore } from "@/stores/auth-store";

// Profile Avatar Component
const ProfileAvatar = ({ 
  src, 
  firstName, 
  lastName, 
  size = "md" 
}: { 
  src?: string | null; 
  firstName: string; 
  lastName: string; 
  size?: "sm" | "md" | "lg" 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg"
  };

  const getInitials = (first: string, last: string) => {
    return `${first?.charAt(0) || ''}${last?.charAt(0) || ''}`.toUpperCase();
  };

  const getGradientColor = (name: string) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-emerald-500 to-emerald-600",
      "from-purple-500 to-purple-600",
      "from-pink-500 to-pink-600",
      "from-indigo-500 to-indigo-600",
      "from-orange-500 to-orange-600",
      "from-teal-500 to-teal-600",
      "from-red-500 to-red-600",
    ];
    const index = (name?.charCodeAt(0) || 0) % colors.length;
    return colors[index];
  };

  if (src && !imageError) {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-slate-100 flex items-center justify-center relative`}>
        {imageLoading && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-full"></div>
        )}
        <img
          src={src}
          alt={`${firstName} ${lastName}`}
          className={`w-full h-full object-cover rounded-full ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${getGradientColor(firstName + lastName)} flex items-center justify-center text-white font-bold shadow-md`}>
      {getInitials(firstName, lastName) || <User className="w-1/2 h-1/2" />}
    </div>
  );
};

// Animated Card Component
const AnimatedCard = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [deleteTeacher, setDeleteTeacher] = useState<Teacher | null>(null);

  const { schoolId, token, schoolAdminId } = useAuthStore();

  const fetchTeachers = useCallback(async () => {
    if (!schoolId) {
      setError("Сургуулийн ID олдсонгүй.");
      return;
    }
    if (!token) {
      setError("Токен олдсонгүй.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/teachers/${schoolId}/teachersList`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Алдаа гарлаа: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      // data.data массивын дотор teachers байгаа гэж үзэж байна.
      // Хэрэв өөр бүтэцтэй бол тохируулна уу.
      const teachersList: Teacher[] = data.data
        .map((item: { teachers: Teacher[] }) => item.teachers)
        .flat();
      console.log("setteachers", teachersList);
      setTeachers(teachersList);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Тодорхойгүй алдаа гарлаа.");
      }
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  }, [schoolId, token]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const openEditDialog = (teacher: Teacher) => setEditTeacher(teacher);
  const openDeleteDialog = (teacher: Teacher) => setDeleteTeacher(teacher);
  const closeEditDialog = () => setEditTeacher(null);
  const closeDeleteDialog = () => setDeleteTeacher(null);
  const onTeacherEdited = () => {
    closeEditDialog();
    fetchTeachers();
  };
  const onTeacherDeleted = () => {
    closeDeleteDialog();
    fetchTeachers();
  };

  const handleRetry = () => {
    fetchTeachers();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden pt-30">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-indigo-200/20 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200/20 rounded-full animate-ping"></div>
        </div>

        <div className="pt-8 px-4 md:px-10 pb-10 relative z-10">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden pt-30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-indigo-200/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200/20 rounded-full animate-ping"></div>
        <div className="absolute top-1/4 right-1/3 w-20 h-20 bg-emerald-200/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-amber-200/20 rounded-full animate-bounce"></div>
      </div>

      <div className="pt-8 px-4 md:px-10 pb-10 relative z-10">
        {/* Header Section */}
        <AnimatedCard>
          <Card className="bg-gradient-to-r from-slate-100 via-blue-50 to-indigo-100 border border-white/60 shadow-lg mb-8">
            <CardHeader className="p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500/70 to-indigo-500/80 rounded-xl backdrop-blur-sm shadow-md">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
                      Багш нарын жагсаалт
                    </h1>
                    <p className="text-slate-600 text-lg">
                      Сургуулийн багш нарын бүрэн мэдээлэл
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
              
                </div>
              </div>
            </CardHeader>
          </Card>
        </AnimatedCard>

        {/* Stats Cards */}
        <AnimatedCard delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      Нийт багш
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      {teachers.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      Анги удирдагч
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      {teachers.filter((t) => t.gradeId).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      И-мэйл бүхий
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      {teachers.filter((t) => t.email).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedCard>

        {/* Main Content */}
        <AnimatedCard delay={200}>
          <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-xl">
            <CardContent className="p-8">
              {error ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-500 text-2xl">⚠️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-red-600 mb-2">
                    Алдаа гарлаа
                  </h3>
                  <p className="text-red-500 mb-6">{error}</p>
                  <Button
                    onClick={handleRetry}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Дахин оролдох
                  </Button>
                </div>
              ) : teachers.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    Одоогоор багш бүртгэгдээгүй байна
                  </h3>
                  <p className="text-slate-500 mb-6">
                    Анхны багшаа бүртгүүлэхээс эхлээрэй.
                  </p>
               
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200">
                        <TableHead className="w-[60px] font-semibold text-slate-700">
                          №
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 min-w-[200px]">
                          Профайл
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>Утас</span>
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>И-мэйл</span>
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700">
                          <div className="flex items-center space-x-2">
                            <GraduationCap className="w-4 h-4" />
                            <span>Анги ID</span>
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4" />
                            <span>Статус</span>
                          </div>
                        </TableHead>
                        
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teachers.map((teacher, index) => (
                        <TableRow
                          key={teacher.id}
                          className="border-slate-100 hover:bg-slate-50/50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-slate-600">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {index + 1}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <ProfileAvatar
                                src={teacher.profilePhoto}
                                firstName={teacher.firstName}
                                lastName={teacher.lastName}
                                size="md"
                              />
                              <div className="min-w-0">
                                <div className="font-semibold text-slate-800 truncate">
                                  {teacher.lastName} {teacher.firstName}
                                </div>
                                <div className="text-sm text-slate-500 truncate">
                                  ID: {teacher.id}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-slate-400" />
                              <span className="text-slate-600">
                                {teacher.phoneNumber1 || "—"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-slate-400" />
                              <span className="text-slate-600 truncate max-w-[200px]">
                                {teacher.email || "—"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <GraduationCap className="w-4 h-4 text-slate-400" />
                              <span className="text-slate-600">
                                {teacher.gradeId ? (
                                  <span className="inline-block bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                                    {teacher.gradeId}
                                  </span>
                                ) : "—"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <BookOpen className="w-4 h-4 text-slate-400" />
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                teacher.email 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-orange-100 text-orange-800"
                              }`}>
                                {teacher.email ? "Идэвхтэй" : "Дутуу мэдээлэл"}
                              </span>
                            </div>
                          </TableCell>
                         
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>
    </div>
  );
}