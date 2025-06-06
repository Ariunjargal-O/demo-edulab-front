"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constants/baseurl";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Phone,
  Mail,
  Users,
  UserCheck,
  Calendar,
  Search,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth-store";

export type User = {
  id: string;
  lastname: string;
  firstname: string;
  email: string;
  contact: string;
  emergency: string;
  img: string;
};

export type GradeGroup = {
  id: string;
  name: string;
  grade: string;
  section: string;
};

// Animated Card Component
const AnimatedCard = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      {children}
    </div>
  );
};

export default function Page() {
  const params = useParams();
  const gradeGroupId = params.gradeGroupId as string;

  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeGroup, setGradeGroup] = useState<GradeGroup | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingStudent, setEditingStudent] = useState<User | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<User | null>(null);

  const { schoolId, teacherId } = useAuthStore();

  // Fetch grade group information
  const fetchGradeGroup = async () => {
    if (!schoolId || !teacherId || !gradeGroupId) return;

    try {
      const res = await fetch(
        `${BASE_URL}/grade-groups/${schoolId}/${teacherId}/${gradeGroupId}/myClass`
      );
      if (!res.ok) throw new Error("Failed to fetch grade group");

      const result = await res.json();
      console.log("Grade Group API Response:", result);

      // Extract data based on your actual API structure
      const gradeGroupData = result.data;

      // Extract grade and group information from the nested structure
      const gradeGroup = {
        id: gradeGroupData.id || gradeGroupId,
        name: gradeGroupData.classInfo?.className || "",
        grade: gradeGroupData.grade?.gradeNumber || "",
        section: gradeGroupData.group?.groupName || "",
      };

      console.log("Processed Grade Group:", gradeGroup);
      setGradeGroup(gradeGroup);
    } catch (error) {
      console.error("Error fetching grade group:", error);
      // Set a fallback if API fails
      setGradeGroup({
        id: gradeGroupId,
        name: "Unknown Class",
        grade: "",
        section: "",
      });
    }
  };

  const fetchStudents = async () => {
    if (!schoolId || !teacherId || !gradeGroupId) return;

    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${BASE_URL}/students/${schoolId}/${teacherId}/${gradeGroupId}/classStudentList`
      );
      if (!res.ok) throw new Error("Failed to fetch students");

      const result = await res.json();
      console.log("API Response:", result);

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

      console.log("Formatted students:", formatted);
      setData(formatted);
      setFilteredData(formatted);
    } catch (error) {
      console.error("Алдаа: ", error);
      setError("Сурагчдын мэдээлэл татахад алдаа гарлаа");
      setData([]);
      setFilteredData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch both grade group info and students
    fetchGradeGroup();
    fetchStudents();
  }, [schoolId, teacherId, gradeGroupId]);

  // Search functionality
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (student) =>
          `${student.firstname} ${student.lastname}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  // Format grade group display name
  const getGradeDisplayName = () => {
    if (!gradeGroup) return "";

    console.log("Grade Group for display:", gradeGroup); // Debug log

    // Create display name like "12А" or "Grade 5 - A"
    const grade = gradeGroup.grade;
    const section = gradeGroup.section;
    const name = gradeGroup.name;

    // Try different combinations
    if (grade && section) {
      return `${grade}${section}`;
    } else if (grade) {
      return grade;
    } else if (name && name !== "Unknown Class") {
      return name;
    } else if (section) {
      return section;
    }

    return "";
  };

  // Handle adding new student
  const handleAddStudent = async (studentData: any) => {
    try {
      const payload = {
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        email: studentData.email,
        phoneNumber: studentData.phoneNumber,
        emergencyNumber: studentData.parents?.[0]?.phoneNumber1 || "",
        teacherId: teacherId,
        schoolId: schoolId,
        gradeGroupId: gradeGroupId,
        parents: studentData.parents || [],
      };

      const response = await fetch(`${BASE_URL}/students/${schoolId}/${teacherId}/${gradeGroupId}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      await fetchStudents();
      return { success: true };
    } catch (error) {
      console.error("Error adding student:", error);
      return { success: false, error: "Сурагч нэмэхэд алдаа гарлаа" };
    }
  };

  // Handle editing student
  const handleEditStudent = async (studentData: any) => {
    try {
      const payload = {
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        email: studentData.email,
        phoneNumber: studentData.phoneNumber,
        emergencyNumber: studentData.parents?.[0]?.phoneNumber1 || "",
        parents: studentData.parents || [],
      };

      const response = await fetch(
        `${BASE_URL}/students/${schoolId}/${teacherId}/${gradeGroupId}/${editingStudent?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      await fetchStudents();
      setEditingStudent(null);
      return { success: true };
    } catch (error) {
      console.error("Error updating student:", error);
      return {
        success: false,
        error: "Сурагчийн мэдээлэл засахад алдаа гарлаа",
      };
    }
  };

  // Handle deleting student
  const handleDeleteStudent = async (studentId: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}/students/${schoolId}/${teacherId}/${gradeGroupId}/${studentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      await fetchStudents();
      setDeletingStudent(null);
      return { success: true };
    } catch (error) {
      console.error("Error deleting student:", error);
      return { success: false, error: "Сурагч устгахад алдаа гарлаа" };
    }
  };

  const handleRetry = () => {
    fetchGradeGroup();
    fetchStudents();
  };

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

      <div className="pt-8 px-4 md:px-10 pb-10 relative">
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
                      {getGradeDisplayName() && (
                        <span className="text-blue-600 mr-2">
                          {getGradeDisplayName()}
                        </span>
                      )}
                      ангийн сурагчдын нэрсийн жагсаалт
                    </h1>
                    <p className="text-slate-600 text-lg">
                      Сурагчдын бүрэн мэдээлэл болон холбоо барих хэсэг
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </AnimatedCard>

        {/* Stats Cards */}
        {!isLoading && !error && (
          <AnimatedCard delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 font-medium">
                        Нийт сурагч
                      </p>
                      <p className="text-2xl font-bold text-slate-800">
                        {data.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 font-medium">
                        И-мэйл бүхий
                      </p>
                      <p className="text-2xl font-bold text-slate-800">
                        {data.filter((s) => s.email && s.email.trim() !== "").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 font-medium">
                        Утас бүхий
                      </p>
                      <p className="text-2xl font-bold text-slate-800">
                        {data.filter((s) => s.contact && s.contact.trim() !== "").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
                      <UserCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 font-medium">
                        Яаралтай утас
                      </p>
                      <p className="text-2xl font-bold text-slate-800">
                        {data.filter((s) => s.emergency && s.emergency.trim() !== "").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedCard>
        )}

        {/* Search Bar */}
        {!isLoading && !error && data.length > 0 && (
          <AnimatedCard delay={150}>
            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg mb-8">
              <CardContent className="p-6">
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    placeholder="Сурагчийн нэр эсвэл и-мэйлээр хайх..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/80 border-white/60 focus:border-blue-300 focus:ring-blue-200"
                  />
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        )}

        {/* Main Content */}
        <AnimatedCard delay={200}>
          <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-xl">
            <CardContent className="p-8">
              {isLoading ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    Уншиж байна...
                  </h3>
                  <p className="text-slate-500">
                    Сурагчдын мэдээллийг татаж байна
                  </p>
                </div>
              ) : error ? (
                <div className="text-center py-16">
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
              ) : filteredData.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    {searchTerm
                      ? "Хайлтын үр дүн олдсонгүй"
                      : "Сурагч олдсонгүй"}
                  </h3>
                  <p className="text-slate-500">
                    {searchTerm
                      ? "Өөр түлхүүр үгээр хайж үзнэ үү"
                      : "Энэ ангид сурагч бүртгэгдээгүй байна"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredData.map((student, index) => (
                    <AnimatedCard key={student.id} delay={250 + index * 50}>
                      <Card className="group hover:shadow-2xl transition-all duration-500 rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm hover:bg-white/90 transform hover:-translate-y-2">
                        <CardContent className="flex flex-col items-center p-6 relative">
                          {/* Action Menu */}
                          <div className="absolute top-4 right-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => setEditingStudent(student)}
                                  className="cursor-pointer"
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Засах
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => setDeletingStudent(student)}
                                  className="cursor-pointer text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Устгах
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="w-24 h-24 relative mb-4 group-hover:scale-110 transition-transform duration-300">
                            {student.img ? (
                              <Image
                                src={student.img}
                                alt={`${student.firstname}-profile`}
                                width={96}
                                height={96}
                                className="object-cover rounded-full border-4 border-white shadow-lg"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 rounded-full text-slate-500 shadow-lg">
                                <Users className="w-8 h-8" />
                              </div>
                            )}
                          </div>

                          <div className="text-center mb-4">
                            <h3 className="text-lg font-bold text-slate-800 mb-1">
                              {student.firstname} {student.lastname}
                            </h3>
                          </div>

                          <div className="space-y-3 w-full text-sm">
                            {student.contact && student.contact.trim() !== "" && (
                              <div className="flex items-center space-x-2 text-slate-600 bg-slate-50/70 rounded-lg p-2">
                                <Phone className="w-4 h-4 text-blue-500" />
                                <span className="truncate">
                                  {student.contact}
                                </span>
                              </div>
                            )}

                            {student.email && student.email.trim() !== "" && (
                              <div className="flex items-center space-x-2 text-slate-600 bg-slate-50/70 rounded-lg p-2">
                                <Mail className="w-4 h-4 text-emerald-500" />
                                <span className="truncate">
                                  {student.email}
                                </span>
                              </div>
                            )}

                            {student.emergency && student.emergency.trim() !== "" && (
                              <div className="mt-4">
                                <Button
                                  onClick={() =>
                                    (window.location.href = `tel:${student.emergency}`)
                                  }
                                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                  size="sm"
                                >
                                  <Phone className="w-4 h-4 mr-2" />
                                  Яаралтай залгах
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedCard>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>
    </div>
  );
}