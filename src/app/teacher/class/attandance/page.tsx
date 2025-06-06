"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, Loader2, Users, UserPlus, Trash2 } from "lucide-react";

// Types
interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  grade: string;
  studentId: string;
}

interface AttendanceRecord {
  [studentId: string]: {
    [date: string]: string;
  };
}

interface NewStudentForm {
  firstName: string;
  lastName: string;
  grade: string;
}

// Mock data for students
const mockStudents: Student[] = [
  {
    _id: "1",
    firstName: "Бат",
    lastName: "Болд",
    grade: "10А",
    studentId: "2024001",
  },
  {
    _id: "2",
    firstName: "Сайхан",
    lastName: "Төмөр",
    grade: "10А",
    studentId: "2024002",
  },
  {
    _id: "3",
    firstName: "Цэцэг",
    lastName: "Дорж",
    grade: "10А",
    studentId: "2024003",
  },
  {
    _id: "4",
    firstName: "Энхбаяр",
    lastName: "Гантулга",
    grade: "10А",
    studentId: "2024004",
  },
  {
    _id: "5",
    firstName: "Оюунчимэг",
    lastName: "Батбаяр",
    grade: "10А",
    studentId: "2024005",
  },
  {
    _id: "6",
    firstName: "Мөнхбат",
    lastName: "Цэрэнбат",
    grade: "10А",
    studentId: "2024006",
  },
  {
    _id: "7",
    firstName: "Номин",
    lastName: "Баярсайхан",
    grade: "10А",
    studentId: "2024007",
  },
  {
    _id: "8",
    firstName: "Ганбаатар",
    lastName: "Жамьянсүрэн",
    grade: "10А",
    studentId: "2024008",
  },
];

// Custom hooks simulation
const useStudents = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const addStudent = (student: Omit<Student, "_id" | "studentId">) => {
    const newStudent: Student = {
      ...student,
      _id: Date.now().toString(),
      studentId: `2024${String(students.length + 1).padStart(3, "0")}`,
    };
    setStudents((prev) => [...prev, newStudent]);
  };

  const removeStudent = (studentId: string) => {
    setStudents((prev) => prev.filter((s) => s._id !== studentId));
  };

  return { students, loading, error, addStudent, removeStudent };
};

const useAttendance = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  const fetchAttendance = async (year: string, semester: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const saveAttendance = async (
    year: string,
    semester: string,
    data: AttendanceRecord
  ) => {
    setSaving(true);
    // Simulate API call
    return new Promise<{ success: boolean; message?: string; error?: string }>(
      (resolve) => {
        setTimeout(() => {
          setSaving(false);
          resolve({ success: true, message: "Ирц амжилттай хадгалагдлаа!" });
        }, 1000);
      }
    );
  };

  return {
    attendanceData,
    loading,
    error,
    saving,
    fetchAttendance,
    saveAttendance,
    setAttendanceData,
  };
};

export default function AttendanceTracker() {
  const [selectedYear, setSelectedYear] = useState<string>("2024-2025");
  const [selectedSemester, setSelectedSemester] = useState<string>("1");
  const [workingDays, setWorkingDays] = useState<number>(0);
  const [dates, setDates] = useState<string[][]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [newStudentForm, setNewStudentForm] = useState<NewStudentForm>({
    firstName: "",
    lastName: "",
    grade: "10А",
  });
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Use custom hooks
  const {
    students,
    loading: studentsLoading,
    error: studentsError,
    addStudent,
    removeStudent,
  } = useStudents();

  const {
    attendanceData,
    loading: attendanceLoading,
    error: attendanceError,
    saving,
    fetchAttendance,
    saveAttendance,
    setAttendanceData,
  } = useAttendance();

  // Academic years and semesters
  const academicYears = ["2023-2024", "2024-2025", "2025-2026"];
  const semesters = [
    { id: "1", name: "1-р улирал" },
    { id: "2", name: "2-р улирал" },
    { id: "3", name: "3-р улирал" },
    { id: "4", name: "4-р улирал" },
  ];

  const semesterMonths: Record<
    string,
    Array<{ name: string; number: number }>
  > = {
    "1": [
      { name: "9-р сар", number: 9 },
      { name: "10-р сар", number: 10 },
      { name: "11-р сар", number: 11 },
    ],
    "2": [
      { name: "12-р сар", number: 12 },
      { name: "1-р сар", number: 1 },
      { name: "2-р сар", number: 2 },
    ],
    "3": [
      { name: "3-р сар", number: 3 },
      { name: "4-р сар", number: 4 },
      { name: "5-р сар", number: 5 },
    ],
    "4": [
      { name: "6-р сар", number: 6 },
      { name: "7-р сар", number: 7 },
      { name: "8-р сар", number: 8 },
    ],
  };

  const attendanceStatus = [
    { value: "present", label: "Ирсэн", color: "bg-green-500", points: 1.0 },
    { value: "sick", label: "Өвчтэй", color: "bg-yellow-500", points: 0.8 },
    { value: "excused", label: "Чөлөөтэй", color: "bg-blue-500", points: 0.5 },
    { value: "absent", label: "Тасалсан", color: "bg-red-500", points: 0.0 },
  ];

  // Load attendance data when year/semester changes
  useEffect(() => {
    const loadData = async () => {
      await fetchAttendance(selectedYear, selectedSemester);
    };

    if (selectedYear && selectedSemester) {
      loadData();
    }
  }, [selectedYear, selectedSemester]);

  // Generate dates and initialize attendance data
  useEffect(() => {
    const year = parseInt(selectedYear.split("-")[0]);
    const monthsData = semesterMonths[selectedSemester];
    const allDates: string[][] = [];
    let totalWorkingDays = 0;

    monthsData.forEach((month) => {
      const adjustedYear =
        month.number < 9 && selectedSemester !== "1" ? year + 1 : year;
      const daysInMonth = new Date(adjustedYear, month.number, 0).getDate();

      const monthDates: string[] = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(adjustedYear, month.number - 1, day);
        if (date.getDay() !== 0 && date.getDay() !== 6) {
          monthDates.push(
            `${adjustedYear}-${month.number.toString().padStart(2, "0")}-${day
              .toString()
              .padStart(2, "0")}`
          );
          totalWorkingDays++;
        }
      }
      allDates.push(monthDates);
    });

    setDates(allDates);
    setWorkingDays(totalWorkingDays);

    // Initialize attendance data
    if (students.length > 0) {
      const initialData: AttendanceRecord = {};
      students.forEach((student) => {
        if (!attendanceData[student._id]) {
          initialData[student._id] = {};
          allDates.flat().forEach((date) => {
            initialData[student._id][date] = "";
          });
        }
      });

      setAttendanceData((prev) => ({ ...prev, ...initialData }));
    }
  }, [selectedYear, selectedSemester, students]);

  // Handle attendance status change
  const handleAttendanceChange = (
    studentId: string,
    date: string,
    status: string
  ) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [date]: status === prev[studentId]?.[date] ? "" : status,
      },
    }));
  };

  // Save attendance data
  const handleSaveAttendance = async () => {
    const result = await saveAttendance(
      selectedYear,
      selectedSemester,
      attendanceData
    );

    setAlertType(result.success ? "success" : "error");
    setAlertMessage(result.success ? result.message || "" : result.error || "");
    setShowAlert(true);

    setTimeout(() => setShowAlert(false), 5000);
  };

  // Add new student
  const handleAddStudent = () => {
    if (newStudentForm.firstName && newStudentForm.lastName) {
      addStudent(newStudentForm);
      setNewStudentForm({ firstName: "", lastName: "", grade: "10А" });
      setShowAddForm(false);
      setAlertType("success");
      setAlertMessage("Сурагч амжилттай нэмэгдлээ!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  // Remove student
  const handleRemoveStudent = (studentId: string) => {
    removeStudent(studentId);
    setAttendanceData((prev) => {
      const newData = { ...prev };
      delete newData[studentId];
      return newData;
    });
    setAlertType("success");
    setAlertMessage("Сурагч амжилттай устгагдлаа!");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Calculate attendance summary
  const calculateSummary = (studentId: string) => {
    const summary = {
      present: 0,
      sick: 0,
      excused: 0,
      absent: 0,
      total: 0,
      score: 0,
      maxPossibleScore: workingDays,
      percentage: 0,
    };

    const studentData = attendanceData[studentId];
    if (!studentData) return summary;

    Object.values(studentData).forEach((status) => {
      if (status) {
        const statusKey = status as keyof typeof summary;
        if (
          typeof summary[statusKey] === "number" &&
          statusKey !== "total" &&
          statusKey !== "score" &&
          statusKey !== "maxPossibleScore" &&
          statusKey !== "percentage"
        ) {
          (summary[statusKey] as number)++;
        }
        summary.total++;
        const statusObj = attendanceStatus.find((s) => s.value === status);
        if (statusObj) {
          summary.score += statusObj.points;
        }
      }
    });

    if (summary.total > 0) {
      summary.percentage = Math.round((summary.score / summary.total) * 100);
    }

    return summary;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      weekday: ["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"][date.getDay()],
      fullDate: dateString,
    };
  };

  // Get grade based on percentage
  const getGrade = (percentage: number) => {
    if (percentage >= 95) return { grade: "A", color: "text-green-600" };
    if (percentage >= 90) return { grade: "A-", color: "text-green-500" };
    if (percentage >= 87) return { grade: "B+", color: "text-green-400" };
    if (percentage >= 83) return { grade: "B", color: "text-blue-500" };
    if (percentage >= 80) return { grade: "B-", color: "text-blue-400" };
    if (percentage >= 77) return { grade: "C+", color: "text-yellow-500" };
    if (percentage >= 73) return { grade: "C", color: "text-yellow-500" };
    if (percentage >= 70) return { grade: "C-", color: "text-yellow-400" };
    if (percentage >= 67) return { grade: "D+", color: "text-orange-500" };
    if (percentage >= 63) return { grade: "D", color: "text-orange-500" };
    if (percentage >= 60) return { grade: "D-", color: "text-orange-400" };
    return { grade: "F", color: "text-red-500" };
  };

  if (studentsLoading || attendanceLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Ачааллаж байна...</span>
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

      <div className="pt-8 px-4 md:px-10 pb-10 relative">
        {showAlert && (
          <Alert
            className={`mb-4 ${
              alertType === "success" ? "border-green-500" : "border-red-500"
            }`}
          >
            <AlertDescription
              className={
                alertType === "success" ? "text-green-700" : "text-red-700"
              }
            >
              {alertMessage}
            </AlertDescription>
          </Alert>
        )}

        {(studentsError || attendanceError) && (
          <Alert className="mb-4 border-red-500">
            <AlertDescription className="text-red-700">
              {studentsError || attendanceError}
            </AlertDescription>
          </Alert>
        )}

        {/* Student Management Card */}
        <Card className="w-full mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Сурагчдын жагсаалт ({students.length})
              </CardTitle>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Сурагч нэмэх
              </Button>
            </div>

            {showAddForm && (
              <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Нэр</Label>
                    <input
                      type="text"
                      value={newStudentForm.firstName}
                      onChange={(e) =>
                        setNewStudentForm((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                      placeholder="Нэр"
                    />
                  </div>
                  <div>
                    <Label>Овог</Label>
                    <input
                      type="text"
                      value={newStudentForm.lastName}
                      onChange={(e) =>
                        setNewStudentForm((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                      placeholder="Овог"
                    />
                  </div>
                  <div>
                    <Label>Анги</Label>
                    <select
                      value={newStudentForm.grade}
                      onChange={(e) =>
                        setNewStudentForm((prev) => ({
                          ...prev,
                          grade: e.target.value,
                        }))
                      }
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                    >
                      <option value="10А">10А</option>
                      <option value="10Б">10Б</option>
                      <option value="11А">11А</option>
                      <option value="11Б">11Б</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAddStudent} className="w-full">
                      Нэмэх
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map((student) => (
                <div
                  key={student._id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-white"
                >
                  <div>
                    <div className="font-medium">
                      {student.firstName} {student.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {student.grade} • {student.studentId}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleRemoveStudent(student._id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Tracking Card */}
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold flex items-center">
                <Users className="mr-2 h-6 w-6" />
                Ирц бүртгэл
              </CardTitle>
              <Button
                onClick={handleSaveAttendance}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700"
              >
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Хадгалах
              </Button>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="year">Хичээлийн жил</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Жил сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    {academicYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="semester">Улирал</Label>
                <Select
                  value={selectedSemester}
                  onValueChange={setSelectedSemester}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Улирал сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((semester) => (
                      <SelectItem key={semester.id} value={semester.id}>
                        {semester.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              {attendanceStatus.map((status) => (
                <div key={status.value} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${status.color}`}></div>
                  <span className="text-sm">{status.label}</span>
                </div>
              ))}
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2 bg-gray-100 sticky left-0 z-10">
                      Сурагч
                    </th>
                    {dates.map((monthDates) =>
                      monthDates.map((date) => {
                        const formatted = formatDate(date);
                        return (
                          <th
                            key={date}
                            className="border p-1 text-xs bg-gray-100 min-w-[40px]"
                          >
                            <div className="text-center">
                              <div>{formatted.day}</div>
                              <div className="text-xs text-gray-500">
                                {formatted.weekday}
                              </div>
                            </div>
                          </th>
                        );
                      })
                    )}
                    <th className="border p-2 bg-gray-100">Дүн</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    const summary = calculateSummary(student._id);
                    const grade = getGrade(summary.percentage);

                    return (
                      <tr key={student._id}>
                        <td className="border p-2 sticky left-0 bg-white z-10 font-medium">
                          <div>
                            <div>
                              {student.firstName} {student.lastName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {student.grade}
                            </div>
                          </div>
                        </td>
                        {dates.flat().map((date) => (
                          <td key={date} className="border p-1 text-center">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex flex-wrap gap-1 justify-center">
                                    {attendanceStatus.map((status) => (
                                      <button
                                        key={status.value}
                                        onClick={() =>
                                          handleAttendanceChange(
                                            student._id,
                                            date,
                                            status.value
                                          )
                                        }
                                        className={`w-6 h-6 rounded border-2 transition-colors ${
                                          attendanceData[student._id]?.[
                                            date
                                          ] === status.value
                                            ? `${status.color} border-gray-800`
                                            : "bg-gray-200 border-gray-300 hover:bg-gray-300"
                                        }`}
                                        title={status.label}
                                      />
                                    ))}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{formatDate(date).fullDate}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </td>
                        ))}
                        <td className="border p-2 text-center">
                          <div className="space-y-1">
                            <Badge
                              className={`${grade.color} bg-transparent border`}
                            >
                              {grade.grade}
                            </Badge>
                            <div className="text-sm">{summary.percentage}%</div>
                            <div className="text-xs text-gray-500">
                              {summary.present}/{summary.total}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
