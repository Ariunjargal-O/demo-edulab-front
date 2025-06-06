"use client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  User,
  BookOpen,
  Trophy,
  TrendingUp,
  Calendar,
  Bell,
  Download,
  Eye,
} from "lucide-react";

const StudentDashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState("бүгд");

  // Өгөгдлүүд
  const studentInfo = {
    name: "Уянга Сүхбат",
    class: "12-р анги А",

    teacher: "Баасандаш багш",
    profileImage: "https://via.placeholder.com/100x100/4F46E5/white?text=ББ",
  };

  const subjects = [
    { name: "Математик", score: 85, grade: "Сайн", color: "#4F46E5" },
    { name: "Монгол хэл", score: 92, grade: "Маш сайн", color: "#059669" },
    { name: "Англи хэл", score: 78, grade: "Сайн", color: "#DC2626" },
    { name: "Физик", score: 88, grade: "Сайн", color: "#7C2D12" },
    { name: "Хими", score: 90, grade: "Маш сайн", color: "#9333EA" },
    { name: "Биологи", score: 83, grade: "Сайн", color: "#EA580C" },
  ];

  const monthlyProgress = [
    { month: "9-р сар", average: 82 },
    { month: "10-р сар", average: 85 },
    { month: "11-р сар", average: 87 },
    { month: "12-р сар", average: 86 },
    { month: "1-р сар", average: 89 },
  ];

  const attendanceData = [
    { name: "Ирсэн", value: 92, color: "#059669" },
    { name: "Өвчтэй", value: 6, color: "#F59E0B" },
    { name: "Чөлөөтэй", value: 2, color: "#DC2626" },
  ];

  const classRanking = {
    position: 5,
    total: 28,
    percentage: 82.1,
  };

  const recentActivities = [
    {
      date: "2025-01-15",
      subject: "Математик",
      activity: "Шалгалт",
      score: 88,
    },
    {
      date: "2025-01-12",
      subject: "Монгол хэл",
      activity: "Даалгавар",
      score: 95,
    },
    {
      date: "2025-01-10",
      subject: "Англи хэл",
      activity: "Бие даалт",
      score: 76,
    },
    { date: "2025-01-08", subject: "Физик", activity: "Лаборатори", score: 90 },
  ];

  const getGradeColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-blue-600 bg-blue-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden pt-30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-indigo-200/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200/20 rounded-full animate-ping"></div>
      </div>

      <div className="pt-8 px-4 md:px-10 pb-10 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={studentInfo.profileImage}
                  alt="Сурагчийн зураг"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {studentInfo.name}
                  </h1>
                  <p className="text-gray-600">
                    {studentInfo.class} - {studentInfo.teacher}
                  </p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
                  <Download size={16} />
                  <span>Тайлан татах</span>
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700">
                  <Bell size={16} />
                  <span>Мэдэгдэл</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ерөнхий дундаж</p>
                  <p className="text-3xl font-bold text-blue-600">86.5</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Trophy className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ангийн байрлал</p>
                  <p className="text-3xl font-bold text-green-600">
                    {classRanking.position}/{classRanking.total}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ирц</p>
                  <p className="text-3xl font-bold text-purple-600">92%</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Calendar className="text-purple-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Хичээлийн тоо</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {subjects.length}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <BookOpen className="text-orange-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Хичээлийн дүн */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Хичээлийн дүнгүүд
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjects}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Ирцийн график */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Ирцийн байдал</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {attendanceData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Сарын дундаж */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Сарын дундаж оноо</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="average"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    dot={{ fill: "#4F46E5", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Сүүлийн үйл ажиллагаа */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">
                Сүүлийн үнэлгээнүүд
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.subject}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.activity}
                      </p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(
                        activity.score
                      )}`}
                    >
                      {activity.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Дэлгэрэнгүй хичээлийн дүн */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">
              Хичээл тус бүрийн дэлгэрэнгүй
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {subject.name}
                    </h4>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: subject.color }}
                    >
                      {subject.score}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-sm ${getGradeColor(
                        subject.score
                      )}`}
                    >
                      {subject.grade}
                    </span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${subject.score}%`,
                        backgroundColor: subject.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
