"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Users, Phone, GraduationCap, FileText, Calendar, MessageSquare, ArrowRight, Plus, BookOpen, Clock, UserCheck } from "lucide-react";

// Mock data for demonstration
const teacherData = {
  firstName: "Баасандаш",
  lastName: "Д.",
  email: "baaska@gmail.com",
  phone: "99887766",
  subject: "Математик",
  experience: "15 жил"
};

const electiveClasses = [
  {
    id: 1,
    name: "Математик сонгон",
    description: "Математикийн гүнзгий сонгон",
    schedule: "Лхагва, Пүрэв 14:00-15:30",
    students: 25,
    maxStudents: 30,
    status: "Идэвхтэй"
  },
  {
    id: 2,
    name: "Геометр сонгон",
    description: "Геометрийн хичээлээр давтлага өгөх",
    schedule: "Мягмар, Баасан 15:00-16:30",
    students: 18,
    maxStudents: 20,
    status: "Идэвхтэй"
  }
];

export default function TeacherPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [classes, setClasses] = useState(electiveClasses);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    schedule: '',
    maxStudents: 20
  });

  const handleCreateClass = () => {
    if (formData.name && formData.description && formData.schedule) {
      const newClass = {
        id: classes.length + 1,
        name: formData.name,
        description: formData.description,
        schedule: formData.schedule,
        students: 0,
        maxStudents: formData.maxStudents,
        status: "Идэвхтэй"
      };
      setClasses([...classes, newClass]);
      setFormData({ name: '', description: '', schedule: '', maxStudents: 20 });
      setShowCreateForm(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative pt-20">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200/15 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-28 h-28 bg-indigo-200/15 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-purple-200/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-40 w-36 h-36 bg-pink-200/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-cyan-200/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-emerald-200/10 rounded-full animate-pulse"></div>
      </div>

      <div className="pt-16 pb-10 px-4 md:px-10 flex flex-col gap-10 relative z-10">
        {/* Welcome Header */}
        <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-0">
          <CardHeader>
            <CardTitle className="text-3xl font-bold leading-8 text-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text p-8">
              Багш {teacherData.firstName} - Сонгон судлалын анги
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="flex gap-10 flex-col lg:flex-row">
          {/* Left Column - Teacher Info */}
          <div className="w-full lg:w-1/3 flex flex-col gap-10">
            {/* Teacher Profile Card */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
              <CardContent className="p-0">
                <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-t-xl">
                  <CardTitle className="text-xl font-bold leading-8 text-slate-800 p-6 flex items-center gap-3">
                    <GraduationCap className="w-6 h-6" />
                    Багшийн мэдээлэл
                  </CardTitle>
                </CardHeader>
                <div className="p-6 space-y-4">
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-slate-600">Нэр:</span>
                    </div>
                    <p className="text-lg font-semibold text-slate-800">{teacherData.lastName} {teacherData.firstName}</p>
                  </div>
                  
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-slate-600">Хичээл:</span>
                    </div>
                    <p className="text-lg font-semibold text-slate-800">{teacherData.subject}</p>
                  </div>
                  
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-slate-600">Майл:</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{teacherData.email}</p>
                  </div>
                  
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-slate-600">Утас:</span>
                    </div>
                    <p className="text-lg font-semibold text-slate-800">{teacherData.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics Card */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
              <CardContent className="p-0">
                <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-t-xl">
                  <CardTitle className="text-xl font-bold leading-8 text-slate-800 p-6 flex items-center gap-3">
                    <Users className="w-6 h-6" />
                    Статистик
                  </CardTitle>
                </CardHeader>
                <div className="p-6 space-y-4">
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30 text-center">
                    <p className="text-3xl font-bold text-blue-600">{classes.length}</p>
                    <p className="text-sm text-slate-600">Нийт анги</p>
                  </div>
                  
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30 text-center">
                    <p className="text-3xl font-bold text-green-600">{classes.reduce((sum, cls) => sum + cls.students, 0)}</p>
                    <p className="text-sm text-slate-600">Нийт суралцагч</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Classes and Actions */}
          <div className="w-full lg:w-2/3 flex flex-col gap-10">
            {/* Create New Class Button */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
              <CardContent className="p-6">
                <Button 
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                >
                  <Plus className="w-6 h-6" />
                  Шинэ сонгон судлалын анги үүсгэх
                </Button>
              </CardContent>
            </Card>

            {/* Create Class Form */}
            {showCreateForm && (
              <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
                <CardContent className="p-0">
                  <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-t-xl">
                    <CardTitle className="text-xl font-bold leading-8 text-slate-800 p-6 flex items-center gap-3">
                      <Plus className="w-6 h-6" />
                      Шинэ анги үүсгэх
                    </CardTitle>
                  </CardHeader>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Ангийн нэр:</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-3 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Жишээ: Програмчлалын үндсүүд"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Тайлбар:</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full p-3 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                        placeholder="Хичээлийн товч тайлбар..."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Хуваарь:</label>
                      <input
                        type="text"
                        value={formData.schedule}
                        onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                        className="w-full p-3 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Жишээ: Лхагва, Пүрэв 14:00-15:30"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Дээд тоо:</label>
                      <input
                        type="number"
                        value={formData.maxStudents}
                        onChange={(e) => setFormData({...formData, maxStudents: parseInt(e.target.value) || 20})}
                        className="w-full p-3 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        min="5"
                        max="50"
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        onClick={handleCreateClass}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Үүсгэх
                      </Button>
                      <Button 
                        onClick={() => setShowCreateForm(false)}
                        className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Цуцлах
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Classes List */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/70 p-0">
              <CardContent className="p-0">
                <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-t-xl">
                  <CardTitle className="text-xl font-bold leading-8 text-slate-800 p-6 flex items-center gap-3">
                    <BookOpen className="w-6 h-6" />
                    Миний сонгон судлалын ангиуд
                  </CardTitle>
                </CardHeader>
                <div className="p-6 space-y-4">
                  {classes.map((cls) => (
                    <div key={cls.id} className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/30 hover:bg-white/60 transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 mb-2">{cls.name}</h3>
                          <p className="text-slate-600 mb-3">{cls.description}</p>
                        </div>
                        <div className="ml-4">
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                            {cls.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-slate-600">{cls.schedule}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-600">
                            {cls.students}/{cls.maxStudents} суралцагч
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-slate-600">
                            {Math.round((cls.students / cls.maxStudents) * 100)}% дүүрсэн
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                          <Users className="w-4 h-4" />
                          Суралцагчид харах
                        </Button>
                        
                        <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                          <FileText className="w-4 h-4" />
                          Материал нэмэх
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {classes.length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-600 mb-2">Анги байхгүй байна</h3>
                      <p className="text-slate-500">Эхний сонгон судлалын ангиа үүсгэнэ үү</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}