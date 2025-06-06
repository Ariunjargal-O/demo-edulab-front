"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Edit, School2, Trash2, MapPin, Phone, Mail, Calendar, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddSchoolDialog } from "./components/AddSchoolDailog";
import { EditSchoolDialog } from "./components/EditSchoolDailog";
import { DeleteSchoolDialog } from "./components/DeleteSchool";
import type { SchoolInfo } from "@/constants/type";
import { BASE_URL } from "@/constants/baseurl";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";


// Animated Card Component
const AnimatedCard = ({ children, delay = 0, className = "" }: { 
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
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};
export default function SchoolsPage() {
  const [schools, setSchools] = useState<SchoolInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [editingSchool, setEditingSchool] = useState<SchoolInfo | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deletingSchool, setDeletingSchool] = useState<SchoolInfo | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { token, adminId } = useAuthStore();
console.log( adminId)
  // Login руу шилжүүлэх (token-ийн асуудал гарсан үед)
  const redirectToLogin = () => {
    router.push("/login");
  };


  const fetchSchools = async () => {
    if (!adminId) {
      // adminId байхгүй бол татахгүй
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/schools/${adminId}/allSchoolList`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        redirectToLogin();
        return;
      }

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.message || "Сургуулиудыг татахад алдаа гарлаа");
      }

      setSchools(res.schools ?? []);
      console.log("Сургуулиуд:", res.schools);
    } catch (err) {
      console.error("Сургуулиудыг татахад алдаа гарлаа:", err);
      setError("Сургуулиудыг татахад алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  // Component анх ачаалагдах болон adminId өөрчлөгдөхөд сургуулиудыг татах
  useEffect(() => {
    if (adminId) {
      fetchSchools();
    }
  }, [adminId]);

  // Edit dialog нээх
  const openEditDialog = (school: SchoolInfo) => {
    setEditingSchool(school);
    setEditDialogOpen(true);
  };

  // Edit хадгалах
  const handleEditSave = (updatedSchool: SchoolInfo) => {
    setSchools((prev) =>
      prev.map((school) => (school.id === updatedSchool.id ? updatedSchool : school))
    );
    setEditDialogOpen(false);
    setEditingSchool(null);
  };

  // Delete dialog нээх
  const openDeleteDialog = (school: SchoolInfo) => {
    setDeletingSchool(school);
    setDeleteDialogOpen(true);
  };

  // Устгах баталгаажуулалт
  const handleDeleteConfirm = async () => {
    if (!deletingSchool) return;

    try {
      const response = await fetch(`${BASE_URL}/schools/${deletingSchool.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        redirectToLogin();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Сургуулийг устгахад алдаа гарлаа");
      }

      setSchools((prev) => prev.filter((school) => school.id !== deletingSchool.id));
      setDeletingSchool(null);
      setDeleteDialogOpen(false);
    } catch (error: any) {
      console.error("Сургууль устгахад алдаа:", error);
      alert(error.message || "Устгах үед алдаа гарлаа");
    }
  };

  // Шинэ сургууль нэмэгдсэний дараа жагсаалтыг шинэчлэх
  const handleSchoolAdded = () => {
    fetchSchools();
  };

  // Retry хийх
  const handleRetry = () => {
    fetchSchools();
  };

  // Dialog хаах
  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditingSchool(null);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeletingSchool(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden pb-10">
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
                <p className="text-xl text-slate-600 mt-6 animate-pulse">Сургуулиудын мэдээлэл уншиж байна...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden pb-10">
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
                  <div className="p-3 bg-gradient-to-br from-blue-500/80 to-indigo-600/80 rounded-xl backdrop-blur-sm shadow-md">
                    <School2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
                      Бүртгэлтэй сургуулиуд
                    </h1>
                    <p className="text-slate-600 text-lg">
                      Системд бүртгэгдсэн сургуулиудын жагсаалт
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <AddSchoolDialog onSchoolAddedAction={handleSchoolAdded} />
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
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Нийт сургууль</p>
                    <p className="text-2xl font-bold text-slate-800">{schools.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Утас бүхий</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {schools.filter(s => s.phoneNumber).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Админ бүхий</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {schools.filter(s => s.admins && s.admins.length > 0).length}
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
                  <h3 className="text-xl font-semibold text-red-600 mb-2">Алдаа гарлаа</h3>
                  <p className="text-slate-600 mb-6">{error}</p>
                  <div className="flex justify-center gap-4">
                    <Button 
                      onClick={handleRetry}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      Дахин оролдох
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={redirectToLogin}
                      className="border-slate-300 hover:bg-slate-50"
                    >
                      Дахин нэвтрэх
                    </Button>
                  </div>
                </div>
              ) : schools.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <School2 className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    Сургууль бүртгэгдээгүй байна
                  </h3>
                  <p className="text-slate-500 mb-6">
                    Анхны сургуулиа бүртгүүлэхээс эхлээрэй
                  </p>
                  <AddSchoolDialog onSchoolAddedAction={handleSchoolAdded} />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200">
                        <TableHead className="w-[60px] font-semibold text-slate-700">№</TableHead>
                        <TableHead className="font-semibold text-slate-700">Сургуулийн нэр</TableHead>
                        <TableHead className="font-semibold text-slate-700">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>Хаяг</span>
                          </div>
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
                            <span>Админы имэйл</span>
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Огноо</span>
                          </div>
                        </TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Үйлдэл</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schools.map((school, index) => (
                        <TableRow 
                          key={school.id} 
                          className="border-slate-100 hover:bg-slate-50/50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-slate-600">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {index + 1}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-slate-800">
                              {school.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-slate-400" />
                              <span className="text-slate-600 truncate max-w-[200px]">
                                {school.address || "—"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-slate-400" />
                              <span className="text-slate-600">
                                {school.phoneNumber || "—"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-slate-400" />
                              <span className="text-slate-600 truncate max-w-[200px]">
                                {[...new Set((school.admins ?? []).map((admin) => admin.email))].join(", ") || "—"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              <span className="text-slate-600">
                                {format(new Date(school.createdAt), "yyyy-MM-dd")}
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
                                onClick={() => openEditDialog(school)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                                title="Устгах"
                                onClick={() => openDeleteDialog(school)}
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

      {/* Edit school dialog */}
      {editingSchool && (
        <EditSchoolDialog
          open={editDialogOpen}
          onCloseAction={closeEditDialog}
          onSaveAction={handleEditSave}
          school={editingSchool}
        />
      )}

      {/* Delete school dialog */}
      {deletingSchool && (
        <DeleteSchoolDialog
          open={deleteDialogOpen}
          onCloseAction={closeDeleteDialog}
          onConfirmAction={handleDeleteConfirm}
          onDeletedAction={closeDeleteDialog}
          schoolName={deletingSchool.name}
          schoolId={deletingSchool.id}
        />
      )}
    </div>
  );
}