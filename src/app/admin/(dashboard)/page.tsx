'use client'
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, UserCheck, Building, TrendingUp, DollarSign, Calendar, Bell } from "lucide-react";

// Type definitions
interface UserData {
  students: number;
  teachers: number;
  parents: number;
  staff: number;
}

interface AttendanceData {
  month: string;
  present: number;
  absent: number;
}

interface FinanceData {
  month: string;
  income: number;
  expense: number;
}

interface AnnouncementData {
  id: number;
  title: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

interface EventData {
  date: string;
  title: string;
  time: string;
}

// Mock data for demonstration
const mockData: {
  users: UserData;
  attendance: AttendanceData[];
  finance: FinanceData[];
  announcements: AnnouncementData[];
} = {
  users: {
    students: 1247,
    teachers: 89,
    parents: 956,
    staff: 34
  },
  attendance: [
    { month: 'Ян', present: 92, absent: 8 },
    { month: 'Фев', present: 89, absent: 11 },
    { month: 'Мар', present: 94, absent: 6 },
    { month: 'Апр', present: 91, absent: 9 },
    { month: 'Май', present: 96, absent: 4 },
    { month: 'Июн', present: 93, absent: 7 }
  ],
  finance: [
    { month: 'Ян', income: 45000000, expense: 38000000 },
    { month: 'Фев', income: 52000000, expense: 41000000 },
    { month: 'Мар', income: 48000000, expense: 39000000 },
    { month: 'Апр', income: 55000000, expense: 42000000 },
    { month: 'Май', income: 49000000, expense: 40000000 },
    { month: 'Июн', income: 58000000, expense: 44000000 }
  ],
  announcements: [
    { id: 1, title: "Шинэ семестр эхэллээ", date: "2025-06-01", priority: "high" },
    { id: 2, title: "Багшийн цалингийн өөрчлөлт", date: "2025-05-28", priority: "medium" },
    { id: 3, title: "Системийн шинэчлэл", date: "2025-05-25", priority: "low" }
  ]
};

interface UserCardProps {
  type: 'students' | 'teachers' | 'parents' | 'staff';
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const UserCard: React.FC<UserCardProps> = ({ type, count, icon: Icon, color }) => {
  const [growthRate, setGrowthRate] = useState<number>(0);
  
  useEffect(() => {
    // Client-side only random generation to avoid hydration mismatch
    setGrowthRate(Math.floor(Math.random() * 20 + 5));
  }, []);

  return (
    <Card className={`bg-gradient-to-br ${color} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-0`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">
              {type === 'students' ? 'Оюутнууд' : 
               type === 'teachers' ? 'Багш нар' :
               type === 'parents' ? 'Эцэг эх' : 'Ажилтнууд'}
            </p>
            <p className="text-white text-2xl font-bold">{count?.toLocaleString()}</p>
            <p className="text-white/70 text-xs mt-1">
              {growthRate > 0 ? `+${growthRate}% энэ сараас` : ''}
            </p>
          </div>
          <Icon className="h-12 w-12 text-white/70" />
        </div>
      </CardContent>
    </Card>
  );
};

interface AttendanceChartProps {
  data: AttendanceData[];
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ data }) => (
  <div className="space-y-4">
    {data.map((item: AttendanceData, index: number) => (
      <div key={index} className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-slate-700">{item.month}</span>
          <span className="text-slate-500">{item.present}% / {item.absent}%</span>
        </div>
        <div className="flex rounded-full overflow-hidden bg-slate-200 h-3">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000"
            style={{ width: `${item.present}%` }}
          />
          <div 
            className="bg-gradient-to-r from-red-400 to-red-600 transition-all duration-1000"
            style={{ width: `${item.absent}%` }}
          />
        </div>
      </div>
    ))}
  </div>
);

interface FinanceChartProps {
  data: FinanceData[];
}

const FinanceChart: React.FC<FinanceChartProps> = ({ data }) => {
  const maxAmount: number = Math.max(...data.map((d: FinanceData) => Math.max(d.income, d.expense)));
  
  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-green-400 to-green-600"></div>
          <span className="text-sm text-slate-600">Орлого</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <span className="text-sm text-slate-600">Зарлага</span>
        </div>
      </div>
      
      <div className="grid grid-cols-6 gap-4 items-end h-64">
        {data.map((item: FinanceData, index: number) => (
          <div key={index} className="space-y-2">
            <div className="flex flex-col gap-1 items-center h-48">
              <div 
                className="w-8 bg-gradient-to-t from-green-400 to-green-600 rounded-t transition-all duration-1000 delay-100"
                style={{ height: `${(item.income / maxAmount) * 180}px` }}
                title={`Орлого: ${(item.income / 1000000).toFixed(1)}М`}
              />
              <div 
                className="w-8 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t transition-all duration-1000 delay-200"
                style={{ height: `${(item.expense / maxAmount) * 180}px` }}
                title={`Зарлага: ${(item.expense / 1000000).toFixed(1)}М`}
              />
            </div>
            <p className="text-xs text-center text-slate-600 font-medium">{item.month}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface CountChartProps {
  data: UserData;
}

const CountChart: React.FC<CountChartProps> = ({ data }) => {
  const total: number = Object.values(data).reduce((sum: number, val: number) => sum + val, 0);
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-3xl font-bold text-slate-800 mb-2">{total.toLocaleString()}</div>
        <div className="text-sm text-slate-600">Нийт хэрэглэгч</div>
      </div>
      
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]: [string, number], index: number) => {
          const percentage: number = (value / total * 100);
          const colors: string[] = ['from-blue-400 to-blue-600', 'from-green-400 to-green-600', 'from-purple-400 to-purple-600', 'from-orange-400 to-orange-600'];
          
          return (
            <div key={key} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">
                  {key === 'students' ? 'Оюутнууд' : 
                   key === 'teachers' ? 'Багш нар' :
                   key === 'parents' ? 'Эцэг эх' : 'Ажилтнууд'}
                </span>
                <span className="text-slate-500">{percentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${colors[index]} transition-all duration-1000 rounded-full`}
                  style={{ width: `${percentage.toFixed(1)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface AnnouncementsProps {
  data: AnnouncementData[];
}

const Announcements: React.FC<AnnouncementsProps> = ({ data }) => (
  <div className="space-y-4">
    {data.map((announcement: AnnouncementData) => (
      <div key={announcement.id} className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-white/30 hover:bg-white/70 transition-all duration-300">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-slate-800 mb-1">{announcement.title}</h4>
            <p className="text-sm text-slate-600">{announcement.date}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            announcement.priority === 'high' ? 'bg-red-100 text-red-700' :
            announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
          }`}>
            {announcement.priority === 'high' ? 'Яаралтай' :
             announcement.priority === 'medium' ? 'Дунд' : 'Бага'}
          </span>
        </div>
      </div>
    ))}
  </div>
);

const EventCalendar: React.FC = () => {
  const events: EventData[] = [
    { date: '5', title: 'Багшийн зөвлөгөөн', time: '10:00' },
    { date: '8', title: 'Сургалтын семинар', time: '14:00' },
    { date: '12', title: 'Шалгалтын хуваарь', time: '09:00' },
    { date: '15', title: 'Эцэг эхийн хурал', time: '16:00' }
  ];

  return (
    <div className="space-y-4">
      {events.map((event: EventData, index: number) => (
        <div key={index} className="flex items-center gap-4 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/70 transition-all duration-300">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            {event.date}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-800 text-sm">{event.title}</h4>
            <p className="text-xs text-slate-600">{event.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function AdminPage() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative pt-20">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200/15 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-28 h-28 bg-indigo-200/15 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-purple-200/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-40 w-36 h-36 bg-pink-200/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-cyan-200/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-emerald-200/10 rounded-full animate-pulse"></div>
      </div>

      <div className="pt-32 pb-10 px-4 md:px-10 flex flex-col gap-10 relative z-10">
        {/* Welcome Header */}
        <Card className="bg-white/70 backdrop-blur-md border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              Сайн байна уу? Edulab-ийн админ
            </CardTitle>
            <p className="text-slate-600 mt-2">Өнөөдрийн тойм мэдээлэл болон статистик</p>
          </CardHeader>
        </Card>

        <div className="flex gap-10 flex-col xl:flex-row">
          {/* Left Column - Main Content */}
          <div className="w-full xl:w-2/3 flex flex-col gap-10">
            {/* User Cards */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-0">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-t-xl">
                <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  Хэрэглэгчдийн тоо
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  <UserCard 
                    type="students" 
                    count={mockData.users.students}
                    icon={GraduationCap}
                    color="from-blue-500 to-blue-600"
                  />
                  <UserCard 
                    type="teachers" 
                    count={mockData.users.teachers}
                    icon={Users}
                    color="from-green-500 to-green-600"
                  />
                  <UserCard 
                    type="parents" 
                    count={mockData.users.parents}
                    icon={UserCheck}
                    color="from-purple-500 to-purple-600"
                  />
                  <UserCard 
                    type="staff" 
                    count={mockData.users.staff}
                    icon={Building}
                    color="from-orange-500 to-orange-600"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-0">
                <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-t-xl">
                  <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Хэрэглэгчдийн харьцаа
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <CountChart data={mockData.users} />
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-0">
                <CardHeader className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-t-xl">
                  <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Ирц
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                    <AttendanceChart data={mockData.attendance} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Finance Chart */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-0">
              <CardHeader className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-t-xl">
                <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  Санхүүгийн тайлан
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <FinanceChart data={mockData.finance} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="w-full xl:w-1/3 flex flex-col gap-10">
            {/* Announcements */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-0">
              <CardHeader className="bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-t-xl">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Мэдэгдэл
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Announcements data={mockData.announcements} />
              </CardContent>
            </Card>

            {/* Event Calendar */}
            <Card className="bg-white/60 backdrop-blur-lg border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 p-0">
              <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-t-xl">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Үйл явдлын календарь
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <EventCalendar />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}