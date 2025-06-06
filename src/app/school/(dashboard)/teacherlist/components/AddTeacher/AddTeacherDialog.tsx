"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  UserPlus,
  User,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Save,
  Mail,
  Phone,
} from "lucide-react";
import { BASE_URL } from "@/constants/baseurl";
import CheckSubjectDialog from "./CheckBox";
import { useAuthStore } from "@/stores/auth-store";


const formSchema = z.object({
  lastName: z.string().min(2, { message: "Овог хамгийн багадаа 2 тэмдэгт..." }),
  firstName: z.string().min(2, { message: "Нэр хамгийн багадаа 2 тэмдэгт..." }),
  email: z.string().email({ message: "Имэйл буруу байна." }),
  phoneNumber1: z.string().min(8, { message: "Утасны дугаар буруу байна." }),
  globalSubjects: z.array(z.string()).optional(),
  gradeNumber: z.string().optional(),
  groupName: z.string().optional(),
});


interface AddTeacherDialogProps {
  onTeacherAddedAction: () => void | Promise<void>;
}

export default function AddTeacherDialog({
  onTeacherAddedAction,
}: AddTeacherDialogProps) {
  // State variables - бүх useState hooks эхэнд
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<
    { id: string; name: string }[]
  >([]);
  
  const {schoolId,token, schoolAdminId} = useAuthStore()
  console.log("schoolAdminId:", schoolAdminId);
  console.log("schoolid", schoolId)

  // Form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      phoneNumber1: "",
      globalSubjects: [],
      gradeNumber: "",
      groupName: "",
    },
  });


  // subjects өөрчлөгдөхөд form-д шинэчлэх effect
  useEffect(() => {
    form.setValue("globalSubjects", subjects);
  }, [subjects, form]);

  // Dialog хаагдах үед бүгдийг цэвэрлэх effect
  useEffect(() => {
    if (!open) {
      setSubjects([]);
      form.reset();
      setStep(1);
    }
  }, [open, form]);

  // Хичээлүүдийг татаж байгаа effect
  useEffect(() => {
    async function fetchSubjects() {
      if (!schoolId) return;

      try {
        const res = await fetch(`${BASE_URL}/globalSubjects/global/list`);
        if (!res.ok) throw new Error("Хичээл татахад алдаа гарлаа.");
        const data = await res.json();
        if (Array.isArray(data)) {
          setAvailableSubjects(data);
        } else {
          console.error("API-с ирсэн өгөгдөл array биш:", data);
          setAvailableSubjects([]);
        }
      } catch (error) {
        console.error("Хичээл татахад алдаа:", error);
        toast.error("Хичээлүүдийг татахад алдаа гарлаа");
        setAvailableSubjects([]);
      }
    }
    fetchSubjects();
  }, [schoolId]);

  // Helper functions - utility функцууд
  const getSubjectNameById = (id: string) => {
    const subject = availableSubjects.find((s) => s.id === id);
    return subject ? subject.name : id;
  };

  // Event handlers - бүх event handler функцууд
  const handleNextStep = () => {
    const firstStepFields = ["lastName", "firstName", "email", "phoneNumber1"];
    const isValid = firstStepFields.every((field) => {
      const error =
        form.formState.errors[field as keyof typeof form.formState.errors];
      return !error;
    });

    if (
      isValid &&
      form.getValues("lastName") &&
      form.getValues("firstName") &&
      form.getValues("email") &&
      form.getValues("phoneNumber1")
    ) {
      setStep(2);
    } else {
      form.trigger(["lastName", "firstName", "email", "phoneNumber1"]);
    }
  };

  // Form submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!schoolAdminId || !schoolId) {
      toast.error("Сургуулийн мэдээлэл олдсонгүй.");
      return;
    }

    setIsSubmitting(true);
    try {
   
      if (!token) throw new Error("Токен олдсонгүй.");

      const payload = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phoneNumber1: values.phoneNumber1.trim(),
        schoolId,
        schoolAdminId,
        gradeNumber: values.gradeNumber?.trim() || undefined,
        groupName: values.groupName?.trim() || undefined,
        ...(subjects.length > 0 && { globalSubjects: subjects }),
      };

      const response = await fetch(
        `${BASE_URL}/teachers/${schoolId}/add-teacher`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Алдаа гарлаа");
      }

      toast.success("Багш амжилттай нэмэгдлээ!");
      form.reset();
      setSubjects([]);
      setStep(1);
      setOpen(false);

      if (onTeacherAddedAction) {
        await onTeacherAddedAction();
      }
    } catch (error) {
      console.error("Error adding teacher:", error);
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Алдаа гарлаа");
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <div className="p-6">
      <Button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      >
        <UserPlus className="mr-2 h-5 w-5" />
        Багш нэмэх
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50 border-0 shadow-2xl">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center ">
              Шинэ багш нэмэх
            </DialogTitle>
            <div className="flex justify-center mt-4">
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step === 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  } transition-all duration-300`}
                >
                  <User className="w-5 h-5" />
                </div>
                <div
                  className={`h-1 w-12 ${
                    step === 2 ? "bg-blue-600" : "bg-gray-200"
                  } transition-all duration-300`}
                ></div>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step === 2
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  } transition-all duration-300`}
                >
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
            </div>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 flex flex-col gap-3">
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-blue-100 rounded-full mr-4">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Багшийн мэдээлэл
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 block mb-2">
                              Багшийн овог
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Овог"
                                {...field}
                                className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs mt-1" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 block mb-2">
                              Багшийн нэр
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Нэр"
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                            <Mail className="w-4 h-4 mr-2 text-blue-600" />
                            Багшийн имэйл
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
                    <FormField
                      control={form.control}
                      name="phoneNumber1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                            <Phone className="w-4 h-4 mr-2 text-blue-600" />
                            Багшийн утасны дугаар
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="99123456"
                              {...field}
                              className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs mt-1" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-left-5 duration-300">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-purple-100 rounded-full mr-4">
                        <BookOpen className="w-6 h-6 text-purple-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Заах хичээл ба анги
                      </h2>
                    </div>

                    {/* Сонгогдсон хичээлүүд */}
                    <div className="mb-6">
                      <FormLabel className="text-sm font-medium text-gray-700 block mb-3">
                        Сонгогдсон хичээлүүд
                        <span className="text-xs text-orange-600 ml-2">
                          (Багш үүсгэсний дараа хичээл оноох боломжтой)
                        </span>
                      </FormLabel>
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 min-h-[80px] flex flex-wrap gap-2 items-center">
                        {subjects.length > 0 ? (
                          subjects.map((id) => (
                            <span
                              key={id}
                              className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-medium rounded-lg shadow-md"
                            >
                              {getSubjectNameById(id)}
                            </span>
                          ))
                        ) : (
                          <div className="flex items-center justify-center w-full h-12 text-gray-400 text-sm border-2 border-dashed border-gray-300 rounded-lg">
                            Хичээл сонгоно уу (заавал биш)
                          </div>
                        )}
                      </div>
                      {form.formState.errors.globalSubjects && (
                        <p className="text-red-500 text-xs mt-2">
                          {form.formState.errors.globalSubjects.message}
                        </p>
                      )}
                    </div>

                    {/* Хичээл сонгох checkbox бүрдэл */}
                    <div className="mb-6">
                      <CheckSubjectDialog
                        availableSubjects={availableSubjects}
                        selectedSubjects={subjects}
                        onSubjectsChange={setSubjects}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                {step === 1 && (
                  <div className="flex-1 flex justify-end">
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Дараа
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="flex justify-between w-full">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-2 px-6 transition-all duration-200"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Буцах
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Хадгалж байна...
                        </div>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Хадгалах
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}