"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Trophy, BookOpen, Music, Palette, Camera, Globe, Heart, Star } from "lucide-react";
import React, { useState } from "react";

type Activity = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  participants: number;
  icon: React.ComponentType<any>;
  color: string;
};

export default function SchoolActivity() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const activities = [
    {
      id: 1,
      title: "Шинэ жилийн баяр",
      date: "2025-01-01",
      time: "10:00 - 16:00",
      location: "Сургуулийн танхим",
      description: "Шинэ жилийн мэндчилгээ, тоглоом, бүжиг, дуулал",
      category: "Баяр ёслол",
      participants: 200,
      icon: Star,
      color: "from-yellow-400 to-orange-500"
    },
    {
      id: 2,
      title: "Спорт тэмцээн",
      date: "2025-01-15",
      time: "09:00 - 17:00",
      location: "Спорт заал",
      description: "Сагс бөмбөг, хөл бөмбөг, волейбол тэмцээн",
      category: "Спорт",
      participants: 150,
      icon: Trophy,
      color: "from-green-400 to-blue-500"
    },
    {
      id: 3,
      title: "Номын клуб",
      date: "2025-01-20",
      time: "14:00 - 16:00",
      location: "Номын сан",
      description: "Сарын шилдэг номын хэлэлцүүлэг",
      category: "Боловсрол",
      participants: 30,
      icon: BookOpen,
      color: "from-purple-400 to-pink-500"
    },
    {
      id: 4,
      title: "Хөгжмийн тоглолт",
      date: "2025-01-25",
      time: "18:00 - 20:00",
      location: "Концертын танхим",
      description: "Сурагчдын хөгжмийн чадварыг харуулах тоглолт",
      category: "Урлаг",
      participants: 100,
      icon: Music,
      color: "from-indigo-400 to-purple-500"
    },
    {
      id: 5,
      title: "Уран зургийн үзэсгэлэн",
      date: "2025-02-01",
      time: "10:00 - 18:00",
      location: "Уран зургийн өрөө",
      description: "Сурагчдын уран бүтээлийн үзэсгэлэн",
      category: "Урлаг",
      participants: 80,
      icon: Palette,
      color: "from-pink-400 to-red-500"
    },
    {
      id: 6,
      title: "Гэрэл зургийн уралдаан",
      date: "2025-02-10",
      time: "13:00 - 17:00",
      location: "Сургуулийн хашаа",
      description: "Байгалийн гэрэл зургийн уралдаан",
      category: "Уралдаан",
      participants: 50,
      icon: Camera,
      color: "from-cyan-400 to-blue-500"
    },
    {
      id: 7,
      title: "Хэл соёлын өдөр",
      date: "2025-02-15",
      time: "09:00 - 15:00",
      location: "Сургуулийн танхим",
      description: "Олон улсын хэл соёлын танилцуулга",
      category: "Соёл",
      participants: 180,
      icon: Globe,
      color: "from-emerald-400 to-teal-500"
    },
    {
      id: 8,
      title: "Буяны арга хэмжээ",
      date: "2025-02-20",
      time: "10:00 - 14:00",
      location: "Хотын төв",
      description: "Орон нутгийн буяны үйл ажиллагаа",
      category: "Нийгэм",
      participants: 120,
      icon: Heart,
      color: "from-rose-400 to-pink-500"
    }
  ];

  const categories = ["Бүгд", "Баяр ёслол", "Спорт", "Боловсрол", "Урлаг", "Уралдаан", "Соёл", "Нийгэм"];
  const [selectedCategory, setSelectedCategory] = useState("Бүгд");

  const filteredActivities = selectedCategory === "Бүгд" 
    ? activities 
    : activities.filter(activity => activity.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
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
        {/* Header Card */}
        <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-3xl font-bold leading-8 text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text p-8 flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              Сургууль дээр зохиогдох арга хэмжээ
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Category Filter */}
        <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105"
                      : "bg-white/80 text-slate-600 hover:bg-blue-50/80 hover:text-blue-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <Card 
                key={activity.id}
                className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => setSelectedActivity(activity)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${activity.color} shadow-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100/80 px-2 py-1 rounded-full">
                      {activity.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800 mt-3">
                    {activity.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{activity.date} | {activity.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{activity.participants} оролцогч</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {activity.description}
                    </p>
                    <div className="text-xs text-slate-500 bg-slate-50/80 px-3 py-1 rounded-full inline-block">
                      📍 {activity.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Activity Detail Modal */}
        {selectedActivity && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="bg-white/95 backdrop-blur-lg border-white/50 shadow-2xl max-w-lg w-full max-h-[80vh] overflow-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedActivity.color} shadow-lg`}>
                      <selectedActivity.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-slate-800">
                        {selectedActivity.title}
                      </CardTitle>
                      <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                        {selectedActivity.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-blue-700 mb-2">
                      <Calendar className="h-5 w-5" />
                      <span className="font-semibold">Огноо ба цаг</span>
                    </div>
                    <p className="text-blue-600">{selectedActivity.date} | {selectedActivity.time}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                      <Users className="h-5 w-5" />
                      <span className="font-semibold">Оролцогчид</span>
                    </div>
                    <p className="text-green-600">{selectedActivity.participants} хүн</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-purple-700 mb-2">
                      <span className="font-semibold">📍 Байршил</span>
                    </div>
                    <p className="text-purple-600">{selectedActivity.location}</p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-orange-700 mb-2">
                      <span className="font-semibold">📝 Дэлгэрэнгүй</span>
                    </div>
                    <p className="text-orange-600 leading-relaxed">{selectedActivity.description}</p>
                  </div>

                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Хаах
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}