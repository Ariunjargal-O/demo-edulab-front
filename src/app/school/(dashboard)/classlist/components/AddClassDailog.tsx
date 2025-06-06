"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  BookOpen,
  GraduationCap,
  Hash,
  Mail,
  Plus,
  Save,
  Users,
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { BASE_URL } from "@/constants/baseurl";
import { useAuthStore } from "@/stores/auth-store";

const classFormSchema = z.object({
  gradeNumber: z
    .string()
    .min(1, "Анги тоо оруулах шаардлагатай")
    .regex(/^([1-9]|1[0-2])$/, "Анги тоо 1-12 хооронд бүхэл тоо байх ёстой")
    .refine((val) => {
      const num = Number(val);
      return num >= 1 && num <= 12;
    }, {
      message: "Анги тоо 1-12 хооронд байх ёстой",
    }),
  groupName: z.string().min(1, { message: "Бүлэг оруулах шаардлагатай" }),
  teacherEmail: z
    .string()
    .email({ message: "Багшийн имэйл буруу байна" })
    .optional()
    .or(z.literal("")),
});

interface ClassFormDialogProps {
  onSubmitAction: (data: any) => Promise<void>;
  editingClass?: any | null;
  trigger?: React.ReactNode;
  schoolId?: string | null;
  schoolAdminId?: string | null;
}

export function AddClassDialog({
  onSubmitAction,
  editingClass,
  trigger,
}: ClassFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof classFormSchema>>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      gradeNumber: "",
      groupName: "",
      teacherEmail: "",
    },
  });

  const { schoolId, schoolAdminId, token } = useAuthStore();

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      form.reset();
      setErrorMessage(null);
    }
  };

  const onSubmit = async (values: z.infer<typeof classFormSchema>) => {
    try {
      setErrorMessage(null);

      let teacherId: string | undefined = undefined;

      if (values.teacherEmail?.trim()) {
        const response = await fetch(
          `${BASE_URL}/teachers/${schoolId}/email/${values.teacherEmail.trim()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Тухайн имэйлтэй багш олдсонгүй");
        }

        const data = await response.json();
        teacherId = data.id;
      }

      const classData = {
        // backend-д string гэж хүлээж авч байгаа тул хөрвүүлэхгүй
        gradeNumber: values.gradeNumber,
        groupName: values.groupName,
        schoolAdminId: schoolAdminId!,
        schoolId: schoolId!,
        teacherId,
      };

      const classResponse = await fetch(`${BASE_URL}/grades/${schoolId}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(classData),
      });

      const result = await classResponse.json();

      if (!classResponse.ok) {
        if (classResponse.status === 409) {
          throw new Error(result.message || "Аль хэдийн үүссэн анги байна.");
        }
        throw new Error(result.message || "Анги нэмэхэд алдаа гарлаа.");
      }

      console.log("Анги нэмэгдсэн:", result);
      setOpen(false);
      window.location.reload();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Анги нэмэхэд тодорхойгүй алдаа гарлаа.");
      }
    }
  };

  const handleGradeInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const value = e.target.value;

    // Allow empty string for clearing
    if (value === "") {
      field.onChange("");
      return;
    }

    // Only allow numeric input
    if (!/^\d+$/.test(value)) {
      return; // Don't update if non-numeric
    }

    const numValue = parseInt(value, 10);

    // Only allow values 1-12
    if (numValue >= 1 && numValue <= 12) {
      field.onChange(value);
    }
    // If value is greater than 12, don't update the field
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
            <Plus className="w-5 h-5 mr-2" />
            Шинэ анги нэмэх
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50 border-0 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
            {editingClass ? "Анги засах" : "Шинэ анги нэмэх"}
          </DialogTitle>
          <div className="flex justify-center mt-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Ангийн мэдээлэл
              </h2>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="gradeNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                          <Hash className="w-4 h-4 mr-2 text-blue-600" />
                          Анги (1-12)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={12}
                            placeholder="1-12 хооронд анги оруулна уу"
                            {...field}
                            onChange={(e) => handleGradeInputChange(e, field)}
                            className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                          />
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
                          <Input
                            placeholder="Үсэг болон тоо"
                            {...field}
                            className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="teacherEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                        <Mail className="w-4 h-4 mr-2 text-blue-600" />
                        Багшийн Имэйл
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="teacher@example.com"
                          {...field}
                          className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </FormItem>
                  )}
                />

                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-start space-x-3">
                      <div className="p-1 bg-red-100 rounded-full flex-shrink-0 mt-0.5">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-red-600 text-sm font-medium">
                          {errorMessage}
                        </p>
                        {errorMessage.includes("бүртгэлтэй багш олдсонгүй") && (
                          <p className="text-red-500 text-xs mt-1">
                            Санамж: Багш эхлээд Teacher хэсэгт бүртгэгдсэн байх
                            ёстой.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {editingClass ? "Засах" : "Нэмэх"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}