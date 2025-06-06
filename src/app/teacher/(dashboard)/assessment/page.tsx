"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  User,
  Calendar,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Award,
  Users,
  Clock,
  Filter,
  Download,
  Eye,
} from "lucide-react";
interface ShowDetails {
    [key: number]: boolean;
  }
// Mock data for demonstration
const teacherData = {
  name: "Д.Баасандаш",
  subject: "Математик",
  grade: "10-р анги",
  experience: "15 жил",
  averageRating: 4.3,
  totalEvaluations: 45,
  recentEvaluations: 8,
};

const evaluationStats = [
  { criteria: "Хичээлийн бэлтгэл", average: 4.5, total: 45 },
  { criteria: "Заах арга барил", average: 4.2, total: 45 },
  { criteria: "Сурагчтай харилцах", average: 4.6, total: 45 },
  { criteria: "Анги удирдах", average: 4.1, total: 45 },
  { criteria: "Мэргэжлийн хөгжил", average: 4.0, total: 45 },
];

const recentEvaluations = [
  {
    id: 1,
    date: "2024-12-01",
    studentName: "Сурагч A",
    rating: 5,
    comment: "Маш сайн багш. Хичээлийг ойлгомжтой тайлбарладаг.",
    criteria: {
      preparation: 5,
      teaching: 5,
      communication: 5,
      management: 4,
      development: 5,
    },
  },
  {
    id: 2,
    date: "2024-11-28",
    studentName: "Сурагч B",
    rating: 4,
    comment: "Сайн багш боловч заримдаа хурдан ярьдаг.",
    criteria: {
      preparation: 4,
      teaching: 4,
      communication: 3,
      management: 4,
      development: 4,
    },
  },
  {
    id: 3,
    date: "2024-11-25",
    studentName: "Сурагч C",
    rating: 4,
    comment: "Математикийг сонирхолтой болгож заадаг.",
    criteria: {
      preparation: 5,
      teaching: 4,
      communication: 4,
      management: 4,
      development: 3,
    },
  },
  {
    id: 4,
    date: "2024-11-22",
    studentName: "Сурагч D",
    rating: 5,
    comment: "Өөрт итгэл төрүүлдэг, тусламж үзүүлдэг багш.",
    criteria: {
      preparation: 5,
      teaching: 5,
      communication: 5,
      management: 5,
      development: 4,
    },
  },
];

const monthlyData = [
  { month: "1-р сар", rating: 4.1, count: 8 },
  { month: "2-р сар", rating: 4.2, count: 7 },
  { month: "3-р сар", rating: 4.0, count: 9 },
  { month: "4-р сар", rating: 4.4, count: 6 },
  { month: "5-р сар", rating: 4.3, count: 8 },
  { month: "6-р сар", rating: 4.5, count: 7 },
];

export default function TeacherEvaluationResultsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  const [showDetails, setShowDetails] = useState<ShowDetails>({});
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : index < rating
            ? "text-yellow-400 fill-yellow-400/50"
            : "text-gray-300"
        }`}
      />
    ));
  };


  const toggleDetails = (id: number) => {
    setShowDetails(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  const getRatingColor = (rating: number): string => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    if (rating >= 3.5) return "text-yellow-600";
    if (rating >= 3.0) return "text-orange-600";
    return "text-red-600";
  };

  const getRatingBgColor = (rating: number): string => {
    if (rating >= 4.5) return "bg-green-100";
    if (rating >= 4.0) return "bg-blue-100";
    if (rating >= 3.5) return "bg-yellow-100";
    if (rating >= 3.0) return "bg-orange-100";
    return "bg-red-100";
  };
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200/15 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-28 h-28 bg-indigo-200/15 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-purple-200/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-40 w-36 h-36 bg-pink-200/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-cyan-200/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-emerald-200/10 rounded-full animate-pulse"></div>
      </div>

      <div className="pt-32 pb-10 px-4 md:px-10 flex flex-col gap-10 relative z-10  mx-auto">
        {/* Header */}
        <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-0">
          <CardHeader>
            <CardTitle className="text-3xl font-bold leading-8 text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text p-8 flex items-center gap-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              Багшийн үнэлгээний үр дүн
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Teacher Info and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Teacher Info */}
          <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
            <CardContent className="p-0">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-t-xl">
                <CardTitle className="text-lg font-bold leading-8 text-slate-800 p-4 flex items-center gap-3">
                  <User className="w-5 h-5" />
                  Багшийн мэдээлэл
                </CardTitle>
              </CardHeader>
              <div className="p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Нэр:</span>
                  <span className="font-semibold">{teacherData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Хичээл:</span>
                  <span className="font-semibold">{teacherData.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Анги:</span>
                  <span className="font-semibold">{teacherData.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Туршлага:</span>
                  <span className="font-semibold">
                    {teacherData.experience}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overall Rating */}
          <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
            <CardContent className="p-0">
              <CardHeader className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-t-xl">
                <CardTitle className="text-lg font-bold leading-8 text-slate-800 p-4 flex items-center gap-3">
                  <Star className="w-5 h-5" />
                  Нийт үнэлгээ
                </CardTitle>
              </CardHeader>
              <div className="p-4 text-center space-y-3">
                <div className="text-4xl font-bold text-yellow-500">
                  {teacherData.averageRating}
                </div>
                <div className="flex justify-center gap-1">
                  {renderStars(teacherData.averageRating)}
                </div>
                <div className="text-sm text-slate-600">
                  {teacherData.totalEvaluations} үнэлгээ
                </div>
                <div className="text-xs text-green-600">
                  Сүүлийн 30 хоногт: {teacherData.recentEvaluations} шинэ
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
            <CardContent className="p-0">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-t-xl">
                <CardTitle className="text-lg font-bold leading-8 text-slate-800 p-4 flex items-center gap-3">
                  <Award className="w-5 h-5" />
                  Үйлдлүүд
                </CardTitle>
              </CardHeader>
              <div className="p-4 space-y-3">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm py-2 rounded-lg flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Тайлан татах
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-blue-200 hover:bg-blue-50 text-blue-600 text-sm py-2 rounded-lg flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Шүүлтүүр
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Criteria Breakdown */}
        <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
          <CardContent className="p-0">
            <CardHeader className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-t-xl">
              <CardTitle className="text-xl font-bold leading-8 text-slate-800 p-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                Шалгуур тус бүрээр үнэлгээ
              </CardTitle>
            </CardHeader>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {evaluationStats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30"
                  >
                    <div className="text-sm font-medium text-slate-700 mb-2">
                      {stat.criteria}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xl font-bold ${getRatingColor(
                            stat.average
                          )}`}
                        >
                          {stat.average}
                        </span>
                        <div className="flex gap-1">
                          {renderStars(stat.average)}
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingBgColor(
                          stat.average
                        )} ${getRatingColor(stat.average)}`}
                      >
                        {stat.total} үнэлгээ
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
          <CardContent className="p-0">
            <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-t-xl">
              <CardTitle className="text-xl font-bold leading-8 text-slate-800 p-6 flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                Сарын дундаж үнэлгээ
              </CardTitle>
            </CardHeader>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {monthlyData.map((month, index) => (
                  <div
                    key={index}
                    className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30 text-center"
                  >
                    <div className="text-sm font-medium text-slate-600 mb-2">
                      {month.month}
                    </div>
                    <div
                      className={`text-2xl font-bold ${getRatingColor(
                        month.rating
                      )} mb-1`}
                    >
                      {month.rating}
                    </div>
                    <div className="text-xs text-slate-500">
                      {month.count} үнэлгээ
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Evaluations */}
        <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
          <CardContent className="p-0">
            <CardHeader className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-t-xl">
              <CardTitle className="text-xl font-bold leading-8 text-slate-800 p-6 flex items-center gap-3">
                <MessageSquare className="w-6 h-6" />
                Сүүлийн үнэлгээнүүд
              </CardTitle>
            </CardHeader>
            <div className="p-6 space-y-4">
              {recentEvaluations.map((evaluation) => (
                <div
                  key={evaluation.id}
                  className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-slate-700">
                        {evaluation.studentName}
                      </div>
                      <div className="text-xs text-slate-500">
                        {evaluation.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {renderStars(evaluation.rating)}
                      </div>
                      <span
                        className={`text-sm font-bold ${getRatingColor(
                          evaluation.rating
                        )}`}
                      >
                        {evaluation.rating}/5
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleDetails(evaluation.id)}
                        className="p-1 h-auto"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-slate-600 mb-3">
                    {evaluation.comment}
                  </div>

                  {showDetails[evaluation.id] && (
                    <div className="mt-4 p-3 bg-white/30 rounded-lg border border-white/20">
                      <div className="text-sm font-medium text-slate-700 mb-2">
                        Дэлгэрэнгүй үнэлгээ:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          Хичээлийн бэлтгэл:{" "}
                          <span className="font-bold">
                            {evaluation.criteria.preparation}/5
                          </span>
                        </div>
                        <div>
                          Заах арга барил:{" "}
                          <span className="font-bold">
                            {evaluation.criteria.teaching}/5
                          </span>
                        </div>
                        <div>
                          Харилцах чадвар:{" "}
                          <span className="font-bold">
                            {evaluation.criteria.communication}/5
                          </span>
                        </div>
                        <div>
                          Анги удирдах:{" "}
                          <span className="font-bold">
                            {evaluation.criteria.management}/5
                          </span>
                        </div>
                        <div>
                          Мэргэжлийн хөгжил:{" "}
                          <span className="font-bold">
                            {evaluation.criteria.development}/5
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
