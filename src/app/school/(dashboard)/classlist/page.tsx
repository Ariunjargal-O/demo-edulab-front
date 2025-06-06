"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClassData, CreateClassData } from "@/constants/type";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constants/baseurl";

import { Edit, Trash2, Users, BookOpen, GraduationCap, Mail, UserCheck, AlertCircle } from "lucide-react";
import { AddClassDialog } from "./components/AddClassDailog";
import EditClassDialog from "./components/EditClassDailog";
import { Dialog } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/stores/auth-store";

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
      className={`transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        } ${className}`}
    >
      {children}
    </div>
  );
};

export default function ClassList() {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schoolId = useAuthStore((state) => state.schoolId);
  const schoolAdminId = useAuthStore((state) => state.schoolAdminId);
  const token = useAuthStore((state) => state.token);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassData | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<ClassData | null>(null);

  useEffect(() => {
    if (schoolId && token) {
      fetchClasses();
    }
  }, [schoolId, token]);

  // const fetchClasses = async () => {
  //   if (!schoolId || !token) return;

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}/grades/${schoolId}/allClassList`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`API алдаа: ${response.status} - ${errorText}`);
  //     }

  //     const result = await response.json();
  //     console.log("API Response:", result); // Debug log

  //     const formattedClasses: ClassData[] = [];


  //     // result.data array эсэхийг шалгах
  //     if (!result.data || !Array.isArray(result.data)) {
  //       throw new Error("Invalid data structure received from API");
  //     }

  //     for (const grade of result.data) {
  //       try {
  //         if (grade.groups && Array.isArray(grade.groups)) {
  //           for (const group of grade.groups) {
  //             const groupData = group.groupName?.include?.group || group;
  //             let teacherDetails;

  //             try {
  //               teacherDetails = await fetchTeacherDetails(groupData.teacherId);
  //             } catch (teacherError) {
  //               console.error("Teacher fetch error:", teacherError);
  //               teacherDetails = {
  //                 teacherLast: "Багш байхгүй",
  //                 teacherFirst: "",
  //                 teacherEmail: "Имэйл байхгүй",
  //               };
  //             }

  //             formattedClasses.push({
  //               id: groupData.id || `${grade.gradeNumber}-${groupData.groupName}`,
  //               grade: grade.gradeNumber,
  //               group: groupData.groupName,
  //               teacherLast: teacherDetails.teacherLast,
  //               teacherFirst: teacherDetails.teacherFirst,
  //               teacherEmail: teacherDetails.teacherEmail,
  //               studentIds: groupData.students?.map((s: any) => s.id) || [],
  //             });

  //           }
  //         } else {
  //           let teacherDetails;

  //           try {
  //             teacherDetails = await fetchTeacherDetails(grade.teacherId);
  //           } catch (teacherError) {
  //             console.error("Teacher fetch error:", teacherError);
  //             teacherDetails = {
  //               teacherLast: "Багш байхгүй",
  //               teacherFirst: "",
  //               teacherEmail: "Имэйл байхгүй",
  //             };
  //           }

  //           formattedClasses.push({
  //             id: grade.id,
  //             grade: grade.gradeNumber,
  //             group: grade.group.groupName,
  //             teacherLast: teacherDetails.teacherLast,
  //             teacherFirst: teacherDetails.teacherFirst,
  //             teacherEmail: teacherDetails.teacherEmail,
  //             studentIds: grade.students?.map((s: any) => s.id) || [],
  //           });
  //         }
  //       } catch (gradeError) {
  //         console.error("Error processing grade:", grade, gradeError);
  //         // Skip this grade and continue with others
  //         continue;
  //       }
  //     }

  //     setClasses(formattedClasses);
  //   } catch (err) {
  //     console.error("Алдаа:", err);
  //     setError(err instanceof Error ? err.message : "Алдаа гарлаа.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchClasses = async () => {
    if (!schoolId || !token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/grades/${schoolId}/allClassList`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API алдаа: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("API Response:", result); // Debug log

      // Check if result.data exists and is an array
      if (!result.data || !Array.isArray(result.data)) {
        throw new Error("Invalid data structure received from API");
      }

      // Process the new API structure
      const formattedClasses: ClassData[] = result.data.map((item: any) => {
        return {
          id: item.id,
          grade: item.grade?.gradeNumber || "N/A",
          group: item.group?.groupName || "N/A",
          teacherLast: item.teacher?.lastName || "Багш байхгүй",
          teacherFirst: item.teacher?.firstName || "",
          teacherEmail: item.teacher?.email || "Имэйл байхгүй",
          studentIds: item.students?.map((s: any) => s.id) || [],
        };
      });

      setClasses(formattedClasses);
    } catch (err) {
      console.error("Алдаа:", err);
      setError(err instanceof Error ? err.message : "Алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeacherDetails = async (teacherId: string | null) => {
    if (!teacherId || !schoolId || !token) {
      return {
        teacherLast: "Багш байхгүй",
        teacherFirst: "",
        teacherEmail: "Имэйл байхгүй",
      };
    }

    try {
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
        throw new Error(`Teacher API error: ${res.status}`);
      }

      const data = await res.json();

      // data structure шалгах
      if (!data.data || !data.data.teacher) {
        throw new Error("Invalid teacher data structure");
      }

      return {
        teacherLast: data.data.teacher.lastName || "Овог байхгүй",
        teacherFirst: data.data.teacher.firstName || "Нэр байхгүй",
        teacherEmail: data.data.teacher.email || "Имэйл байхгүй",
      };
    } catch (err) {
      console.error("Teacher fetch error:", err);
      return {
        teacherLast: "Багш байхгүй",
        teacherFirst: "",
        teacherEmail: "Имэйл байхгүй",
      };
    }
  };

  const handleAddClass = async (data: CreateClassData) => {
    if (!schoolId || !token) throw new Error("School ID/token байхгүй байна");

    try {
      const payload = { ...data, schoolId };
      const response = await fetch(`${BASE_URL}/grades/${schoolId}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Анги нэмэхэд алдаа гарлаа: ${response.status} - ${errorText}`);
      }

      await fetchClasses();
    } catch (err) {
      console.error("Add class error:", err);
      setError(err instanceof Error ? err.message : "Анги нэмэхэд алдаа гарлаа");
    }
  };

  const handleEditClass = (classItem: ClassData) => {
    setEditingClass(classItem);
    setEditDialogOpen(true);
  };

  const handleEditSuccess = () => {
    fetchClasses();
    setEditDialogOpen(false);
    setEditingClass(null);
  };

  const handleDeleteClick = (classItem: ClassData) => {
    setClassToDelete(classItem);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!classToDelete || !token) return;

    try {
      const res = await fetch(`${BASE_URL}/grades/${classToDelete.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Устгал амжилтгүй: ${res.status} - ${errorText}`);
      }

      await fetchClasses();
    } catch (err) {
      console.error("Delete error:", err);
      setError(err instanceof Error ? err.message : "Алдаа гарлаа");
    } finally {
      setClassToDelete(null);
      setConfirmDeleteOpen(false);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteOpen(false);
    setClassToDelete(null);
  };

  const handleRetry = () => fetchClasses();
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 mb-4">
              <AlertCircle className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="font-semibold mb-2">Алдаа гарлаа</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={handleRetry} variant="outline">
              Дахин оролдох
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                <p className="text-xl text-slate-600 mt-6 animate-pulse">Ангиудын мэдээлэл уншиж байна...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-150 via-blue-100 to-indigo-50 relative overflow-hidden pt-30">
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
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
                      Ангиудын жагсаалт
                    </h1>
                    <p className="text-slate-600 text-lg">
                      Сургуулийн бүх ангийн бүрэн мэдээлэл
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <AddClassDialog onSubmitAction={handleAddClass} />
                </div>
              </div>
            </CardHeader>
          </Card>
        </AnimatedCard>

        {/* Stats Cards */}
        <AnimatedCard delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Нийт анги</p>
                    <p className="text-2xl font-bold text-slate-800">{classes.length}</p>
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
                    <p className="text-sm text-slate-600 font-medium">Нийт сурагч</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {classes.reduce((total, classItem) => total + (classItem.studentIds?.length || 0), 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Багштай анги</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {classes.filter(c => c.teacherLast !== "Багш байхгүй").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">И-мэйл бүхий</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {classes.filter(c => c.teacherEmail && c.teacherEmail !== "Имэйл байхгүй").length}
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
                  <p className="text-red-600 text-lg font-medium mb-4">{error}</p>
                  <Button onClick={handleRetry} className="bg-blue-600 hover:bg-blue-700">
                    Дахин оролдох
                  </Button>
                </div>
              ) : classes.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    Анги бүртгэгдээгүй байна
                  </h3>
                  <p className="text-slate-500 mb-6">
                    Эхний ангийг бүртгэхээр дээрх товчийг дарна уу
                  </p>
                  <AddClassDialog onSubmitAction={handleAddClass} />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200">
                        <TableHead className="w-[60px] font-semibold text-slate-700">№</TableHead>
                        <TableHead className="font-semibold text-slate-700">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4" />
                            <span>Анги</span>
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700">Бүлэг</TableHead>
                        <TableHead className="font-semibold text-slate-700">Багшийн овог нэр</TableHead>
                        <TableHead className="font-semibold text-slate-700">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>И-мэйл</span>
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>Сурагч</span>
                          </div>
                        </TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Үйлдэл</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classes.map((classItem, index) => (
                        <TableRow
                          key={`class-${classItem.id || `${classItem.grade}-${classItem.group}-${classItem.teacherLast}-${index}`}`}
                          className="border-slate-100 hover:bg-slate-50/50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-slate-600">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {index + 1}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <BookOpen className="w-4 h-4 text-slate-400" />
                              <span className="font-medium text-slate-800">
                                {classItem.grade}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-slate-600">{classItem.group}</span>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-slate-800">
                              {classItem.teacherLast} {classItem.teacherFirst}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-slate-400" />
                              <span className="text-slate-600 truncate max-w-[200px]">
                                {classItem.teacherEmail}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-slate-400" />
                              <span className="font-medium text-slate-800">
                                {classItem.studentIds?.length || 0}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                                title="Засах"
                                onClick={() => handleEditClass(classItem)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                                title="Устгах"
                                onClick={() => handleDeleteClick(classItem)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
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

      {/* Ангийг устгах баталгаажуулах */}
      <AlertDialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ангийг устгах уу?</AlertDialogTitle>
            <AlertDialogDescription>
              Та энэ ангийг устгах гэж байгаа бөгөөд энэ үйлдлийг буцааж
              болохгүй.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Цуцлах</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Устгах
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Ангийг засах */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <EditClassDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          editingClass={editingClass}
          onSaveSuccess={handleEditSuccess}
        />
      </Dialog>
    </div>
  );
}