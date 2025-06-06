"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  User,
  Users,
  Mail,
  Phone,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Save,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { BASE_URL } from "@/constants/baseurl";
import { useAuthStore } from "@/stores/auth-store";

const parentSchema = z.object({
  lastName: z
    .string()
    .min(2, { message: "Овог хамгийн багадаа 2 тэмдэгт байх ёстой." }),
  firstName: z
    .string()
    .min(2, { message: "Нэр хамгийн багадаа 2 тэмдэгт байх ёстой." }),
  email: z.string().email({ message: "Имэйл буруу байна." }),
  phoneNumber1: z
    .string()
    .min(8, { message: "Утасны дугаар хамгийн багадаа 8 оронтой байх ёстой." }),
  phoneNumber2: z.string().optional(),
  relation: z.string().min(2, { message: "Хамаарал заавал оруулна уу." }),
});

const formSchema = z.object({
  lastName: z
    .string()
    .min(2, { message: "Овог хамгийн багадаа 2 тэмдэгт байх ёстой." }),
  firstName: z
    .string()
    .min(2, { message: "Нэр хамгийн багадаа 2 тэмдэгт байх ёстой." }),
  sex: z.enum(["эр", "эм"], {
    errorMap: () => ({ message: "Хүйс заавал сонгоно уу." }),
  }),
  email: z.string().email({ message: "Имэйл буруу байна." }),
  phoneNumber: z
    .string()
    .min(8, { message: "Утасны дугаар хамгийн багадаа 8 оронтой байх ёстой." }),
  parents: z
    .array(parentSchema)
    .min(1, { message: "Хамгийн багадаа нэг эцэг эх нэмэх ёстой." }),
});

interface AddStudentDialogProps {
  onSubmitAction: (
    studentData: any
  ) => Promise<{ success: boolean; error?: string }>;
  gradeGroupId: string;
}

export default function AddStudentDialog({
  onSubmitAction,
  gradeGroupId,
}: AddStudentDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { schoolId, teacherId } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      sex: undefined,
      email: "",
      phoneNumber: "",
      parents: [
        {
          lastName: "",
          firstName: "",
          email: "",
          phoneNumber1: "",
          phoneNumber2: "",
          relation: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "parents",
  });

  const addParent = () => {
    append({
      lastName: "",
      firstName: "",
      email: "",
      phoneNumber1: "",
      phoneNumber2: "",
      relation: "",
    });
  };

  const removeParent = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleNextStep = async () => {
    // Validate first step fields including gender
    const firstStepFields = [
      "lastName",
      "firstName",
      "sex",
      "email",
      "phoneNumber",
    ] as const;
    const isValid = await form.trigger(firstStepFields);

    if (isValid) {
      setStep(2);
    }
  };

  const resetForm = () => {
    form.reset();
    setStep(1);
    setOpen(false);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!schoolId || !teacherId) {
      toast.error("Сургуулийн эсвэл багшийн мэдээлэл олдсонгүй.");
      return;
    }

    // Хүйсийн мэдээллийг зөв хөрвүүлэх
    let sexForBackend: "male" | "female";

    if (values.sex === "эр") {
      sexForBackend = "male";
    } else if (values.sex === "эм") {
      sexForBackend = "female";
    } else {
      toast.error("Хүйсийн мэдээлэл буруу байна.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare the data for submission
      const studentData = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        sex: sexForBackend, // Заавал хүйсийн утга оруулах
        email: values.email.trim(),
        phoneNumber: values.phoneNumber.trim(),
        parents: values.parents.map((parent) => ({
          firstName: parent.firstName.trim(),
          lastName: parent.lastName.trim(),
          email: parent.email.trim(),
          phoneNumber1: parent.phoneNumber1.trim(),
          phoneNumber2: parent.phoneNumber2?.trim() || "",
          relation: parent.relation?.trim() || "",
        })),
      };

      // Debug: console.log хийж шалгах
      console.log("Явуулах өгөгдөл:", studentData);
      console.log("Хүйс:", studentData.sex);

      // Call the parent component's submit handler
      const result = await onSubmitAction(studentData);
      
      if (result.success) {
        toast.success("Сурагч амжилттай нэмэгдлээ!");
        resetForm();
      } else {
        toast.error(result.error || "Сурагч нэмэхэд алдаа гарлаа");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Алдаа гарлаа");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
      >
        <UserPlus className="mr-2 h-5 w-5" />
        Сурагч нэмэх
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50 border-0 shadow-2xl">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
              Шинэ сурагч нэмэх
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
                  <Users className="w-5 h-5" />
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
                        Сурагчийн мэдээлэл
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 block mb-2">
                              Сурагчийн овог
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
                              Сурагчийн нэр
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
                      name="sex"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 block mb-2">
                            Хүйс
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200">
                                <SelectValue placeholder="Хүйс сонгох" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="эр">Эр</SelectItem>
                              <SelectItem value="эм">Эм</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500 text-xs mt-1" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                            <Phone className="w-4 h-4 mr-2 text-blue-600" />
                            Сурагчийн утасны дугаар
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="99123456"
                              {...field}
                              className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 w-full"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs mt-1" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                            <Mail className="w-4 h-4 mr-2 text-blue-600" />
                            Сурагчийн имэйл
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="student@example.com"
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
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Эцэг эхийн мэдээлэл
                      </h2>
                    </div>

                    <div className="space-y-8">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="bg-gray-50 rounded-xl p-6 border border-gray-200 relative flex flex-col gap-4"
                        >
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-700">
                              Эцэг эх #{index + 1}
                            </h3>
                            {fields.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeParent(index)}
                                className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Устгах
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`parents.${index}.lastName`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-gray-700 block mb-2">
                                    Эцэг эхийн овог
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Овог"
                                      {...field}
                                      className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-xs mt-1" />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`parents.${index}.firstName`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-gray-700 block mb-2">
                                    Эцэг эхийн нэр
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Нэр"
                                      {...field}
                                      className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-xs mt-1" />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <FormField
                              control={form.control}
                              name={`parents.${index}.email`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                                    <Mail className="w-4 h-4 mr-2 text-purple-600" />
                                    Имэйл
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="example@email.com"
                                      {...field}
                                      className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-xs mt-1" />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`parents.${index}.relation`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-gray-700 block mb-2">
                                    Хамаарал
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Аав/Ээж гэх мэт"
                                      {...field}
                                      className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-xs mt-1" />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name={`parents.${index}.phoneNumber1`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                                  <Phone className="w-4 h-4 mr-2 text-purple-600" />
                                  1-р утас
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="99123456"
                                    {...field}
                                    className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`parents.${index}.phoneNumber2`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                                  <Phone className="w-4 h-4 mr-2 text-purple-600" />
                                  2-р утас (заавал биш)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="99123456"
                                    {...field}
                                    className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        onClick={addParent}
                        className="w-full border-dashed border-2 border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 rounded-xl py-6 transition-all duration-200"
                      >
                        <Plus className="mr-2 h-5 w-5" />
                        Өөр эцэг эх нэмэх
                      </Button>
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
    </>
  );
}