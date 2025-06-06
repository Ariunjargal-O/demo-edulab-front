"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Trophy, Music, Palette, Dumbbell, BookOpen, Globe, Heart, Star, Activity, Target } from "lucide-react";
import React, { useState } from "react";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample data for extracurricular activities
  const activitiesData = {
    totalParticipants: 623,
    activeClubs: 18,
    monthlyEvents: 12,
    achievements: 24,
    categories: [
      {
        id: "sports",
        name: "Спорт",
        icon: Dumbbell,
        color: "from-red-500 to-red-600",
        participants: 185,
        clubs: ["Сагсан бөмбөг", "Хөл бөмбөг", "Волейбол", "Бариалдаан", "Хүүхдийн гүйлт"]
      },
      {
        id: "arts",
        name: "Урлаг",
        icon: Palette,
        color: "from-purple-500 to-purple-600",
        participants: 142,
        clubs: ["Зураг", "Барималжуулалт", "Хээ угалз", "Гар урлал", "Дизайн"]
      },
      {
        id: "music",
        name: "Хөгжим",
        icon: Music,
        color: "from-pink-500 to-pink-600",
        participants: 98,
        clubs: ["Найрал дуу", "Морин хуур", "Пиано", "Гитар", "Бүжиг"]
      },
      {
        id: "science",
        name: "Шинжлэх ухаан",
        icon: Activity,
        color: "from-blue-500 to-blue-600",
        participants: 76,
        clubs: ["Робот техник", "Химийн лаб", "Физикийн туршилт", "Математик", "Байгаль орчин"]
      },
      {
        id: "language",
        name: "Хэл судлал",
        icon: Globe,
        color: "from-green-500 to-green-600",
        participants: 89,
        clubs: ["Англи хэл", "Хятад хэл", "Орос хэл", "Япон хэл", "Дебат клуб"]
      },
      {
        id: "community",
        name: "Нийгмийн үйлчилгээ",
        icon: Heart,
        color: "from-amber-500 to-amber-600",
        participants: 33,
        clubs: ["Сайн дурын ажил", "Байгаль хамгаалал", "Өндөр настай тусламж", "Аюулгүй замын хөдөлгөөн"]
      }
    ],
    upcomingEvents: [
      {
        name: "Сургуулийн спортын наадам",
        date: "2025-06-15",
        category: "sports",
        participants: 200,
        location: "Спортын талбай"
      },
      {
        name: "Урлагийн үзэсгэлэн",
        date: "2025-06-20",
        category: "arts",
        participants: 85,
        location: "Урлагийн танхим"
      },
      {
        name: "Хөгжмийн тоглолт",
        date: "2025-06-25",
        category: "music",
        participants: 45,
        location: "Их танхим"
      },
      {
        name: "Шинжлэх ухааны үзэсгэлэн",
        date: "2025-07-01",
        category: "science",
        participants: 60,
        location: "Лабораторийн танхим"
      }
    ],
    recentAchievements: [
      {
        student: "Д.Энхбаяр",
        activity: "Хөл бөмбөгийн аварга шалгаруулах",
        award: "Алтан медаль",
        date: "2025-05-28"
      },
      {
        student: "Б.Сарантуяа",
        activity: "Зургийн уралдаан",
        award: "1-р байр",
        date: "2025-05-25"
      },
      {
        student: "Т.Батбаяр",
        activity: "Англи хэлний уралдаан",
        award: "Шилдэг оролцогч",
        date: "2025-05-22"
      },
      {
        student: "М.Өнөөжин",
        activity: "Робот бүтээх уралдаан",
        award: "Инноваци шагнал",
        date: "2025-05-20"
      }
    ],
    weeklySchedule: [
      { day: "Даваа", activities: ["Сагсан бөмбөг", "Найрал дуу", "Англи хэл клуб"] },
      { day: "Мягмар", activities: ["Волейбол", "Зураг", "Робот техник"] },
      { day: "Лхагва", activities: ["Хөл бөмбөг", "Пиано", "Дебат клуб"] },
      { day: "Пүрэв", activities: ["Бариалдаан", "Бүжиг", "Химийн лаб"] },
      { day: "Баасан", activities: ["Гүйлт", "Гитар", "Байгаль орчин"] }
    ]
  };

  const filteredCategories = selectedCategory === "all" 
    ? activitiesData.categories 
    : activitiesData.categories.filter(cat => cat.id === selectedCategory);

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
              Сурагчдын сургуулиас гадуурх үйл ажилгаа
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
                  <p className="text-blue-100 text-sm font-medium">Нийт оролцогчид</p>
                  <p className="text-3xl font-bold">{activitiesData.totalParticipants}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/80 to-purple-600/80 text-white backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Идэвхтэй клубууд</p>
                  <p className="text-3xl font-bold">{activitiesData.activeClubs}</p>
                </div>
                <Target className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/80 to-green-600/80 text-white backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Сарын арга хэмжээ</p>
                  <p className="text-3xl font-bold">{activitiesData.monthlyEvents}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/80 to-amber-600/80 text-white backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">Амжилт</p>
                  <p className="text-3xl font-bold">{activitiesData.achievements}</p>
                </div>
                <Trophy className="h-8 w-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === "all"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-white/50 text-slate-700 hover:bg-white/80"
                }`}
              >
                Бүгд
              </button>
              {activitiesData.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-white/50 text-slate-700 hover:bg-white/80"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className={`bg-gradient-to-br ${category.color} text-white p-4 rounded-lg mb-4`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{category.name}</h3>
                        <p className="text-white/80">{category.participants} оролцогч</p>
                      </div>
                      <IconComponent className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {category.clubs.map((club, index) => (
                      <div key={index} className="flex items-center gap-2 text-slate-700">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm">{club}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Удахгүй болох арга хэмжээ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activitiesData.upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200/50">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{event.name}</h3>
                      <p className="text-slate-600 text-sm mt-1">{event.location}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                        <span>{event.date}</span>
                        <span>{event.participants} оролцогч</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Schedule */}
          <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                7 хоногийн хуваарь
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activitiesData.weeklySchedule.map((day, index) => (
                  <div key={index} className="border-l-4 border-purple-400 pl-4 py-2">
                    <h3 className="font-semibold text-slate-800 mb-2">{day.day}</h3>
                    <div className="space-y-1">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="text-sm text-slate-600 bg-purple-50 px-3 py-1 rounded-full inline-block mr-2 mb-1">
                          {activity}
                        </div>
                      ))}
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
              <Trophy className="h-5 w-5 text-amber-600" />
              Сүүлийн амжилтууд
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activitiesData.recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200/50">
                  <Star className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">{achievement.student}</h3>
                    <p className="text-slate-600 text-sm mt-1">{achievement.activity}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-amber-600 font-medium text-sm">{achievement.award}</span>
                      <span className="text-slate-500 text-xs">{achievement.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
      
      </div>
    </div>
  );
}