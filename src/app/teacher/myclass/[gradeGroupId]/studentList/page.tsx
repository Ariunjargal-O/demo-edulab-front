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
  Eye,
  User,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddStudentDialog from "./components/AddStudentDailog";
import EditStudentDialog from "./components/EditStudentDailog";
import DeleteStudentDialog from "./components/DeleteStudentDailog";
import { useAuthStore } from "@/stores/auth-store";

export type User = {
  id: string;
  lastname: string;
  firstname: string;
  email: string;
  contact: string;
  emergency: string;
  img: string;
  sex?: string; // Added gender field
  parents?: Array<{
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber1: string;
    phoneNumber2?: string;
    relationship: string;
    email?: string;
  }>;
};

// Gender display component
const GenderBadge = ({ gender }: { gender?: string }) => {
  if (!gender || gender.trim() === "") {
    return (
      <div className="flex items-center space-x-1">
        <UserX className="w-4 h-4 text-slate-400" />
        <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
          Тодорхойгүй
        </span>
      </div>
    );
  }

  const isMale =
    gender.toLowerCase() === "male" ||
    gender.toLowerCase() === "эр" ||
    gender.toLowerCase() === "м";
  const isFemale =
    gender.toLowerCase() === "female" ||
    gender.toLowerCase() === "эм" ||
    gender.toLowerCase() === "ж";

  if (isMale) {
    return (
      <div className="flex items-center space-x-1">
        <User className="w-4 h-4 text-blue-500" />
        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium">
          Эрэгтэй
        </span>
      </div>
    );
  } else if (isFemale) {
    return (
      <div className="flex items-center space-x-1">
        <User className="w-4 h-4 text-pink-500" />
        <span className="text-xs text-pink-600 bg-pink-50 px-2 py-1 rounded-full font-medium">
          Эмэгтэй
        </span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center space-x-1">
        <User className="w-4 h-4 text-purple-500" />
        <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full font-medium">
          {gender}
        </span>
      </div>
    );
  }
};

// Parent Information Dialog Component
const ParentInfoDialog = ({ student }: { student: User }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
        >
          <Users className="w-4 h-4 mr-1" />
          Эцэг эх
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Эцэг эхийн мэдээлэл
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center pb-4 border-b">
            <h3 className="font-semibold text-lg">
              {student.firstname} {student.lastname}
            </h3>
            <p className="text-sm text-slate-600">-ийн эцэг эхийн мэдээлэл</p>
          </div>

          {student.parents && student.parents.length > 0 ? (
            <div className="space-y-3">
              {student.parents.map((parent, index) => (
                <div
                  key={parent.id || index}
                  className="bg-slate-50 rounded-lg p-4 space-y-3"
                >
                  <div className="border-b pb-2 mb-3">
                    {/* <p className="font-medium text-lg">
                      {parent.firstName} {parent.lastName} 
                    </p> */}
                    <p className="text-sm text-blue-600 font-medium">
                      {parent.relationship || "Эцэг/Эх"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {/* Email */}
                    {parent.email && parent.email.trim() !== "" ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm font-medium text-slate-600">
                            И-мэйл:
                          </span>
                        </div>
                        <Button
                          onClick={() =>
                            (window.location.href = `mailto:${parent.email}`)
                          }
                          size="sm"
                          variant="outline"
                          className="text-xs hover:bg-emerald-50 hover:border-emerald-300"
                        >
                          {parent.email}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-slate-300" />
                        <span className="text-sm text-slate-400">
                          И-мэйл бүртгэгдээгүй
                        </span>
                      </div>
                    )}

                    {/* Phone Numbers */}
                    {parent.phoneNumber1 && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-slate-600">
                            Утас 1:
                          </span>
                        </div>
                        <Button
                          onClick={() =>
                            (window.location.href = `tel:${parent.phoneNumber1}`)
                          }
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-xs"
                        >
                          {parent.phoneNumber1}
                        </Button>
                      </div>
                    )}

                    {parent.phoneNumber2 && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-slate-600">
                            Утас 2:
                          </span>
                        </div>
                        <Button
                          onClick={() =>
                            (window.location.href = `tel:${parent.phoneNumber2}`)
                          }
                          size="sm"
                          variant="outline"
                          className="text-xs hover:bg-blue-50 hover:border-blue-300"
                        >
                          {parent.phoneNumber2}
                        </Button>
                      </div>
                    )}

                    {!parent.phoneNumber1 && !parent.phoneNumber2 && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-slate-300" />
                        <span className="text-sm text-slate-400">
                          Утас бүртгэгдээгүй
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="font-medium">Эцэг эхийн мэдээлэл бүртгэгдээгүй</p>
              <p className="text-sm">Эцэг эхийн мэдээллийг нэмэх хэрэгтэй</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function Page() {
  const params = useParams();
  const gradeGroupId = params.gradeGroupId as string;

  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingStudent, setEditingStudent] = useState<User | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<User | null>(null);

  const { schoolId, teacherId } = useAuthStore()

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
        sex: s.sex || "", // Added gender mapping
        parents: s.parents || [],
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
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.contact.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  // Handle adding new student
  const handleAddStudent = async (studentData: any) => {
    try {
      const payload = {
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        email: studentData.email,
        phoneNumber: studentData.phoneNumber,
        emergencyNumber: studentData.parents?.[0]?.phoneNumber1 || "",
        gender: studentData.gender || "", // Added gender to payload
        teacherId: teacherId,
        schoolId: schoolId,
        gradeGroupId: gradeGroupId,
        parents: studentData.parents || [],
      };

      const response = await fetch(
        `${BASE_URL}/students/${schoolId}/${teacherId}/${gradeGroupId}/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

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
        gender: studentData.gender || "", // Added gender to payload
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
    fetchStudents();
  };

  // Calculate gender statistics
  const maleCount = data.filter((s) => {
    const gender = s.sex?.toLowerCase();
    return gender === "male" || gender === "эр" || gender === "м";
  }).length;

  const femaleCount = data.filter((s) => {
    const gender = s.sex?.toLowerCase();
    return gender === "female" || gender === "эм" || gender === "ж";
  }).length;
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
        <Card className="bg-gradient-to-r from-slate-100 via-blue-50 to-indigo-100 border border-white/60 shadow-lg mb-6">
          <CardHeader className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-500/70 to-indigo-500/80 rounded-xl backdrop-blur-sm shadow-md">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
                    Ангийн сурагчдын жагсаалт
                  </h1>
                  <p className="text-slate-600 text-lg">
                    Сурагчдын бүрэн мэдээлэл болон холбоо барих хэсэг
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <AddStudentDialog
                  onSubmitAction={handleAddStudent}
                  gradeGroupId={gradeGroupId}
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      Нийт сурагч
                    </p>
                    <p className="text-xl font-bold text-slate-800">
                      {data.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      Эрэгтэй
                    </p>
                    <p className="text-xl font-bold text-blue-600">
                      {maleCount}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      Эмэгтэй
                    </p>
                    <p className="text-xl font-bold text-pink-600">
                      {femaleCount}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">И-мэйл бүхий</p>
                    <p className="text-xl font-bold text-slate-800">
                      {data.filter((s) => s.email && s.email.trim() !== "").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            {/* <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Утас бүхий</p>
                    <p className="text-xl font-bold text-slate-800">
                      {data.filter((s) => s.contact && s.contact.trim() !== "").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                    <UserCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      Эцэг эх бүхий
                    </p>
                    <p className="text-xl font-bold text-slate-800">
                      {
                        data.filter((s) => s.parents && s.parents.length > 0)
                          .length
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search Bar */}
        {!isLoading && !error && data.length > 0 && (
          <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg mb-6">
            <CardContent className="p-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Сурагчийн нэр, и-мэйл эсвэл утасны дугаараар хайх..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/80 border-white/60 focus:border-blue-300 focus:ring-blue-200"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Table Content */}
        <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-xl">
          <CardContent className="p-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  Уншиж байна...
                </h3>
                <p className="text-slate-500">
                  Сурагчдын мэдээллийг татаж байна
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-500 text-xl">⚠️</span>
                </div>
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  Алдаа гарлаа
                </h3>
                <p className="text-red-500 mb-4">{error}</p>
                <Button
                  onClick={handleRetry}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Дахин оролдох
                </Button>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  {searchTerm ? "Хайлтын үр дүн олдсонгүй" : "Сурагч олдсонгүй"}
                </h3>
                <p className="text-slate-500">
                  {searchTerm
                    ? "Өөр түлхүүр үгээр хайж үзнэ үү"
                    : "Энэ ангид сурагч бүртгэгдээгүй байна"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/80">
                      <TableHead className="w-16 text-center font-semibold">
                        №
                      </TableHead>
                      <TableHead className="w-20 text-center font-semibold">
                        Зураг
                      </TableHead>
                      <TableHead className="font-semibold">Овог нэр</TableHead>
                      <TableHead className="font-semibold">Хүйс</TableHead>
                      <TableHead className="font-semibold">
                        Утасны дугаар
                      </TableHead>
                      <TableHead className="font-semibold">И-мэйл</TableHead>
                      <TableHead className="font-semibold">
                        Эцэг эхийн мэдээлэл
                      </TableHead>
                      <TableHead className="w-32 text-center font-semibold">
                        Тохиргоо
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((student, index) => (
                      <TableRow
                        key={student.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <TableCell className="text-center font-medium text-slate-600">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            <div className="w-10 h-10 relative">
                              {student.img ? (
                                <Image
                                  src={student.img}
                                  alt={`${student.firstname}-profile`}
                                  width={40}
                                  height={40}
                                  className="object-cover rounded-full border-2 border-white shadow-sm"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 rounded-full text-slate-500">
                                  <Users className="w-5 h-5" />
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="font-medium text-slate-800">
                            {student.firstname} {student.lastname}
                          </div>
                        </TableCell>
                        <TableCell>
                          <GenderBadge gender={student.sex} />
                        </TableCell>
                        <TableCell>
                          {student.contact && student.contact.trim() !== "" ? (
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-blue-500" />
                              <span className="text-slate-700">
                                {student.contact}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-400 italic">
                              Бүртгэгдээгүй
                            </span>
                          )}
                        </TableCell>

                        <TableCell>
                          {student.email && student.email.trim() !== "" ? (
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-emerald-500" />
                              <span className="text-slate-700 truncate max-w-48">
                                {student.email}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-400 italic">
                              Бүртгэгдээгүй
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <ParentInfoDialog student={student} />
                            {student.parents && student.parents.length > 0 ? (
                              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                {student.parents.length} эцэг эх
                              </span>
                            ) : (
                              <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
                                Бүртгэгдээгүй
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex space-x-1">
                            <Button
                              onClick={() => setEditingStudent(student)}
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-300"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => setDeletingStudent(student)}
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-300 text-red-600"
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

        {/* Edit Student Dialog */}
        {editingStudent && (
          <EditStudentDialog
            student={editingStudent}
            onSubmitAction={handleEditStudent}
            onCloseAction={() => setEditingStudent(null)}
            gradeGroupId={gradeGroupId}
          />
        )}

        {/* Delete Student Dialog */}
        {deletingStudent && (
          <DeleteStudentDialog
            student={deletingStudent}
            onConfirmAction={() => handleDeleteStudent(deletingStudent.id)}
            onCloseAction={() => setDeletingStudent(null)}
          />
        )}
      </div>
    </div>
  );
}
