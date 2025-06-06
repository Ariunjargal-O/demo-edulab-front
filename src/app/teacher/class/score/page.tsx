"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Save } from "lucide-react";
import { GradeSettings } from "./components/grade-settings";
import { calculateTotalScore } from "./components/grade-utils";
import { EditGradesDialog } from "./components/edit-grades-dialog";
import { SortMenu } from "./components/sort-menu";
import {
  sortStudentsByScore,
  sortStudentsByName,
} from "./components/grade-utils";

export default function GradeManagementSystem() {
  const [academicYear, setAcademicYear] = useState("2024-2025");
  const [semester, setSemester] = useState("1");
  const [viewMode, setViewMode] = useState("semester"); // "semester" or "yearEnd"
  interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    grades: {
      [key: string]: {
        attendance: number;
        activity: number;
        midterm: number;
        final: number;
      };
    };
  }

  const [students, setStudents] = useState<Student[]>([]);
  const [gradeComponents, setGradeComponents] = useState({
    attendance: { name: "Ирц", weight: 10 },
    activity: { name: "Идэвхи", weight: 10 },
    midterm: { name: "Явцын шалгалт", weight: 30 },
    final: { name: "Улирлын шалгалт", weight: 40 },
    total: { name: "Нийт дүн", weight: 100 },
  });
  const [editingSettings, setEditingSettings] = useState(false);
  const [yearlyAverages, setYearlyAverages] = useState<{
    [key: number]: number;
  }>({});

  const [sortCriteria, setSortCriteria] = useState("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate fetching data based on academic year and semester
    const fetchData = async () => {
      // This would be an API call in a real application
      const mockStudents = [
        {
          id: 1,
          firstName: "Энхболд",
          lastName: "Бат-Эрдэнэ",
          email: "batbold.enkh@mailer.mn",
          grades: {
            "1": { attendance: 8, activity: 7, midterm: 25, final: 35 },
            "2": { attendance: 9, activity: 8, midterm: 27, final: 36 },
            "3": { attendance: 7, activity: 9, midterm: 26, final: 38 },
            "4": { attendance: 10, activity: 10, midterm: 28, final: 39 },
          },
        },
        {
          id: 2,
          firstName: "Тэмүүжин",
          lastName: "Сарангэрэл",
          email: "temuujin.saran@inbox.mn",
          grades: {
            "1": { attendance: 10, activity: 9, midterm: 28, final: 38 },
            "2": { attendance: 9, activity: 10, midterm: 29, final: 39 },
            "3": { attendance: 10, activity: 8, midterm: 27, final: 37 },
            "4": { attendance: 8, activity: 9, midterm: 26, final: 36 },
          },
        },
        {
          id: 3,
          firstName: "Батсүх",
          lastName: "Мөнхцэцэг",
          email: "munkhtsetseg.batsukh@gmail.com",
          grades: {
            "1": { attendance: 7, activity: 8, midterm: 22, final: 32 },
            "2": { attendance: 8, activity: 7, midterm: 24, final: 34 },
            "3": { attendance: 9, activity: 9, midterm: 26, final: 36 },
            "4": { attendance: 10, activity: 8, midterm: 28, final: 38 },
          },
        },
        {
          id: 4,
          firstName: "Жавхлан",
          lastName: "Нарантуяа",
          email: "javkhlan.narantuya@yahoo.com",
          grades: {
            "1": { attendance: 9, activity: 10, midterm: 29, final: 39 },
            "2": { attendance: 10, activity: 9, midterm: 28, final: 38 },
            "3": { attendance: 8, activity: 8, midterm: 25, final: 35 },
            "4": { attendance: 9, activity: 9, midterm: 27, final: 37 },
          },
          
        },
        {
          id: 5,
          firstName: "Ганболд",
          lastName: "Төгөлдөр",
          email: "tuguldur.ganbold@outlook.com",
          grades: {
            "1": { attendance: 10, activity: 10, midterm: 29, final: 39 },
            "2": { attendance: 7, activity: 6, midterm: 26, final: 38 },
            "3": { attendance: 8, activity: 7, midterm: 30, final: 30 },
            "4": { attendance: 9, activity: 9, midterm: 27, final: 33 },
          },
          
        },
        {
          id: 6,
          firstName: "Сүхбат",
          lastName: "Уянга",
          email: "suhee@gmail.com",
          grades: {
            "1": { attendance: 5, activity: 10, midterm: 29, final: 31 },
            "2": { attendance: 9, activity: 9, midterm: 25, final: 38 },
            "3": { attendance: 7, activity: 8, midterm: 20, final: 35 },
            "4": { attendance: 9, activity: 6, midterm: 27, final: 40 },
          },
          
        },
      ];

      setStudents(mockStudents);

      // Calculate yearly averages
      const averages: { [key: number]: number } = {};
      mockStudents.forEach((student) => {
        const semesterTotals = Object.keys(student.grades).map((sem) => {
          const grades = student.grades[sem as keyof typeof student.grades];
          return calculateTotalScore(grades, gradeComponents);
        });

        const yearlyAverage =
          semesterTotals.reduce((sum, total) => sum + total, 0) /
          semesterTotals.length;
        averages[student.id] = yearlyAverage;
      });

      setYearlyAverages(averages);
    };

    fetchData();
  }, [academicYear, semester, gradeComponents]);

  interface GradeChange {
    studentId: number;
    field: keyof Student["grades"][string];
    value: string;
  }

  const handleGradeChange = ({ studentId, field, value }: GradeChange) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              grades: {
                ...student.grades,
                [semester]: {
                  ...student.grades[semester],
                  [field]: Number.parseInt(value) || 0,
                },
              },
            }
          : student
      )
    );
  };

  const handleSaveGrades = async () => {
    // In a real app, this would send the data to your backend
    console.log("Saving grades to database:", students);
    // API call would go here
    alert("Grades saved successfully!");
  };

  interface GradeComponentSettings {
    attendance: { name: string; weight: number };
    activity: { name: string; weight: number };
    midterm: { name: string; weight: number };
    final: { name: string; weight: number };
    total: { name: string; weight: number };
  }

  const handleComponentSettingsChange = (
    newSettings: GradeComponentSettings
  ) => {
    setGradeComponents(newSettings);
    setEditingSettings(false);
  };

  const handleSort = (criteria: string, order: "asc" | "desc") => {
    setSortCriteria(criteria);
    setSortOrder(order);

    if (criteria === "score") {
      setStudents(
        sortStudentsByScore(
          students,
          semester,
          gradeComponents,
          yearlyAverages,
          viewMode,
          order
        )
      );
    } else if (criteria === "name") {
      setStudents(sortStudentsByName(students, order));
    }
  };

  const handleEditGrades = (studentId: number) => {
    setEditingStudentId(studentId);
  };

  const handleCloseEditDialog = () => {
    setEditingStudentId(null);
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

      <div className="pt-8 px-4 md:px-10 pb-10 relative flex flex-col gap-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              🧑‍🎓 Ангийн сурагчдыг дүнгийн жагсаалт
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold leading-8">
              Тохиргоо хийх хэсэг
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 ">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Хичээлийн жил
                </label>
                <Select value={academicYear} onValueChange={setAcademicYear}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Хичээлийн жил сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023-2024" className="cursor-pointer">
                      2023-2024
                    </SelectItem>
                    <SelectItem value="2024-2025" className="cursor-pointer">
                      2024-2025
                    </SelectItem>
                    <SelectItem value="2025-2026" className="cursor-pointer">
                      2025-2026
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Харах горим
                </label>
                <Select value={viewMode} onValueChange={setViewMode}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Горим сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semester" className="cursor-pointer">
                      Улирлын дүн
                    </SelectItem>
                    <SelectItem value="yearEnd" className="cursor-pointer">
                      Жилийн эцсийн дүн
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Улирал</label>
                <Select value={semester} onValueChange={setSemester}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Улирал сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1" className="cursor-pointer">
                      1-р улирал
                    </SelectItem>
                    <SelectItem value="2" className="cursor-pointer">
                      2-р улирал
                    </SelectItem>
                    <SelectItem value="3" className="cursor-pointer">
                      3-р улирал
                    </SelectItem>
                    <SelectItem value="4" className="cursor-pointer">
                      4-р улирал
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => setEditingSettings(!editingSettings)}
                  className="border-2 border-red-400 cursor-pointer hover:bg-red-100 hover:border-red-500"
                >
                  Үнэлгээний бүрэлдэхүүн тохируулах
                </Button>

                {editingSettings && (
                  <GradeSettings
                    components={gradeComponents}
                    onSave={handleComponentSettingsChange}
                    onCancel={() => setEditingSettings(false)}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-300 rounded-md shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold leading-8">
              {viewMode === "semester"
                ? `${semester}-р улирлын дүнгийн жагсаалт`
                : "Жилийн эцсийн дүнгийн жагсаалт"}
            </CardTitle>
            <SortMenu onSort={handleSort} />
          </CardHeader>

          <CardContent className="px-10 ">
            <div className="overflow-x-auto border border-gray-200 rounded-md ">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Овог</TableHead>
                    <TableHead>Нэр</TableHead>
                    <TableHead>Email</TableHead>

                    {viewMode === "semester" ? (
                      <>
                        <TableHead className="text-center">
                          {gradeComponents.attendance.name}
                          <div className="text-xs font-normal">
                            {gradeComponents.attendance.weight}%
                          </div>
                        </TableHead>
                        <TableHead className="text-center">
                          {gradeComponents.activity.name}
                          <div className="text-xs font-normal">
                            {gradeComponents.activity.weight}%
                          </div>
                        </TableHead>
                        <TableHead className="text-center">
                          {gradeComponents.midterm.name}
                          <div className="text-xs font-normal">
                            {gradeComponents.midterm.weight}%
                          </div>
                        </TableHead>
                        <TableHead className="text-center">
                          {gradeComponents.final.name}
                          <div className="text-xs font-normal">
                            {gradeComponents.final.weight}%
                          </div>
                        </TableHead>
                      </>
                    ) : (
                      <>
                        <TableHead className="text-center">
                          1-р улирал
                        </TableHead>
                        <TableHead className="text-center">
                          2-р улирал
                        </TableHead>
                        <TableHead className="text-center">
                          3-р улирал
                        </TableHead>
                        <TableHead className="text-center">
                          4-р улирал
                        </TableHead>
                      </>
                    )}

                    <TableHead className="text-center">
                      {viewMode === "semester"
                        ? gradeComponents.total.name
                        : "Жилийн дүн"}
                      <div className="text-xs font-normal">
                        {gradeComponents.total.weight}%
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Томилгоо</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.lastName}</TableCell>
                      <TableCell>{student.firstName}</TableCell>
                      <TableCell>{student.email}</TableCell>

                      {viewMode === "semester" ? (
                        <>
                          <TableCell className="text-center">
                            {student.grades[semester]?.attendance || 0}
                          </TableCell>
                          <TableCell className="text-center">
                            {student.grades[semester]?.activity || 0}
                          </TableCell>
                          <TableCell className="text-center">
                            {student.grades[semester]?.midterm || 0}
                          </TableCell>
                          <TableCell className="text-center">
                            {student.grades[semester]?.final || 0}
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell className="text-center">
                            {calculateTotalScore(
                              student.grades["1"] || {},
                              gradeComponents
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {calculateTotalScore(
                              student.grades["2"] || {},
                              gradeComponents
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {calculateTotalScore(
                              student.grades["3"] || {},
                              gradeComponents
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {calculateTotalScore(
                              student.grades["4"] || {},
                              gradeComponents
                            )}
                          </TableCell>
                        </>
                      )}

                      <TableCell className="text-center font-medium">
                        {viewMode === "semester" && student.grades[semester]
                          ? calculateTotalScore(
                              student.grades[semester],
                              gradeComponents
                            )
                          : yearlyAverages[student.id]?.toFixed(1) || 0}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditGrades(student.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex justify-end">
              <Button onClick={handleSaveGrades}>
                <Save className="mr-2 h-4 w-4" />
                Хадгалах
              </Button>
            </div>
          </CardContent>
        </Card>

        {editingStudentId && (
          <EditGradesDialog
            student={students.find((s) => s.id === editingStudentId)!}
            semester={semester}
            gradeComponents={gradeComponents}
            onSave={(updatedGrades) => {
              setStudents((prev) =>
                prev.map((s) =>
                  s.id === editingStudentId
                    ? {
                        ...s,
                        grades: { ...s.grades, [semester]: updatedGrades },
                      }
                    : s
                )
              );
              setEditingStudentId(null);
            }}
            onCancel={handleCloseEditDialog}
          />
        )}
      </div>
    </div>
  );
}
