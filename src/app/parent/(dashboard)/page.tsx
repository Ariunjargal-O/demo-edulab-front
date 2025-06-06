"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Users, Phone, GraduationCap, FileText, Calendar, MessageSquare, ArrowRight } from "lucide-react";

// Mock data for demonstration
const studentData = {
  firstName: "Сүхбат",
  lastName: "Уянга",
  gender: "Эрэгтэй",
  email: "suhee@example.com",
  gradeId: "12-р анги",
  group: "А бүлэг",
  teacher: "Д. Баасандаш",
  teacherPhone: "80405058"
};

export default function StudentPage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative ">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200/15 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-28 h-28 bg-indigo-200/15 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-purple-200/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-40 w-36 h-36 bg-pink-200/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-cyan-200/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-emerald-200/10 rounded-full animate-pulse"></div>
      </div>
      <div className="pt-32 pb-10 px-4 md:px-10 flex flex-col gap-10 relative z-10">
        {/* Welcome Header */}
        <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-0">
          <CardHeader>
            <CardTitle className="text-3xl font-bold leading-8 text-slate-800 p-8">
              Сайн байна уу? Сурагч{" "}
              <span className="text-blue-600">{studentData.firstName}</span> -ийн эцэг эх
            </CardTitle>
          </CardHeader>
        </Card>


        <div className="flex gap-10 flex-col lg:flex-row">
          {/* Left Column - Student Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-10">
            {/* Student Profile Card */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
              <CardContent className="p-0">
                <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-t-xl">
                  <CardTitle className="text-2xl font-bold leading-8 text-slate-800 p-6 flex items-center gap-3">
                    <User className="w-6 h-6" />
                    Сурагчийн мэдээлэл
                  </CardTitle>
                </CardHeader>
                <div className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-slate-600">Овог:</span>
                      </div>
                      <p className="text-lg font-semibold text-slate-800">{studentData.lastName}</p>
                    </div>

                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-slate-600">Нэр:</span>
                      </div>
                      <p className="text-lg font-semibold text-slate-800">{studentData.firstName}</p>
                    </div>

                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-slate-600">Хүйс:</span>
                      </div>
                      <p className="text-lg font-semibold text-slate-800">{studentData.gender}</p>
                    </div>

                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-slate-600">Майл хаяг:</span>
                      </div>
                      <p className="text-lg font-semibold text-slate-800">{studentData.email}</p>
                    </div>

                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="flex items-center gap-3 mb-2">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-slate-600">Анги:</span>
                      </div>
                      <p className="text-lg font-semibold text-slate-800">{studentData.gradeId}</p>
                    </div>

                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-slate-600">Бүлэг:</span>
                      </div>
                      <p className="text-lg font-semibold text-slate-800">{studentData.group}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teacher Contact Card */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
              <CardContent className="p-0">
                <CardHeader className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-t-xl">
                  <CardTitle className="text-xl font-bold leading-8 text-slate-800 p-6 flex items-center gap-3">
                    <GraduationCap className="w-6 h-6" />
                    Ангийн багш
                  </CardTitle>
                </CardHeader>
                <div className="p-6 space-y-4">
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-slate-600">Багшийн нэр:</span>
                    </div>
                    <p className="text-lg font-semibold text-slate-800">{studentData.teacher}</p>
                  </div>

                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-slate-600">Багшийн утас:</span>
                    </div>
                    <p className="text-lg font-semibold text-slate-800">{studentData.teacherPhone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions and Schedule */}
          <div className="w-full lg:w-1/2 flex flex-col gap-10">
            {/* Quick Actions Card */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
              <CardContent className="p-0">
                <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-t-xl">
                  <CardTitle className="text-xl font-bold leading-8 text-slate-800 p-6 flex items-center gap-3">
                    <FileText className="w-6 h-6" />
                    Үйлдлүүд
                  </CardTitle>
                </CardHeader>
                <div className="p-6 space-y-4">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-3">
                      <FileText className="w-5 h-5" />
                      Сургуулийн тодорхойлолт авах
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-3">
                      <Calendar className="w-5 h-5" />
                      Чөлөөний хүсэлт
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <Button
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-3">
                      <ArrowRight className="w-5 h-5" />
                      Шилжих хүсэлт
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <Button
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5" />
                      Багштай холбоотой гомдол гаргах
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Card */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
              <CardContent className="p-0">
                <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-t-xl">
                  <CardTitle className="text-xl font-bold leading-8 text-slate-800 p-6 flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    Хичээлийн хуваарь
                  </CardTitle>
                </CardHeader>
                <div className="p-6">
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/30 min-h-[400px] flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Calendar className="w-16 h-16 text-indigo-400 mx-auto" />
                      <h3 className="text-lg font-semibold text-slate-700">Хичээлийн хуваарь</h3>
                      <p className="text-slate-600">Хичээлийн хуваарь энд харагдана</p>
                      <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                        Хуваарь харах
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}