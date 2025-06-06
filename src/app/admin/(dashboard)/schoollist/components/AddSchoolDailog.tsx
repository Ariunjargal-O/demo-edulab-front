"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Building2, Users, ArrowRight, ArrowLeft, Save, Phone, Mail, Globe, MapPin } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { BASE_URL } from "@/constants/baseurl";
import { useAuthStore } from "@/stores/auth-store";

const adminSchema = z.object({
  firstName: z.string().min(2, "Нэр 2-с дээш тэмдэгттэй байх ёстой"),
  lastName: z.string().min(2, "Овог 2-с дээш тэмдэгттэй байх ёстой"),
  email: z.string().email("Зөв имэйл оруулна уу"),
  phoneNumber1: z
    .string()
    .min(8, "Утасны дугаар 8-с дээш тэмдэгттэй байх ёстой"),
  phoneNumber2: z.string().optional(),
});

const schoolSchema = z.object({
  name: z.string().min(2, "Сургуулийн нэр 2-с дээш тэмдэгттэй байх ёстой"),
  address: z.string().min(5, "Хаяг 5-с дээш тэмдэгттэй байх ёстой"),
  city: z.string().min(2, "Хотын нэр 2-с дээш тэмдэгттэй байх ёстой"),
  phoneNumber: z
    .string()
    .min(8, "Утасны дугаар 8-с дээш тэмдэгттэй байх ёстой"),
  website: z.string().url("Зөв URL оруулна уу").optional().or(z.literal("")),
  description: z.string().optional(),
  admins: z.array(adminSchema).min(1, "Хамгийн багадаа нэг админ байх ёстой"),
});

type SchoolFormValues = z.infer<typeof schoolSchema>;

export interface AddSchoolDialogProps {
  onSchoolAddedAction: () => void;
}

export function AddSchoolDialog({ onSchoolAddedAction }: AddSchoolDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get token and adminId from auth store
  const { adminId, token } = useAuthStore();
  console.log("admindi",adminId)
  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      phoneNumber: "",
      website: "",
      description: "",
      admins: [
        {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber1: "",
          phoneNumber2: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "admins",
  });

  const handleNextStep = () => {
    // Validate first step
    const firstStepFields = ['name', 'address', 'city', 'phoneNumber'];
    const isValid = firstStepFields.every(field => {
      const error = form.formState.errors[field as keyof typeof form.formState.errors];
      return !error;
    });

    if (isValid && form.getValues('name') && form.getValues('address') && 
        form.getValues('city') && form.getValues('phoneNumber')) {
      setStep(2);
    } else {
      // Trigger validation
      form.trigger(['name', 'address', 'city', 'phoneNumber']);
    }
  };

  const onSubmit = async (values: SchoolFormValues) => {
    setIsSubmitting(true);

    // Debug: console.log token and adminId
    console.log("Token:", token);
    console.log("AdminId:", adminId);
    console.log("Form values:", values);

    // Check if token exists
    if (!token) {
      console.error("Token байхгүй байна");
      toast.error("Нэвтрэх эрхгүй байна. Дахин нэвтэрнэ үү.");
      setIsSubmitting(false);
      return;
    }

    // Check if adminId exists
    if (!adminId) {
      console.error("AdminId байхгүй байна");
      toast.error("Админы мэдээлэл олдсонгүй. Дахин нэвтэрнэ үү.");
      setIsSubmitting(false);
      return;
    }

    const addSchool = {
      name: values.name,
      address: values.address,
      city: values.city,
      phoneNumber: values.phoneNumber,
      website: values.website || null,
      description: values.description || null,
      admins: values.admins.map((admin) => ({
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        phoneNumber1: admin.phoneNumber1,
        phoneNumber2: admin.phoneNumber2 || null,
      })),
    };

    try {
      console.log("Sending request to:", `${BASE_URL}/schools/${adminId}/add`);
      console.log("Request body:", JSON.stringify(addSchool, null, 2));
      
      const response = await fetch(`${BASE_URL}/schools/${adminId}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addSchool),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      if (response.status === 401) {
        console.error("401 Unauthorized - Token буруу эсвэл хүчингүй");
        toast.error("Нэвтрэх хугацаа дууссан байна. Дахин нэвтэрнэ үү.");
        setIsSubmitting(false);
        return;
      }

      if (!response.ok) {
        let errorMessage = "Сургуулийг нэмэхэд алдаа гарлаа.";

        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            console.error("Server error response:", errorData);
            errorMessage = errorData.message || errorData.error || errorMessage;
          } else {
            const errorText = await response.text();
            console.error("Server error text:", errorText);
            errorMessage = errorText || errorMessage;
          }
        } catch (parseError) {
          console.error("Алдааны мэдээллийг унших үед алдаа:", parseError);
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Success response:", data);
      toast.success(`Амжилттай нэмэгдлээ: ${data.name}`);
      form.reset();
      setStep(1);
      setOpen(false);
      onSchoolAddedAction && onSchoolAddedAction();
      window.location.reload();
    } catch (error: any) {
      console.error("Fetch алдаа:", error);
      toast.error(error.message || "Алдаа гарлаа");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="p-6">
      <Button 
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
      >
        <Plus className="mr-2 h-5 w-5" />
        Сургууль нэмэх
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50 border-0 shadow-2xl">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
              Шинэ сургууль нэмэх
            </DialogTitle>
            <div className="flex justify-center mt-4">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} transition-all duration-300`}>
                  <Building2 className="w-5 h-5" />
                </div>
                <div className={`h-1 w-12 ${step === 2 ? 'bg-blue-600' : 'bg-gray-200'} transition-all duration-300`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} transition-all duration-300`}>
                  <Users className="w-5 h-5" />
                </div>
              </div>
            </div>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-blue-100 rounded-full mr-4">
                        <Building2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Сургуулийн мэдээлэл
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 block mb-2">Сургуулийн нэр</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Сургуулийн нэр"
                                className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs mt-1" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="phoneNumber"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                              <Phone className="w-4 h-4 mr-2 text-blue-600" />
                              Утас
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="99123456"
                                className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <FormField
                        name="city"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                              Хот
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Улаанбаатар"
                                className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs mt-1" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="address"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                              Хаяг
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Дэлгэрэх хороо, 1-р байр"
                                className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-6">
                      <FormField
                        name="website"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                              <Globe className="w-4 h-4 mr-2 text-blue-600" />
                              Вебсайт <span className="text-xs text-gray-500 ml-1">(заавал биш)</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="https://example.com"
                                className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-6">
                      <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 block mb-2">
                              Тайлбар <span className="text-xs text-gray-500 ml-1">(заавал биш)</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Сургуулийн тухай дэлгэрэнгүй мэдээлэл..."
                                className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 min-h-[100px]"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
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
                        Админы мэдээлэл
                      </h2>
                    </div>

                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="space-y-4 p-6 border-2 border-gray-100 rounded-2xl relative mb-6 bg-gradient-to-br from-gray-50 to-blue-50"
                      >
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-2 transition-all duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}

                        <div className="mb-4">
                          <h3 className="text-lg font-medium text-gray-700 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                              {index + 1}
                            </div>
                            Админ {index + 1}
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            name={`admins.${index}.lastName`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700 block mb-2">Овог</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="Овог"
                                    className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            name={`admins.${index}.firstName`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700 block mb-2">Нэр</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="Нэр"
                                    className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          name={`admins.${index}.email`}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                                <Mail className="w-4 h-4 mr-2 text-purple-600" />
                                Имэйл
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  {...field} 
                                  placeholder="admin@example.com"
                                  className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 text-xs mt-1" />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            name={`admins.${index}.phoneNumber1`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                                  <Phone className="w-4 h-4 mr-2 text-purple-600" />
                                  Утас 1
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="99123456"
                                    className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs mt-1" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            name={`admins.${index}.phoneNumber2`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700 flex items-center mb-2">
                                  <Phone className="w-4 h-4 mr-2 text-purple-600" />
                                  Утас 2 <span className="text-xs text-gray-500 ml-1">(заавал биш)</span>
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="88123456"
                                    className="rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        append({
                          firstName: "",
                          lastName: "",
                          email: "",
                          phoneNumber1: "",
                          phoneNumber2: "",
                        })
                      }
                      className="mt-4 border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 rounded-xl py-2 px-4 transition-all duration-200"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Админ нэмэх
                    </Button>
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