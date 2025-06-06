"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Clock, MapPin, Trophy, BookOpen, Music, Palette, Heart, Star, Filter, Search, ChevronRight, Activity } from "lucide-react";
import React, { useState } from "react";

type ClassActivity = {
  id: number;
  title: string;
  className: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  description: string;
  teacher: string;
  participants: number;
  maxParticipants: number;
  category: string;
  status: "Төлөвлөсөн" | "Үргэлжилж байгаа" | "Дууссан" | "Цуцалсан";
  requirements: string[];
  objectives: string[];
  icon: React.ComponentType<any>;
  color: string;
};

export default function Page() {
  const [selectedActivity, setSelectedActivity] = useState<ClassActivity | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("Бүгд");
  const [statusFilter, setStatusFilter] = useState("Бүгд");

  const activities: ClassActivity[] = [
    {
      id: 1,
      title: "Математикийн олимпиадын бэлтгэл",
      className: "10-А анги",
      date: "2025-06-10",
      time: "14:00",
      duration: "2 цаг",
      location: "Математикийн танхим",
      description: "Олон улсын математикийн олимпиадад оролцох сурагчдын бэлтгэл хичээл",
      teacher: "Багш Болдбаатар",
      participants: 15,
      maxParticipants: 20,
      category: "Академик",
      status: "Төлөвлөсөн",
      requirements: ["Математикийн суурь мэдлэг", "Тооцоолуур", "Тэмдэглэлийн дэвтэр"],
      objectives: ["Бодлого шийдэх арга барилыг сайжруулах", "Логик сэтгэлгээг хөгжүүлэх"],
      icon: BookOpen,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Хөгжмийн чуулгын дадлага",
      className: "9-Б анги",
      date: "2025-06-08",
      time: "15:30",
      duration: "1.5 цаг",
      location: "Хөгжмийн танхим",
      description: "Сургуулийн баярт тоглох дууны бэлтгэл дадлага",
      teacher: "Багш Сарангэрэл",
      participants: 25,
      maxParticipants: 30,
      category: "Урлаг",
      status: "Үргэлжилж байгаа",
      requirements: ["Хөгжмийн зэмсэг", "Дуу авиа"],
      objectives: ["Хамтран хөгжимдөх чадварыг бүрдүүлэх", "Тайзны дээрх өөртөө итгэх итгэлийг нэмэгдүүлэх"],
      icon: Music,
      color: "from-pink-500 to-rose-600"
    },
    {
      id: 3,
      title: "Спортын тэмцээнийг зохион байгуулах",
      className: "11-А анги",
      date: "2025-06-12",
      time: "10:00",
      duration: "4 цаг",
      location: "Спортын талбай",
      description: "Ангиудын хооронд спортын тэмцээн зохион байгуулах арга хэмжээ",
      teacher: "Багш Энхбаяр",
      participants: 40,
      maxParticipants: 50,
      category: "Спорт",
      status: "Төлөвлөсөн",
      requirements: ["Спортын хувцас", "Усны сав", "Эхний тусламжийн хэрэгсэл"],
      objectives: ["Эрүүл мэндийг сахиулах", "Багийн ажиллагааг дэмжих"],
      icon: Trophy,
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 4,
      title: "Уран зургийн үзэсгэлэн",
      className: "12-Б анги",
      date: "2025-06-15",
      time: "13:00",
      duration: "3 цаг",
      location: "Уран зургийн танхим",
      description: "Сурагчдын уран бүтээлийн үзэсгэлэн зохион байгуулах",
      teacher: "Багш Номинчимэг",
      participants: 20,
      maxParticipants: 25,
      category: "Урлаг",
      status: "Дууссан",
      requirements: ["Уран зургийн хэрэгсэл", "Зургийн цаас", "Хувцасны хамгаалалт"],
      objectives: ["Уран сайхны мэдрэмжийг хөгжүүлэх", "Бүтээлч сэтгэлгээг дэмжих"],
      icon: Palette,
      color: "from-purple-500 to-violet-600"
    },
    {
      id: 5,
      title: "Нийгмийн үйлчилгээний өдөр",
      className: "10-Б анги",
      date: "2025-06-20",
      time: "09:00",
      duration: "6 цаг",
      location: "Хотын төв",
      description: "Орон нутгийн нийгэмд үйлчилж, буяны үйл ажиллагаа явуулах",
      teacher: "Багш Цэцэгмаа",
      participants: 30,
      maxParticipants: 35,
      category: "Нийгэм",
      status: "Төлөвлөсөн",
      requirements: ["Ажлын хувцас", "Хамгаалалтын бээлий", "Цэвэрлэгээний хэрэгсэл"],
      objectives: ["Нийгэмд хариуцлагатай хандахуйц төлөвшүүлэх", "Хамтын ажиллагааг сурах"],
      icon: Heart,
      color: "from-orange-500 to-red-600"
    },
    {
      id: 6,
      title: "Шинжлэх ухааны туршилт",
      className: "9-А анги",
      date: "2025-06-18",
      time: "11:00",
      duration: "2.5 цаг",
      location: "Лаборатори",
      description: "Химийн болон физикийн туршилтуудыг хийж, шинжлэх ухааны мэдлэгийг практикт хэрэглэх",
      teacher: "Багш Баттөр",
      participants: 18,
      maxParticipants: 20,
      category: "Шинжлэх ухаан",
      status: "Үргэлжилж байгаа",
      requirements: ["Лабораторийн халаад", "Хамгаалалтын нүдний шил", "Тэмдэглэл"],
      objectives: ["Шинжлэх ухааны онолыг практикт хэрэглэх", "Аюулгүй ажиллах дүрмийг эзэмшүүлэх"],
      icon: Activity,
      color: "from-cyan-500 to-blue-600"
    }
  ];

  const classes = ["Бүгд", "9-А анги", "9-Б анги", "10-А анги", "10-Б анги", "11-А анги", "12-Б анги"];
  const statuses = ["Бүгд", "Төлөвлөсөн", "Үргэлжилж байгаа", "Дууссан", "Цуцалсан"];
  const categories = ["Академик", "Урлаг", "Спорт", "Нийгэм", "Шинжлэх ухаан"];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.className.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === "Бүгд" || activity.className === classFilter;
    const matchesStatus = statusFilter === "Бүгд" || activity.status === statusFilter;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Төлөвлөсөн": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Үргэлжилж байгаа": return "bg-green-100 text-green-700 border-green-200";
      case "Дууссан": return "bg-gray-100 text-gray-700 border-gray-200";
      case "Цуцалсан": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getParticipationRate = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

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
              Ангиудын үйл ажилгааны мэдээлэл
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Search and Filter Section */}
        <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Үйл ажиллагааны нэр эсвэл ангиар хайх..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-slate-500" />
                  <select
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {classes.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Нийт үйл ажиллагаа</p>
                  <p className="text-3xl font-bold">{filteredActivities.length}</p>
                </div>
                <Calendar className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Идэвхтэй</p>
                  <p className="text-3xl font-bold">
                    {filteredActivities.filter(a => a.status === "Үргэлжилж байгаа").length}
                  </p>
                </div>
                <Activity className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Нийт оролцогчид</p>
                  <p className="text-3xl font-bold">
                    {filteredActivities.reduce((acc, a) => acc + a.participants, 0)}
                  </p>
                </div>
                <Users className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Категори</p>
                  <p className="text-3xl font-bold">{categories.length}</p>
                </div>
                <Star className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredActivities.map((activity) => {
            const IconComponent = activity.icon;
            const participationRate = getParticipationRate(activity.participants, activity.maxParticipants);
            
            return (
              <Card 
                key={activity.id}
                className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                onClick={() => setSelectedActivity(activity)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${activity.color} shadow-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-slate-800">
                          {activity.title}
                        </CardTitle>
                        <p className="text-slate-600 text-sm font-medium">{activity.className}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="h-4 w-4" />
                        <span>{activity.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="h-4 w-4" />
                        <span>{activity.time} ({activity.duration})</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="h-4 w-4" />
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Users className="h-4 w-4" />
                        <span>{activity.participants}/{activity.maxParticipants}</span>
                      </div>
                    </div>

                    {/* Participation Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Оролцоо</span>
                        <span className="font-semibold text-slate-700">{participationRate}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${activity.color} transition-all duration-300`}
                          style={{ width: `${participationRate}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {activity.description}
                    </p>

                    {/* Teacher */}
                    <div className="text-xs text-slate-500 bg-slate-50/80 px-3 py-2 rounded-lg flex items-center justify-between">
                      <span>👨‍🏫 {activity.teacher}</span>
                      <ChevronRight className="h-4 w-4" />
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
            <Card className="bg-white/95 backdrop-blur-lg border-white/50 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedActivity.color} shadow-lg`}>
                      <selectedActivity.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-slate-800">
                        {selectedActivity.title}
                      </CardTitle>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-slate-600 font-medium">{selectedActivity.className}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedActivity.status)}`}>
                          {selectedActivity.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="text-slate-400 hover:text-slate-600 text-3xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">Үндсэн мэдээлэл</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                          <div className="flex items-center gap-2 text-blue-700 mb-2">
                            <Calendar className="h-5 w-5" />
                            <span className="font-semibold">Огноо</span>
                          </div>
                          <p className="text-blue-600">{selectedActivity.date}</p>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                          <div className="flex items-center gap-2 text-green-700 mb-2">
                            <Clock className="h-5 w-5" />
                            <span className="font-semibold">Цаг</span>
                          </div>
                          <p className="text-green-600">{selectedActivity.time} ({selectedActivity.duration})</p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                          <div className="flex items-center gap-2 text-purple-700 mb-2">
                            <MapPin className="h-5 w-5" />
                            <span className="font-semibold">Байршил</span>
                          </div>
                          <p className="text-purple-600">{selectedActivity.location}</p>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl">
                          <div className="flex items-center gap-2 text-orange-700 mb-2">
                            <Users className="h-5 w-5" />
                            <span className="font-semibold">Оролцогчид</span>
                          </div>
                          <p className="text-orange-600">{selectedActivity.participants}/{selectedActivity.maxParticipants}</p>
                        </div>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">Шаардлага</h3>
                      <div className="space-y-2">
                        {selectedActivity.requirements.map((req, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-slate-700">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">Дэлгэрэнгүй</h3>
                      <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-4 rounded-xl">
                        <p className="text-slate-700 leading-relaxed">{selectedActivity.description}</p>
                      </div>
                      
                      <div className="mt-4 bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-teal-700 mb-2">
                          <span className="font-semibold">👨‍🏫 Хариуцсан багш</span>
                        </div>
                        <p className="text-teal-600 font-medium">{selectedActivity.teacher}</p>
                      </div>
                    </div>

                    {/* Objectives */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 border-b pb-2 mb-4">Зорилго</h3>
                      <div className="space-y-3">
                        {selectedActivity.objectives.map((objective, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg">
                            <Star className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span className="text-emerald-700">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Category */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-indigo-700 mb-2">
                        <span className="font-semibold">🏷️ Категори</span>
                      </div>
                      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                        {selectedActivity.category}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedActivity(null)}
                  className="w-full mt-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Хаах
                </button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}