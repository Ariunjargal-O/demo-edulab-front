"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Calendar, Clock, Users, User } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schedule, Subject, TeacherType } from "@/constants/type";
import { useEffect } from "react";
import { GradeType, GroupType, SubjectGloOrSCL } from "./SchedulesTable";

// Helper function for generating unique keys
const generateUniqueKey = (prefix: string, id?: string | number, fallback?: string) => {
  return `${prefix}-${id ?? fallback ?? ''}-${Math.random().toString(36).substr(2, 9)}`;
};

interface AddLessonDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  groups: GroupType[];
  grades: GradeType[];
  teachers: TeacherType[];
  subjects: SubjectGloOrSCL[];
  editingSchedule: Schedule | null;
  loading: boolean;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onReset: () => void;
  days: { value: string; label: string }[];
}

const formSchema = z.object({
  subjectId: z.string().min(1, "Хичээл сонгох шаардлагатай"),
  day: z.string().min(1, "Өдөр сонгох шаардлагатай"),
  startTime: z.string().min(1, "Эхлэх цаг оруулах шаардлагатай"),
  endTime: z.string().min(1, "Дуусах цаг оруулах шаардлагатай"),
  gradeNumber: z.string().min(1, "Анги сонгох шаардлагатай"),
  groupName: z.string().min(1, "Бүлэг сонгох шаардлагатай"),
  teacherId: z.string().min(1, "Багш сонгох шаардлагатай"),
});

export const AddLessonDialog = ({
  isOpen,
  onOpenChange,
  groups,
  grades,
  teachers,
  subjects,
  editingSchedule,
  loading,
  onSubmit,
  onReset,
  days,
}: AddLessonDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjectId: "",
      day: "",
      startTime: "",
      endTime: "",
      gradeNumber: "",
      groupName: "",
      teacherId: "",
    },
  });

  useEffect(() => {
    if (editingSchedule) {
      form.reset({
        subjectId: editingSchedule.subjectId || "",
        day: editingSchedule.day || "",
        startTime: editingSchedule.startTime || "",
        endTime: editingSchedule.endTime || "",
        gradeNumber: editingSchedule.gradeNumber || "",
        groupName: editingSchedule.groupName || "",
        teacherId: editingSchedule.teacherId || "",
      });
    } else {
      form.reset({
        subjectId: "",
        day: "",
        startTime: "",
        endTime: "",
        gradeNumber: "",
        groupName: "",
        teacherId: "",
      });
    }
  }, [editingSchedule, form]);
  console.log(subjects)
  useEffect(() => {
    if (!isOpen && !editingSchedule) {
      form.reset();
    }
  }, [isOpen, editingSchedule, form]);

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      onReset();
      form.reset();
    }
    onOpenChange(open);
  };

  const handleNewScheduleClick = () => {
    onReset();
    form.reset();
    onOpenChange(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button
          onClick={handleNewScheduleClick}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Шинэ хуваарь нэмэх
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50 border-0 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
            {editingSchedule ? "Хуваарь засах" : "Шинэ хуваарь нэмэх"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Subject Information Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Хичээлийн мэдээлэл
                </h2>
              </div>

              <FormField
                control={form.control}
                name="subjectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 block mb-2">
                      Хичээлийн нэр
                    </FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200">
                          <SelectValue placeholder="Хичээл сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (

                            <SelectItem
                              key={generateUniqueKey("subject", subject.id, subject.name)}
                              value={subject.id.toString()}
                            >
                              {subject.name}
                            </SelectItem>

                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            {/* Schedule Information Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-100 rounded-full mr-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Цагийн хуваарь
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="day"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                        <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                        Өдөр
                      </FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200">
                            <SelectValue placeholder="Өдөр сонгох" />
                          </SelectTrigger>
                          <SelectContent>
                            {days.map((day) => (
                              <SelectItem
                                key={generateUniqueKey("day", day.value)}
                                value={day.value}
                              >
                                {day.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                        <Clock className="w-4 h-4 mr-2 text-green-600" />
                        Эхлэх цаг
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                        <Clock className="w-4 h-4 mr-2 text-red-600" />
                        Дуусах цаг
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          className="rounded-xl border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all duration-200"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Class & Group Information Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-100 rounded-full mr-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Анги, Бүлгийн мэдээлэл
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="gradeNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                        <Users className="w-4 h-4 mr-2 text-green-600" />
                        Анги
                      </FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200">
                            <SelectValue placeholder="Анги сонгох" />
                          </SelectTrigger>
                          <SelectContent>
                            {grades.map((grade) => (
                              <SelectItem
                                key={generateUniqueKey("grade", grade.id, grade.gradeNumber)}
                                value={grade.gradeNumber}
                              >
                                {grade.gradeNumber}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="groupName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                        <Users className="w-4 h-4 mr-2 text-blue-600" />
                        Бүлэг
                      </FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200">
                            <SelectValue placeholder="Бүлэг сонгох" />
                          </SelectTrigger>
                          <SelectContent>
                            {groups.map((group) => (
                              <SelectItem
                                key={generateUniqueKey("group", group.id, group.groupName)}
                                value={group.groupName}
                              >
                                {group.groupName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Teacher Information Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-orange-100 rounded-full mr-4">
                  <User className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Багшийн мэдээлэл
                </h2>
              </div>

              <FormField
                control={form.control}
                name="teacherId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                      <User className="w-4 h-4 mr-2 text-orange-600" />
                      Багш
                    </FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500 transition-all duration-200">
                          <SelectValue placeholder="Багш сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          {teachers.map((teacher) => (
                            <SelectItem
                              key={generateUniqueKey("teacher", teacher.id)}
                              value={teacher.id}
                            >
                              {teacher.firstName} {teacher.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDialogOpenChange(false)}
                className="px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
              >
                Цуцлах
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Хадгалж байна...
                  </div>
                ) : editingSchedule ? (
                  "Шинэчлэх"
                ) : (
                  "Хадгалах"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};