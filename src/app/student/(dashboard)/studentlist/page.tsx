"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  Users,
  Search,
  UserCheck,
} from "lucide-react";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePhoto: string | null;
  grade: { gradeNumber: string };
  group: { groupName: string };
}

interface ClassInfo {
  grade: { gradeNumber: string };
  group: { groupName: string };
  teacher: { firstName: string; lastName: string };
}

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "ghost";
}

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

// Mock data for demonstration
const mockStudents = [
  {
    id: "1",
    firstName: "Батбаяр",
    lastName: "Оргил",
    email: "batbayar@example.com",
    phoneNumber: "99887766",
    profilePhoto: null,
    grade: { gradeNumber: "10" },
    group: { groupName: "А" },
  },
  {
    id: "2",
    firstName: "Сарангэрэл",
    lastName: "Энхбат",
    email: "sarangerel@example.com",
    phoneNumber: "88776655",
    profilePhoto: null,
    grade: { gradeNumber: "10" },
    group: { groupName: "А" },
  },
  {
    id: "3",
    firstName: "Мөнхбат",
    lastName: "Дорж",
    email: "munkhbat@example.com",
    phoneNumber: "77665544",
    profilePhoto: null,
    grade: { gradeNumber: "10" },
    group: { groupName: "А" },
  },
  {
    id: "4",
    firstName: "Одгэрэл",
    lastName: "Батсайхан",
    email: "odgerel@example.com",
    phoneNumber: "66554433",
    profilePhoto: null,
    grade: { gradeNumber: "10" },
    group: { groupName: "А" },
  },
  {
    id: "5",
    firstName: "Болормаа",
    lastName: "Цэндсүрэн",
    email: "bolormaa@example.com",
    phoneNumber: "55443322",
    profilePhoto: null,
    grade: { gradeNumber: "10" },
    group: { groupName: "А" },
  },
  {
    id: "6",
    firstName: "Гантөмөр",
    lastName: "Баяртөгс",
    email: "gantumur@example.com",
    phoneNumber: "44332211",
    profilePhoto: null,
    grade: { gradeNumber: "10" },
    group: { groupName: "А" },
  },
];

const mockClassInfo = {
  grade: { gradeNumber: "10" },
  group: { groupName: "А" },
  teacher: { firstName: "Баярмаа", lastName: "Цэндсүрэн" },
};

// Animation component
const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};

// Card components
const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CardHeader: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardContent: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

// Button component
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  size = "default",
  variant = "default",
}) => {
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
  };

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Input component
const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  className = "",
}) => (
  <input
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  />
);

export default function StudentList() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [classInfo, setClassInfo] = useState<ClassInfo | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setStudents(mockStudents);
      setClassInfo(mockClassInfo);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredData = students.filter(
    (student) =>
      `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGradeDisplayName = () => {
    if (classInfo) {
      return `${classInfo.grade.gradeNumber} ${classInfo.group.groupName}`;
    }
    return "";
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setStudents(mockStudents);
      setClassInfo(mockClassInfo);
      setLoading(false);
    }, 1000);
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
                      Сурагчдын мэдээлэл болон холбоо барих хэсэг
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </AnimatedCard>

        {/* Search Bar */}
        {!loading && !error && students.length > 0 && (
          <AnimatedCard delay={150}>
            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg my-8 pt-8">
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
          <div className="p-8">
            {loading ? (
              <Card>
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
              </Card>
            ) : error ? (
              <Card>
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
              </Card>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">
                  {searchTerm ? "Хайлтын үр дүн олдсонгүй" : "Сурагч олдсонгүй"}
                </h3>
                <p className="text-slate-500">
                  {searchTerm
                    ? "Өөр түлхүүр үгээр хайж үзнэ үү"
                    : "Энэ ангид сурагч бүртгэгдээгүй байна"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
                {filteredData.map((student, index) => (
                  <AnimatedCard key={student.id} delay={250 + index * 50}>
                    <Card className="group hover:shadow-2xl transition-all duration-500 rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm hover:bg-white/90 transform hover:-translate-y-2 pt-6">
                      <CardContent className="flex flex-col items-center p-6 relative">
                        <div className="w-24 h-24 relative mb-4 group-hover:scale-110 transition-transform duration-300">
                          {student.profilePhoto ? (
                            <img
                              src={student.profilePhoto || "/placeholder.svg"}
                              alt={`${student.firstName}-profile`}
                              width={96}
                              height={96}
                              className="object-cover rounded-full border-4 border-white shadow-lg w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 rounded-full text-slate-500 shadow-lg">
                              <Users className="w-8 h-8" />
                            </div>
                          )}
                        </div>

                        <div className="text-center mb-4">
                          <h3 className="text-lg font-bold text-slate-800 mb-1">
                            {student.firstName} {student.lastName}
                          </h3>
                        </div>

                        <div className="space-y-3 w-full text-sm">
                          {student.phoneNumber &&
                            student.phoneNumber.trim() !== "" && (
                              <div className="flex items-center space-x-2 text-slate-600 bg-slate-50/70 rounded-lg p-2">
                                <Phone className="w-4 h-4 text-blue-500" />
                                <span className="truncate">
                                  {student.phoneNumber}
                                </span>
                              </div>
                            )}

                          {student.email && student.email.trim() !== "" && (
                            <div className="flex items-center space-x-2 text-slate-600 bg-slate-50/70 rounded-lg p-2">
                              <Mail className="w-4 h-4 text-emerald-500" />
                              <span className="truncate">{student.email}</span>
                            </div>
                          )}

                          <div className="mt-4">
                            <Button
                              onClick={() =>
                                console.log(`Чат бичих: ${student.firstName}`)
                              }
                              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                              size="sm"
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Чат бичих
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedCard>
                ))}
              </div>
            )}
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}
