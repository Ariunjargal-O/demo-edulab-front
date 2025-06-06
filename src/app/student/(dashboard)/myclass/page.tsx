"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, MapPin, Trophy, BookOpen, Camera, Star, CheckCircle, AlertCircle } from "lucide-react";
import React, { useState } from "react";

// Define TypeScript types
type ActivityStatus = 'upcoming' | 'ongoing' | 'completed';
type ActivityCategory = 'academic' | 'sports' | 'science' | 'arts' | 'outdoor' | 'language';

interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  status: ActivityStatus;
  category: ActivityCategory;
  image: string;
  teacher: string;
}

interface FilterCategory {
  key: string;
  label: string;
  icon: string;
}

export default function Activity() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const activities: Activity[] = [
    {
      id: 1,
      title: "Математикийн олимпиад",
      description: "Сургуулийн математикийн олимпиадын бэлтгэл хичээл",
      date: "2024-06-15",
      time: "14:00-16:00",
      location: "202 танхим",
      participants: 25,
      status: "upcoming",
      category: "academic",
      image: "📚",
      teacher: "Б.Батбаяр"
    },
    {
      id: 2,
      title: "Спорт өдөр",
      description: "Ангийн спортын тэмцээн, хөлбөмбөг, сагсан бөмбөг",
      date: "2024-06-20",
      time: "10:00-17:00",
      location: "Спортын заал",
      participants: 45,
      status: "upcoming",
      category: "sports",
      image: "⚽",
      teacher: "Т.Төмөрбаатар"
    },
    {
      id: 3,
      title: "Шинжлэх ухааны үзэсгэлэн",
      description: "Сурагчдын бүтээлийн үзэсгэлэн болон туршилт",
      date: "2024-06-10",
      time: "13:00-15:00",
      location: "Лабораторь",
      participants: 30,
      status: "completed",
      category: "science",
      image: "🔬",
      teacher: "Д.Дулгуун"
    },
    {
      id: 4,
      title: "Уран бүтээлийн уралдаан",
      description: "Зураг, шүлэг, дуу хөгжмийн уралдаан",
      date: "2024-06-25",
      time: "15:00-18:00",
      location: "Актын заал",
      participants: 35,
      status: "upcoming",
      category: "arts",
      image: "🎨",
      teacher: "С.Сарантуяа"
    },
    {
      id: 5,
      title: "Экологийн аялал",
      description: "Байгаль орчны танин мэдэх аялал",
      date: "2024-06-08",
      time: "09:00-17:00",
      location: "Богдхан уул",
      participants: 40,
      status: "completed",
      category: "outdoor",
      image: "🌲",
      teacher: "М.Мөнхбаяр"
    },
    {
      id: 6,
      title: "Англи хэлний клуб",
      description: "Долоо хоног бүрийн англи хэлний ярилцлагын клуб",
      date: "2024-06-14",
      time: "16:00-17:30",
      location: "305 танхим",
      participants: 20,
      status: "ongoing",
      category: "language",
      image: "🗣️",
      teacher: "Ж.Жавхлан"
    }
  ];

  const filterCategories: FilterCategory[] = [
    { key: "all", label: "Бүгд", icon: "📋" },
    { key: "academic", label: "Хичээл", icon: "📚" },
    { key: "sports", label: "Спорт", icon: "⚽" },
    { key: "science", label: "Шинжлэх ухаан", icon: "🔬" },
    { key: "arts", label: "Урлаг", icon: "🎨" },
    { key: "outdoor", label: "Гадаа", icon: "🌲" },
    { key: "language", label: "Хэл", icon: "🗣️" }
  ];

  const statusColors: Record<ActivityStatus, string> = {
    upcoming: "bg-blue-500",
    ongoing: "bg-emerald-500",
    completed: "bg-indigo-500"
  };

  const statusLabels: Record<ActivityStatus, string> = {
    upcoming: "Удахгүй",
    ongoing: "Явагдаж байгаа",
    completed: "Дууссан"
  };

  const filteredActivities = selectedFilter === "all" 
    ? activities 
    : activities.filter(activity => activity.category === selectedFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden pt-30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-16 w-32 h-32 bg-blue-200/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-24 w-24 h-24 bg-indigo-200/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-purple-200/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-16 right-32 w-40 h-40 bg-emerald-200/15 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-rose-200/15 rounded-full animate-bounce"></div>
        <div className="absolute top-2/3 right-1/4 w-28 h-28 bg-indigo-200/15 rounded-full animate-pulse"></div>
      </div>

      <div className="pt-8 pb-12 px-4 md:px-8 relative z-10">
        {/* Header */}
        <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 mb-8">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text flex items-center gap-4">
              <Calendar className="h-10 w-10 text-blue-600" />
              Ангийн үйл ажилгаа
            </CardTitle>
            <p className="text-slate-600 text-lg mt-3">
              Сурагчдын идэвхтэй оролцоо болон хөгжлийн үйл ажилгаанууд
            </p>
          </CardHeader>
        </Card>

        {/* Filter Tabs */}
        <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3">
              {filterCategories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedFilter(category.key)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedFilter === category.key
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105'
                      : 'bg-white/50 text-slate-700 hover:bg-white/70 hover:scale-102'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {filteredActivities.map((activity, index) => (
            <Card 
              key={activity.id}
              className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden hover:bg-white/70"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <CardHeader className="relative pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                      {activity.image}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {activity.title}
                      </CardTitle>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white mt-2 ${statusColors[activity.status]}`}>
                        {activity.status === 'ongoing' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {activity.status === 'upcoming' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {activity.status === 'completed' && <Star className="w-3 h-3 mr-1" />}
                        {statusLabels[activity.status]}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  {activity.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">{activity.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-slate-700">
                    <Clock className="h-5 w-5 text-indigo-500" />
                    <span>{activity.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-slate-700">
                    <MapPin className="h-5 w-5 text-purple-500" />
                    <span>{activity.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-slate-700">
                    <Users className="h-5 w-5 text-emerald-500" />
                    <span>{activity.participants} сурагч</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-slate-700">
                    <BookOpen className="h-5 w-5 text-rose-500" />
                    <span className="font-medium">{activity.teacher}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/50">
                  <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Дэлгэрэнгүй үзэх
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>



        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-3" />
              <div className="text-3xl font-bold">12</div>
              <div className="text-blue-100">Дууссан үйл ажилгаа</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-xl">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3" />
              <div className="text-3xl font-bold">195</div>
              <div className="text-indigo-100">Нийт оролцогчид</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-3" />
              <div className="text-3xl font-bold">8</div>
              <div className="text-purple-100">Удахгүй болох</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-3" />
              <div className="text-3xl font-bold">4.8</div>
              <div className="text-emerald-100">Дундаж үнэлгээ</div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-slate-600">
            Үйл ажилгааны мэдээлэл | 
            <span className="text-blue-600 ml-1 font-semibold">Ангийн удирдлага</span>
          </p>
        </div>
      </div>
    </div>
  );
}