"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, BookOpen, TrendingUp, Award, Target, BarChart3, PieChart } from "lucide-react";
import React, { useState } from "react";

export default function Page() {
  const [selectedPeriod, setSelectedPeriod] = useState("current");

  // Sample data for the dashboard
  const performanceData = {
    totalStudents: 847,
    averageGrade: 8.4,
    attendanceRate: 92.3,
    graduationRate: 96.8,
    topSubjects: [
      { name: "Математик", score: 9.2, students: 234 },
      { name: "Монгол хэл", score: 8.9, students: 256 },
      { name: "Англи хэл", score: 8.7, students: 198 },
      { name: "Физик", score: 8.5, students: 167 }
    ],
    recentAchievements: [
      { student: "Б.Болормаа", achievement: "Математикийн олимпиад - 1-р байр", date: "2025-05-28" },
      { student: "Т.Төмөрбаатар", achievement: "Англи хэлний уралдаан - 2-р байр", date: "2025-05-25" },
      { student: "Д.Дулгуун", achievement: "Шинжлэх ухааны төсөл - Шилдэг", date: "2025-05-20" }
    ],
    gradeDistribution: [
      { grade: "10", count: 42, percentage: 12.3 },
      { grade: "9", count: 89, percentage: 26.1 },
      { grade: "8", count: 134, percentage: 39.3 },
      { grade: "7", count: 67, percentage: 19.6 },
      { grade: "6-доор", count: 9, percentage: 2.6 }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative pt-20">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200/15 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-28 h-28 bg-indigo-200/15 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-purple-200/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-40 w-36 h-36 bg-pink-200/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-cyan-200/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-emerald-200/10 rounded-full animate-pulse"></div>
      </div>
      
      <div className="pt-16 pb-10 px-4 md:px-10 flex flex-col gap-6 relative z-10">
        {/* Header Card */}
        <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-3xl font-bold leading-8 text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              Сурагчдын амжилт үзүүлэлт
            </CardTitle>
            <p className="text-slate-600 mt-2">2024-2025 оны хичээлийн жилийн тайлан</p>
          </CardHeader>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/80 to-blue-600/80 text-white backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Нийт сурагчид</p>
                  <p className="text-3xl font-bold">{performanceData.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/80 to-green-600/80 text-white backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Дундаж үнэлгээ</p>
                  <p className="text-3xl font-bold">{performanceData.averageGrade}</p>
                </div>
                <Target className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/80 to-purple-600/80 text-white backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Ирц</p>
                  <p className="text-3xl font-bold">{performanceData.attendanceRate}%</p>
                </div>
                <BookOpen className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/80 to-amber-600/80 text-white backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">Төгсөлтийн хувь</p>
                  <p className="text-3xl font-bold">{performanceData.graduationRate}%</p>
                </div>
                <Award className="h-8 w-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Subjects */}
          <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Шилдэг хичээлүүд
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.topSubjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-800">{subject.name}</h3>
                      <p className="text-sm text-slate-600">{subject.students} сурагч</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">{subject.score}</div>
                      <div className="text-xs text-slate-500">дундаж</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Grade Distribution */}
          <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-purple-600" />
                Үнэлгээний тархалт
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {performanceData.gradeDistribution.map((grade, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-12 text-sm font-medium text-slate-700">
                      {grade.grade}
                    </div>
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${grade.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-slate-600 w-16">
                      {grade.count} хүн
                    </div>
                    <div className="text-sm text-slate-500 w-12">
                      {grade.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-600" />
              Сүүлийн амжилтууд
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200/50">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">{achievement.student}</h3>
                    <p className="text-slate-600 mt-1">{achievement.achievement}</p>
                    <p className="text-sm text-slate-500 mt-2">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-600 text-sm">
            Мэдээлэл шинэчлэгдсэн: 2025.06.05 | 
            <span className="text-blue-600 ml-1">Боловсролын системийн удирдлага</span>
          </p>
        </div>
      </div>
    </div>
  );
}