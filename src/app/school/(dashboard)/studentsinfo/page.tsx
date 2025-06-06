"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, GraduationCap, Mail, Phone, MapPin, Award, BookOpen, Clock, Users, Star, Search, Filter } from "lucide-react";
import React, { useState } from "react";

type Student = {
  id: number;
  name: string;
  grade: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  gpa: number;
  subjects: string[];
  achievements: string[];
  attendance: number;
  photo: string;
  parentName: string;
  parentPhone: string;
  enrollmentDate: string;
};

export default function Page() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("Бүгд");

  const students: Student[] = [
    {
      id: 1,
      name: "Батбаяр Болд",
      grade: "10-р анги",
      age: 16,
      email: "batbayar@email.com",
      phone: "99123456",
      address: "Улаанбаатар, Сүхбаатар дүүрэг",
      gpa: 4.2,
      subjects: ["Математик", "Физик", "Хими", "Биологи"],
      achievements: ["Математикийн олимпиад - 1-р байр", "Шилдэг сурагч"],
      attendance: 95,
      photo: "👨‍🎓",
      parentName: "Болд Баттөр",
      parentPhone: "99987654",
      enrollmentDate: "2020-09-01"
    },
    {
      id: 2,
      name: "Сарангэрэл Доржийн",
      grade: "11-р анги",
      age: 17,
      email: "sarangerel@email.com",
      phone: "99234567",
      address: "Улаанбаатар, Чингэлтэй дүүрэг",
      gpa: 4.5,
      subjects: ["Англи хэл", "Литератур", "Түүх", "Газарзүй"],
      achievements: ["Англи хэлний уралдаан - 2-р байр", "Эссэ бичлэгийн тэмцээн - 1-р байр"],
      attendance: 98,
      photo: "👩‍🎓",
      parentName: "Доржийн Цэцэг",
      parentPhone: "99876543",
      enrollmentDate: "2019-09-01"
    },
    {
      id: 3,
      name: "Энхбаяр Төмөр",
      grade: "9-р анги",
      age: 15,
      email: "enkhbayar@email.com",
      phone: "99345678",
      address: "Улаанбаатар, Баянгол дүүрэг",
      gpa: 3.8,
      subjects: ["Спорт", "Биологи", "Хими", "Математик"],
      achievements: ["Спортын тэмцээн - 1-р байр", "Хөл бөмбөгийн капитан"],
      attendance: 92,
      photo: "👨‍🎓",
      parentName: "Төмөр Оюунчимэг",
      parentPhone: "99765432",
      enrollmentDate: "2021-09-01"
    },
    {
      id: 4,
      name: "Ариунаа Гантүмүр",
      grade: "12-р анги",
      age: 18,
      email: "ariunaa@email.com",
      phone: "99456789",
      address: "Улаанбаатар, Хан-Уул дүүрэг",
      gpa: 4.7,
      subjects: ["Математик", "Физик", "Англи хэл", "Компьютер"],
      achievements: ["Шилдэг төгсөгч", "Компьютерийн программчлалын тэмцээн - 1-р байр"],
      attendance: 99,
      photo: "👩‍🎓",
      parentName: "Гантүмүр Батсайхан",
      parentPhone: "99654321",
      enrollmentDate: "2018-09-01"
    },
    {
      id: 5,
      name: "Мөнхбат Очир",
      grade: "10-р анги",
      age: 16,
      email: "munkhbat@email.com",
      phone: "99567890",
      address: "Улаанбаатар, Сонгинохайрхан дүүрэг",
      gpa: 3.9,
      subjects: ["Уран зураг", "Хөгжим", "Түүх", "Литератур"],
      achievements: ["Уран зургийн уралдаан - 2-р байр", "Хөгжмийн чуулга - Гишүүн"],
      attendance: 94,
      photo: "👨‍🎓",
      parentName: "Очир Цэцэгмаа",
      parentPhone: "99543210",
      enrollmentDate: "2020-09-01"
    },
    {
      id: 6,
      name: "Номинчулуун Бат",
      grade: "11-р анги",
      age: 17,
      email: "nominchimeg@email.com",
      phone: "99678901",
      address: "Улаанбаатар, Баянзүрх дүүрэг",
      gpa: 4.1,
      subjects: ["Хими", "Биологи", "Математик", "Физик"],
      achievements: ["Шинжлэх ухааны үзэсгэлэн - 1-р байр", "Химийн лабораторын туслах"],
      attendance: 96,
      photo: "👩‍🎓",
      parentName: "Бат Сарантуяа",
      parentPhone: "99432109",
      enrollmentDate: "2019-09-01"
    }
  ];

  const grades = ["Бүгд", "9-р анги", "10-р анги", "11-р анги", "12-р анги"];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === "Бүгд" || student.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const getGPAColor = (gpa: number) => {
    if (gpa >= 4.5) return "from-green-400 to-emerald-500";
    if (gpa >= 4.0) return "from-blue-400 to-cyan-500";
    if (gpa >= 3.5) return "from-yellow-400 to-orange-500";
    return "from-red-400 to-pink-500";
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 95) return "text-green-600";
    if (attendance >= 90) return "text-blue-600";
    if (attendance >= 85) return "text-yellow-600";
    return "text-red-600";
  };

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
        {/* Header Card */}
        <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-3xl font-bold leading-8 text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text p-8 flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              Сурагчдын мэдээлэл
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Search and Filter Section */}
        <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Сурагчийн нэрээр хайх..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Grade Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-slate-500" />
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Нийт сурагчид</p>
                  <p className="text-3xl font-bold">{filteredStudents.length}</p>
                </div>
                <Users className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Дундаж дүн</p>
                  <p className="text-3xl font-bold">
                    {(filteredStudents.reduce((acc, s) => acc + s.gpa, 0) / filteredStudents.length).toFixed(1)}
                  </p>
                </div>
                <Star className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Дундаж ирц</p>
                  <p className="text-3xl font-bold">
                    {Math.round(filteredStudents.reduce((acc, s) => acc + s.attendance, 0) / filteredStudents.length)}%
                  </p>
                </div>
                <Clock className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Шагнал</p>
                  <p className="text-3xl font-bold">
                    {filteredStudents.reduce((acc, s) => acc + s.achievements.length, 0)}
                  </p>
                </div>
                <Award className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Card 
              key={student.id}
              className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedStudent(student)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{student.photo}</div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-slate-800">
                      {student.name}
                    </CardTitle>
                    <p className="text-slate-600 text-sm">{student.grade}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getGPAColor(student.gpa)} text-white text-sm font-semibold`}>
                    {student.gpa}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-sm">{student.subjects.length} хичээл</span>
                    <span className={`text-sm font-semibold ${getAttendanceColor(student.attendance)}`}>
                      • {student.attendance}% ирц
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Award className="h-4 w-4" />
                    <span className="text-sm">{student.achievements.length} шагнал</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm truncate">{student.email}</span>
                  </div>
                  <div className="text-xs text-slate-500 bg-slate-50/80 px-3 py-2 rounded-lg">
                    📍 {student.address}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Student Detail Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="bg-white/95 backdrop-blur-lg border-white/50 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{selectedStudent.photo}</div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-slate-800">
                        {selectedStudent.name}
                      </CardTitle>
                      <p className="text-slate-600">{selectedStudent.grade} • {selectedStudent.age} нас</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="text-slate-400 hover:text-slate-600 text-3xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Хувийн мэдээлэл</h3>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-blue-700 mb-2">
                        <Mail className="h-5 w-5" />
                        <span className="font-semibold">И-мэйл</span>
                      </div>
                      <p className="text-blue-600">{selectedStudent.email}</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-green-700 mb-2">
                        <Phone className="h-5 w-5" />
                        <span className="font-semibold">Утас</span>
                      </div>
                      <p className="text-green-600">{selectedStudent.phone}</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-purple-700 mb-2">
                        <MapPin className="h-5 w-5" />
                        <span className="font-semibold">Хаяг</span>
                      </div>
                      <p className="text-purple-600">{selectedStudent.address}</p>
                    </div>
                  </div>

                  {/* Academic Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Сургуулийн мэдээлэл</h3>
                    
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-orange-700 mb-2">
                        <Star className="h-5 w-5" />
                        <span className="font-semibold">Дундаж дүн</span>
                      </div>
                      <p className="text-orange-600 text-2xl font-bold">{selectedStudent.gpa}</p>
                    </div>

                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-cyan-700 mb-2">
                        <Clock className="h-5 w-5" />
                        <span className="font-semibold">Ирц</span>
                      </div>
                      <p className="text-cyan-600 text-2xl font-bold">{selectedStudent.attendance}%</p>
                    </div>

                    <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-rose-700 mb-2">
                        <Calendar className="h-5 w-5" />
                        <span className="font-semibold">Элссэн огноо</span>
                      </div>
                      <p className="text-rose-600">{selectedStudent.enrollmentDate}</p>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">Хичээлүүд</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.subjects.map((subject, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">Амжилт, шагнал</h3>
                    <div className="space-y-2">
                      {selectedStudent.achievements.map((achievement, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg"
                        >
                          <Award className="h-5 w-5 text-yellow-600" />
                          <span className="text-yellow-700 font-medium">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Parent Info */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">Эцэг эхийн мэдээлэл</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-teal-700 mb-2">
                          <User className="h-5 w-5" />
                          <span className="font-semibold">Эцэг/эх</span>
                        </div>
                        <p className="text-teal-600">{selectedStudent.parentName}</p>
                      </div>
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-emerald-700 mb-2">
                          <Phone className="h-5 w-5" />
                          <span className="font-semibold">Утас</span>
                        </div>
                        <p className="text-emerald-600">{selectedStudent.parentPhone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedStudent(null)}
                  className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Хаах
                </button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}