"use client";

import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Eye,
  EyeOff,
  Globe,
  Lightbulb,
  Lock,
  Mail,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { BASE_URL } from "@/constants/baseurl";

export type BaseDecodedToken = {
  email: string;
  id: string;
  role: string;
  exp: number;
  iat: number;
};

export type TeacherToken = BaseDecodedToken & {
  role: "teacher";
  schoolId: string;
  schoolAdminId?: string;
  address?: string;
  city?: string;
  name?: string;
  phoneNumber?: string;
};

export type SchoolToken = BaseDecodedToken & {
  role: "school";
  schoolId: string;
  name?: string;
  phoneNumber?: string;
  city?: string;
  address?: string;
  schoolAdminId: string;
};

export type StudentToken = BaseDecodedToken & {
  role: "student";
  schoolId: string;
  studentId: string;
  name?: string;
  phoneNumber?: string;
  city?: string;
  address?: string;
};

export type ParentToken = BaseDecodedToken & {
  role: "parent";
  schoolId: string;
  parentId: string;
  name?: string;
  phoneNumber?: string;
  city?: string;
  address?: string;
};

export type AdminToken = BaseDecodedToken & {
  role: "admin";
  adminId: string;
};

export type DecodedTokenType =
  | TeacherToken
  | SchoolToken
  | StudentToken
  | ParentToken
  | AdminToken
  | { role: string };

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(5)
      .max(50),
    password: z.string().min(4, "Password must be at least 8 characters"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      console.log("login result ", result);

      if (!response.ok) {
        toast.error(result.message || "Нэвтрэх оролдлого амжилтгүй!!!");
        setIsLoading(false);
        return;
      }

      toast.success("Амжилттай нэвтэрлээ.");

      const decodedToken: DecodedTokenType = jwtDecode(result.token);
      const role = decodedToken.role;
// console.log()
      // setAuthFromLogin функцийг ашиглаж бүх мэдээллийг тохируулах
      const { setAuthFromLogin } = useAuthStore.getState();
      setAuthFromLogin(result);

      // Role-н дагуу redirect хийх
      switch (role) {
        case "admin":
          
          router.push("/admin");
          break;
        case "school":
          router.push("/school");
          break;
        case "teacher":
          router.push("/teacher");
          break;
        case "student":
          router.push("/student");
          break;
        case "parent":
          router.push("/parent");
          break;
        default:
          toast.warning("Unknown role. Redirecting to home...");
          router.push("/");
          break;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ... бусад UI код

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-emerald-900/10 to-blue-900/30 flex flex-col lg:flex-row relative overflow-hidden">
      {/* Enhanced Floating Background Elements */}
      <div
        className="absolute top-20 left-10 w-16 h-16 lg:w-20 lg:h-20 bg-blue-400/20 rounded-full animate-bounce"
        style={{ animationDuration: "3s" }}
      ></div>
      <div
        className="absolute top-40 right-20 w-12 h-12 lg:w-16 lg:h-16 bg-emerald-400/20 rounded-full animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-10 h-10 lg:w-12 lg:h-12 bg-blue-500/20 rounded-full animate-bounce"
        style={{ animationDelay: "2s", animationDuration: "4s" }}
      ></div>
      <div className="absolute top-60 left-1/3 w-6 h-6 lg:w-8 lg:h-8 bg-emerald-400/30 rounded-full animate-pulse"></div>
      <div
        className="absolute bottom-60 right-1/3 w-10 h-10 lg:w-14 lg:h-14 bg-blue-400/20 rounded-full animate-bounce"
        style={{ animationDuration: "2s" }}
      ></div>

      {/* Left Side - Branding */}
      <div className="w-full lg:w-1/2 relative overflow-hidden min-h-[50vh] lg:min-h-screen">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 left-20 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"></div>
          <div className="absolute top-40 right-32 w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-12 h-12 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"></div>
        </div>
        {/* Logo - Desktop version (970px+) */}
        <Link href={"/"}>
          <div className="hidden lg:block absolute top-8 left-8 z-10">
          <div className="flex items-center gap-3 group">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300"
                >
                  <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span
                  className="text-2xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent transition-all duration-300"
                >
                  EduLab
                </span>
              </div>
          </div>
        </Link>
        {/* Logo - Mobile/Tablet version (below 970px) */}
        <Link href={"/"}>
          <div className="lg:hidden absolute top-4 left-4 z-10">
            <div className="flex items-center gap-3"></div>
            <div className="flex items-center gap-3 group">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300"
                >
                  <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span
                  className="text-2xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent transition-all duration-300"
                >
                  EduLab
                </span>
              </div>
          </div>
        </Link>
        {/* Main Content */}
        <div className="flex flex-col items-center justify-center h-full px-8 lg:px-16 text-center py-16 lg:py-0">
          <div className="mb-6 lg:mb-10">
            <div className="w-24 h-24 lg:w-36 lg:h-36 bg-white/15 backdrop-blur-lg rounded-3xl shadow-2xl flex items-center justify-center mb-6 lg:mb-8 mx-auto transform rotate-12 hover:rotate-0 transition-all duration-700 border border-white/30 hover:scale-105">
              <div className="w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-inner">
                <div className="text-white font-bold text-xl lg:text-3xl">
                  🎓
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50/90 to-emerald-50/90 backdrop-blur-sm text-blue-800 px-4 py-2 lg:px-6 lg:py-3 rounded-full mb-6 lg:mb-8 text-sm lg:text-base font-semibold border border-blue-200/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 lg:gap-3 shadow-lg">
            <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
            <span className="bg-gradient-to-r from-blue-700 to-emerald-600 bg-clip-text text-transparent">
              Дижитал боловсролын платформ
            </span>
          </div>

          <h1 className="text-white text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight drop-shadow-lg">
            Тавтай морил
            <br />
            <span className="text-4xl lg:text-6xl bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-transparent font-extrabold tracking-wider">
              EduLab
            </span>
          </h1>
          <p className="text-black text-base lg:text-xl max-w-sm lg:max-w-lg mb-3 lg:mb-4 leading-relaxed font-medium drop-shadow-md px-4 lg:px-0">
            Таны орон зайгаас үл хамаарч дэлхийн шилдэг их сургуульд хүрэх таны
            найдвартай гүүр болно
          </p>
          <p className="text-blue-400/80 text-sm lg:text-lg max-w-xs lg:max-md mb-6 lg:mb-10 italic px-4 lg:px-0">
            "Боловсрол бол хамгийн хүчирхэг зэвсэг юм"
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-2 lg:gap-4 text-white/ text-xs lg:text-sm max-w-xs lg:max-w-md">
            <div className="flex items-center gap-1 lg:gap-2 bg-gradient-to-r from-blue-300/50 to-emerald-300/50 backdrop-blur-sm px-2 py-1 lg:px-4 lg:py-2 rounded-full">
              <Award className="w-5 h-5 lg:w-4 lg:h-4 text-yellow-300" />
              <span className="hidden sm:inline lg:inline">
                Олон улсын сертификат
              </span>
              <span className="sm:hidden lg:hidden">Сертификат</span>
            </div>
            <div className="flex items-center gap-1 lg:gap-2 bg-gradient-to-r from-blue-300/50 to-emerald-300/50 backdrop-blur-sm px-2 py-1 lg:px-4 lg:py-2 rounded-full">
              <Globe className="w-5 h-5 lg:w-4 lg:h-4 text-blue-300" />
              <span className="hidden sm:inline lg:inline">
                Дэлхийн стандарт
              </span>
              <span className="sm:hidden lg:hidden">Стандарт</span>
            </div>
            <div className="flex items-center gap-1 lg:gap-2 bg-gradient-to-r from-blue-300/50 to-emerald-300/50 backdrop-blur-sm px-2 py-1 lg:px-4 lg:py-3 rounded-full">
              <Brain className="w-5 h-5 lg:w-4 lg:h-4 text-emerald-300" />
              <span className="hidden sm:inline lg:inline">Ухаалаг систем</span>
              <span className="sm:hidden lg:hidden">Систем</span>
            </div>
            <div className="flex items-center gap-1 lg:gap-2 bg-gradient-to-r from-blue-300/50 to-emerald-300/50 backdrop-blur-sm px-2 py-1 lg:px-4 lg:py-3 rounded-full">
              <Lightbulb className="w-5 h-5 lg:w-4 lg:h-4 text-orange-300" />
              <span className="hidden sm:inline lg:inline">Шинэлэг арга</span>
              <span className="sm:hidden lg:hidden">Арга</span>
            </div>
          </div>

          {/* Enhanced Floating Icons - Only shown on desktop (970px+) */}
          <div className="hidden lg:block">
            <div className="absolute bottom-20 left-20 animate-bounce">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-2xl backdrop-blur-sm flex items-center justify-center shadow-xl">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="absolute top-1/3 right-20 animate-pulse">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-400 rounded-full backdrop-blur-sm flex items-center justify-center shadow-xl">
                <Globe className="w-6 h-6 text-white" />
              </div>
            </div>
            <div
              className="absolute top-1/2 left-16 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
            </div>
            <div
              className="absolute bottom-1/3 right-16 animate-pulse"
              style={{ animationDelay: "1s" }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-white/95 backdrop-blur-sm relative min-h-[50vh] lg:min-h-screen">
        {/* Curved edge with gradient - Desktop only (970px+) */}
        <div className="hidden lg:block absolute left-0 top-0 h-full w-8 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-r-full"></div>

        {/* Mobile/Tablet gradient line (below 970px) */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-emerald-500"></div>

        <div className="flex items-center justify-center h-full px-6 lg:px-12 py-8 lg:py-0">
          <div className="w-full max-w-sm lg:max-w-md">
            {/* Header */}
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mb-2 lg:mb-3">
                Нэвтрэх
              </h2>
              <p className="text-gray-600 text-base lg:text-lg">
                Өөрийн эрхээр нэвтэрнэ үү
              </p>
            </div>

            {/* Form with React Hook Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 lg:space-y-8"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        И-мэйл хаяг
                      </FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4 lg:w-5 lg:h-5" />
                        <FormControl>
                          <Input
                            placeholder="И-мэйл хаягаа оруулна уу"
                            className="w-full pl-10 lg:pl-12 pr-3 lg:pr-4 py-3 lg:py-4 border border-blue-200 rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 bg-blue-50/50 hover:bg-white text-base lg:text-lg"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Нууц үг
                      </FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4 lg:w-5 lg:h-5" />
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Нууц үгээ оруулна уу"
                            className="w-full pl-10 lg:pl-12 pr-10 lg:pr-12 py-3 lg:py-4 border border-blue-200 rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200 bg-blue-50/50 hover:bg-white text-base lg:text-lg"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" />
                          ) : (
                            <Eye className="w-4 h-4 lg:w-5 lg:h-5" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-semibold py-4 lg:py-5 rounded-xl lg:rounded-2xl transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 lg:gap-3 group text-base lg:text-lg mt-6 lg:mt-8"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 lg:w-6 lg:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Нэвтрэх
                      <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            {/* Footer */}
            <div className="text-center mt-8 lg:mt-12">
              <p className="text-gray-400 text-xs lg:text-sm">
                © 2025 EduLab Management Company-ийн бүтээл
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
