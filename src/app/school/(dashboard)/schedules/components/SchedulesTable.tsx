"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { BASE_URL } from "@/constants/baseurl";
import { AddLessonDialog } from "./AddLessonDailog";
import { TeacherType } from "@/constants/type";
import { useAuthStore } from "@/stores/auth-store";
import { z } from "zod";
import { useSeasonStore } from "@/stores/season-store";

// Fixed Schedule interface
export interface Schedule {
  id: string;
  schoolId: string;
  teacherId: string;
  groupId: string;
  lessonId?: string;
  subjectId: string;
  gradeId: string;
  day: string;
  startTime: string;
  endTime: string;
  seasonId: string;
  

  // Flattened properties for UI display
  lessonName: string;
  teacherName: string;
  subjectName: string;
  gradeNumber: string;
  groupName: string;

  // Optional nested objects (for reference)
  teacher?: {
    firstName: string;
    lastName: string;
    email?: string;
  };
  lesson?: {
    title: string;
    description?: string;
  };
  group?: {
    groupName: string;
  };
  grade?: {
    gradeNumber: string;
  };
  globalSubject?: {
    name: string;
    code?: string;
  };
  schoolSubject?: {
    name: string;
    code?: string;
  };
}

// Additional interface definitions
export interface GroupType {
  id: string;
  groupName: string;
  gradeNumber?: string;
}

export interface GradeType {
  id: string;
  gradeNumber: string;
}

interface ApiTeacherItem {
  school: object;
  schoolAdmin: object;
  schoolUser: object;
  teachers: TeacherType[];
}

export interface SubjectGloOrSCL {
  id: string;
  name: string;
  isCustom?: boolean;
}

interface MessageType {
  type: "success" | "error";
  text: string;
}

// Constants
const DAYS = [
  { value: "MONDAY", label: "Даваа" },
  { value: "TUESDAY", label: "Мягмар" },
  { value: "WEDNESDAY", label: "Лхагва" },
  { value: "THURSDAY", label: "Пүрэв" },
  { value: "FRIDAY", label: "Баасан" },
  { value: "SATURDAY", label: "Бямба" },
  { value: "SUNDAY", label: "Ням" },
];

const formSchema = z.object({
  subjectId: z.string().min(1, "Хичээл сонгох шаардлагатай"),
  day: z.string().min(1, "Өдөр сонгох шаардлагатай"),
  startTime: z.string().min(1, "Эхлэх цаг оруулах шаардлагатай"),
  endTime: z.string().min(1, "Дуусах цаг оруулах шаардлагатай"),
  gradeNumber: z.string().min(1, "Анги сонгох шаардлагатай"),
  groupName: z.string().min(1, "Анги сонгох шаардлагатай"),
  teacherId: z.string().min(1, "Багш сонгох шаардлагатай"),
});

// Helper function to get day label
const getDayLabel = (day: string): string => {
  return DAYS.find((d) => d.value === day)?.label || day;
};

export default function ScheduleTable() {
  // Hooks
  const { schoolId, token, schoolAdminId } = useAuthStore();
  const { activeSeason } = useSeasonStore();
  const seasonId = activeSeason?.id || "";

  // State
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [grades, setGrades] = useState<GradeType[]>([]);
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  const [subjects, setSubjects] = useState<SubjectGloOrSCL[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageType | null>(null);

  // Fetch functions
  const fetchSchedules = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${BASE_URL}/schedules/${schoolId}/${seasonId}/allScheduleList`
      );
      if (!response.ok) throw new Error("Failed to fetch schedules");

      const data = await response.json();

      const scheduleArray: Schedule[] = (Array.isArray(data) ? data : data.schedules || []).map((item: any) => ({
        id: item.id,
        schoolId: item.schoolId,
        teacherId: item.teacherId,
        groupId: item.groupId,
        lessonId: item.lessonId,
        subjectId: item.schoolSubjectId || item.globalSubjectId,
        gradeId: item.gradeId,
        day: item.day,
        startTime: item.startTime?.slice(11, 16) || "",
        endTime: item.endTime?.slice(11, 16) || "",
        seasonId: item.seasonId,

        // UI-д зориулсан flat утгууд
        lessonName: item.lesson?.title || "-",
        teacherName: `${item.teacher?.lastName || ""} ${item.teacher?.firstName || ""}`.trim() || "-",
        subjectName: item.schoolSubject?.name || item.globalSubject?.name || "-",
        gradeNumber: item.grade?.gradeNumber || "-",
        groupName: item.group?.groupName || item.gradeGroup?.group?.groupName || "-",

        // Optional nested objects
        teacher: item.teacher,
        lesson: item.lesson,
        group: item.group,
        grade: item.grade,
        globalSubject: item.globalSubject,
        schoolSubject: item.schoolSubject,
      }));

      setSchedules(scheduleArray);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      showMessage("error", "Хуваарь татахад алдаа гарлаа");
      setSchedules([]);
    }
  };

  const fetchGrades = async (): Promise<void> => {
    if (!schoolId) {
      console.error("schoolId is undefined or null");
      return;
    }

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

      if (!response.ok) throw new Error("Failed to fetch grades");
      const result = await response.json();

      const gradeArray: GradeType[] = Array.isArray(result.data)
        ? result.data.map(
          (item: { gradeId: string; grade: { gradeNumber: string } }, index: number) => ({
            id: item.gradeId || `grade-${index}`,
            gradeNumber: item.grade?.gradeNumber || `Grade-${index}`,
          })
        )
        : [];

      setGrades(gradeArray);
    } catch (error) {
      console.error("Error fetching grades:", error);
      showMessage("error", "Ангийн мэдээлэл татахад алдаа гарлаа");
      setGrades([]);
    }
  };

  const fetchGroups = async (): Promise<void> => {
    if (!schoolId) {
      console.error("schoolId is undefined or null");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/groups/${schoolId}/allGroupList`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch groups");
      const result = await response.json();

      const groupsArray: GroupType[] = Array.isArray(result.data)
        ? result.data.map(
          (item: { id: string; groupName: string; gradeNumber?: string }, index: number) => ({
            id: item.id || `group-${index}`,
            groupName: item.groupName || `Group-${index}`,
            gradeNumber: item.gradeNumber || "",
          })
        )
        : [];

      setGroups(groupsArray);
    } catch (error) {
      console.error("Error fetching groups:", error);
      showMessage("error", "Ангийн мэдээлэл татахад алдаа гарлаа");
      setGroups([]);
    }
  };

  const fetchTeachers = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${BASE_URL}/teachers/${schoolId}/teachersList`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch teachers");
      const result = await response.json();

      let teachersArray: TeacherType[] = [];

      if (result && Array.isArray(result.data)) {
        teachersArray = result.data.flatMap(
          (item: ApiTeacherItem, outerIndex: number) =>
            (item.teachers || []).map(
              (teacher: TeacherType, innerIndex: number) => ({
                ...teacher,
                id: teacher.id || `teacher-${outerIndex}-${innerIndex}`,
              })
            )
        );
      }

      setTeachers(teachersArray);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      showMessage("error", "Багшийн мэдээлэл татахад алдаа гарлаа");
      setTeachers([]);
    }
  };

  const fetchSubjects = async (): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/globalSubjects/global/list`);
      if (!response.ok) throw new Error("Failed to fetch subjects");
      const data = await response.json();

      const subjectsArray: SubjectGloOrSCL[] = Array.isArray(data)
        ? data.map((subject, index) => ({
          ...subject,
          id: subject.id || (index + 1).toString(),
        }))
        : (data.subjects || []).map((subject: any, index: number) => ({
          ...subject,
          id: subject.id || (index + 1).toString(),
        }));

      setSubjects(subjectsArray);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      showMessage("error", "Хичээлийн мэдээлэл татахад алдаа гарлаа");
      setSubjects([]);
    }
  };

  // Effects
  useEffect(() => {
    if (schoolId) {
      fetchSchedules();
      fetchGrades();
      fetchGroups();
      fetchTeachers();
      fetchSubjects();
    }
  }, [schoolId, seasonId]);

  // Utility functions
  const showMessage = (type: "success" | "error", text: string): void => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const resetDialog = (): void => {
    setEditingSchedule(null);
    setIsDialogOpen(false);
  };

  // Event handlers
  const handleEdit = (schedule: Schedule): void => {
    setEditingSchedule(schedule);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>): Promise<void> => {
    setLoading(true);

    try {
      // Subject validation
      const selectedSubject = subjects.find(
        (subject) => subject.id.toString() === data.subjectId.toString()
      );

      if (!selectedSubject) {
        showMessage("error", "⚠️ Сонгогдсон хичээл олдсонгүй\n\nДахин сонгож үзнэ үү.");
        return;
      }

      // Grade and Group validation
      const selectedGrade = grades.find(
        (grade) => grade.gradeNumber === data.gradeNumber
      );

      const selectedGroup = groups.find(
        (group) => group.groupName === data.groupName
      );

      if (!selectedGrade || !selectedGroup) {
        showMessage("error", "⚠️ Анги эсвэл бүлгийн мэдээлэл олдсонгүй\n\nТа зөв анги, бүлэг сонгосон эсэхээ шалгана уу.");
        return;
      }

      // Prepare payload
      const payload = {
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        gradeId: selectedGrade.id,
        groupId: selectedGroup.id,
        teacherId: data.teacherId,
        seasonId: seasonId,
        schoolId: schoolId,
        ...(selectedSubject.isCustom
          ? { schoolSubjectId: selectedSubject.id }
          : { globalSubjectId: selectedSubject.id }),
      };

      const url = editingSchedule
        ? `${BASE_URL}/schedules/${schoolId}/${editingSchedule.id}`
        : `${BASE_URL}/schedules/${schoolId}/add`;
      const method = editingSchedule ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = "❌ Хуваарь хадгалахад алдаа гарлаа";
        let detailMessage = "";

        try {
          const errorData = await response.json();

          if (errorData.error) {
            errorMessage = `❌ ${errorData.error}`;

            // Time conflict specific handling
            if (errorData.conflict) {
              const conflictInfo = errorData.conflict;
              const dayLabel = getDayLabel(conflictInfo.day);
              detailMessage = `\n🕒 Давхардлын мэдээлэл:\n• ${dayLabel} гарагийн ${conflictInfo.startTime} - ${conflictInfo.endTime} цагт давхцсан хичээл байна`;
            }
          }
        } catch (parseError) {
          // Handle different HTTP status codes
          switch (response.status) {
            case 400:
              errorMessage = "❌ Буруу мэдээлэл оруулсан байна";
              break;
            case 409:
              errorMessage = "❌ Цагийн хуваарьт давхардал байна";
              detailMessage = "\n\n⏰ Энэ цагт өөр хичээл байгаа байна.\nӨөр цаг сонгоно уу.";
              break;
            case 500:
              errorMessage = "❌ Серверийн алдаа гарлаа";
              break;
          }
        }

        showMessage("error", errorMessage + detailMessage);
        return;
      }

      // Success handling
      const result = await response.json();
      const successMessage = editingSchedule
        ? "✅ Хуваарь амжилттай шинэчлэгдлээ"
        : "✅ Хуваарь амжилттай нэмэгдлээ";

      showMessage("success", successMessage);
      await fetchSchedules();
      resetDialog();
    } catch (error) {
      console.error("Network or unexpected error:", error);
      showMessage("error", "❌ Хуваарь хадгалахад алдаа гарлаа\n\nИнтернэт холболтоо шалгаад дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (
      !window.confirm(
        "⚠️ Энэ хуваарийг устгахдаа итгэлтэй байна уу?\n\nЭнэ үйлдлийг буцаах боломжгүй."
      )
    )
      return;

    try {
      const response = await fetch(`${BASE_URL}/schedules/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        let errorMessage = "❌ Хуваарь устгахад алдаа гарлаа";

        switch (response.status) {
          case 404:
            errorMessage = "❌ Устгах хуваарь олдсонгүй";
            break;
          case 403:
            errorMessage = "❌ Энэ хуваарийг устгах эрх байхгүй";
            break;
          case 500:
            errorMessage = "❌ Серверийн алдаа гарлаа";
            break;
        }

        showMessage("error", errorMessage);
        return;
      }

      showMessage("success", "✅ Хуваарь амжилттай устгагдлаа");
      await fetchSchedules();
    } catch (error) {
      console.error("Error deleting schedule:", error);
      showMessage("error", "❌ Хуваарь устгахад алдаа гарлаа\n\nИнтернэт холболтоо шалгаад дахин оролдоно уу.");
    }
  };

  // Enhanced Message Display Component
  const EnhancedMessageDisplay = ({ message }: { message: MessageType }) => {
    const lines = message.text.split("\n");
    const isMultiLine = lines.length > 1;

    return (
      <div
        className={`p-5 rounded-2xl backdrop-blur-lg border shadow-2xl transition-all duration-500 transform hover:scale-[1.02] ${message.type === "success"
            ? "bg-emerald-50/90 text-emerald-800 border-emerald-200/60 shadow-emerald-100/50"
            : "bg-red-50/90 text-red-800 border-red-200/60 shadow-red-100/50"
          }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex-shrink-0 p-2 rounded-full ${message.type === "success" ? "bg-emerald-100/80" : "bg-red-100/80"
              }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-600" />
            )}
          </div>

          <div className="flex-1 space-y-2">
            {isMultiLine ? (
              <>
                <div className="font-bold text-lg leading-tight">
                  {lines[0]}
                </div>
                {lines.slice(1).length > 0 && (
                  <div className="text-sm leading-relaxed whitespace-pre-line opacity-90 bg-white/30 rounded-lg p-3 border border-white/40">
                    {lines.slice(1).join("\n")}
                  </div>
                )}
              </>
            ) : (
              <div className="font-semibold text-lg whitespace-pre-line">
                {message.text}
              </div>
            )}
          </div>

          <button
            onClick={() => setMessage(null)}
            className={`flex-shrink-0 p-1 rounded-full transition-colors ${message.type === "success"
                ? "hover:bg-emerald-200/50 text-emerald-600"
                : "hover:bg-red-200/50 text-red-600"
              }`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col gap-10">
      {/* Message display */}
      {message && <EnhancedMessageDisplay message={message} />}

      {/* Header Card */}
      <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="flex flex-col">
          <CardTitle className="text-4xl font-bold leading-tight text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-4">
            <Calendar className="h-8 w-8 text-blue-600" />
            Ангиудын хичээлийн хуваарийг оруулах
          </CardTitle>
          <p className="text-slate-600 mt-3 text-lg">
            Хичээлийн жилийн хуваарийг удирдах, төлөвлөх
          </p>
        </CardHeader>
      </Card>

      {/* Main Table Card */}
      <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 py-0 border-none">
        <CardContent className="p-0">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-t-xl flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold leading-8 text-slate-800 p-6">
              Хичээлийн хуваарь
            </CardTitle>
            <div className="p-6">
              <AddLessonDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                grades={grades}
                groups={groups}
                teachers={teachers}
                subjects={subjects}
                editingSchedule={editingSchedule}
                loading={loading}
                onSubmit={handleSubmit}
                onReset={resetDialog}
                days={DAYS}
              />
            </div>
          </CardHeader>
          <div className="p-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-white/30 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm">
                    <TableHead className="font-semibold text-slate-700">
                      Хичээлийн нэр
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Өдөр
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Цаг
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Анги
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Бүлэг
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Багш
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Хичээл
                    </TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">
                      Үйлдэл
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-12 text-slate-500 bg-white/30 backdrop-blur-sm"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Calendar className="h-12 w-12 text-slate-400" />
                          <span className="text-lg">Хуваарь байхгүй байна</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    schedules.map((schedule, index) => (
                      <TableRow
                        key={`schedule-${schedule.id}-${index}`}
                        className={`hover:bg-white/40 transition-all duration-200 ${index % 2 === 0 ? "bg-white/20" : "bg-white/10"
                          } backdrop-blur-sm`}
                      >
                        <TableCell className="font-medium text-slate-800">
                          {schedule.lessonName}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-blue-100/70 text-blue-700 border-blue-200/50 backdrop-blur-sm"
                          >
                            {getDayLabel(schedule.day)}
                          </Badge>
                        </TableCell>
                        <TableCell className="flex items-center gap-2 text-slate-700">
                          <Clock className="h-4 w-4 text-indigo-500" />
                          {schedule.startTime} - {schedule.endTime}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-slate-700">
                            <Users className="h-4 w-4 text-green-500" />
                            {schedule.gradeNumber}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-slate-700">
                            <Users className="h-4 w-4 text-purple-500" />
                            {schedule.groupName}
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-700">
                          {schedule.teacherName}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-slate-700">
                            <BookOpen className="h-4 w-4 text-orange-500" />
                            {schedule.subjectName}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(schedule)}
                              className="bg-white/70 hover:bg-white/90 border-white/50 backdrop-blur-sm transition-all duration-200 hover:shadow-lg"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(schedule.id)}
                              className="bg-red-50/70 hover:bg-red-100/90 text-red-600 hover:text-red-700 border-red-200/50 backdrop-blur-sm transition-all duration-200 hover:shadow-lg"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}