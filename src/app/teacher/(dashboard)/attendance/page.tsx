"use client"

import React from "react";
import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isWeekend } from "date-fns";
import { mn } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Clock, UserCircle, AlertCircle } from "lucide-react";
import { differenceInMinutes, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BASE_URL } from "@/constants/baseurl";
import { AttendanceRecord, MonthlyStats, TeacherType } from "@/constants/type";
import { useAuthStore } from "@/stores/auth-store";

export default function TeacherAttendance() {
  const [teacher, setTeacher] = useState<TeacherType | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>({
    totalHours: 0,
    totalDays: 0,
    presentDays: 0,
    absentDays: 0,
  });
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Auth болон localStorage утгууд авах - алдааны шалгалтыг сайжруулсан
  
  const{token, schoolId, teacherId, schoolName} = useAuthStore()

  // Багшийн мэдээлэл авах - алдааны шинэ шийдэл
  useEffect(() => {
    if (!schoolId || !teacherId) return;

    const fetchTeacher = async () => {
      try {
        
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        
        // Token байвал нэмнэ, байхгүй бол алгасна
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const res = await fetch(
          `${BASE_URL}/teachers-att/${schoolId}/${teacherId}/teacherInfo`,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (!res.ok) {
          // 401 алдаа нь тухайн teacher-д хандах эрхгүй гэсэн үг биш, токен алдаатай гэсэн үг
          if (res.status === 404) {
            setError("Багш олдсонгүй");
            return;
          }
          if (res.status === 403) {
            setError("Хандах эрхгүй");
            return;
          }
          throw new Error("Failed to fetch teacher info");
        }

        const data = await res.json();
        if (data.success) {
          setTeacher(data.data);
        }
      } catch (err) {
        console.error("Fetch teacher error:", err);
        setError("Багшийн мэдээлэл авахад алдаа гарлаа");
      }
    };

    fetchTeacher();
  }, [schoolId, teacherId]);

  // API функцууд - алдааны шинэ шийдэл
  const api = {
    makeRequest: async (url: string, options: RequestInit = {}) => {
      
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...((options.headers as Record<string, string>) || {}),
      };
      
      // Token байвал нэмнэ
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      // 401 алдааг илүү сайн шийдвэрлэх
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Мэдээлэл олдсонгүй");
        }
        if (response.status === 403) {
          throw new Error("Хандах эрхгүй");
        }
        if (response.status >= 500) {
          throw new Error("Серверийн алдаа гарлаа");
        }
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Алдаа гарлаа");
      }

      return response.json();
    },
  
    getAttendance: async (teacherId: string, year: number, month: number) => {
      return api.makeRequest(
        `${BASE_URL}/teachers-att/${schoolId}/${teacherId}/teacher-attendance?year=${year}&month=${month + 1}`
      );
    },
  
    recordAttendance: async (teacherId: string) => {
      return api.makeRequest(
        `${BASE_URL}/teachers-att/${schoolId}/${teacherId}/record`,
        {
          method: "POST",
          body: JSON.stringify({}),
        }
      );
    },
  
    getMonthlyStats: async (teacherId: string, year: number, month: number) => {
      return api.makeRequest(
        `${BASE_URL}/teachers-att/${schoolId}/${teacherId}/teacher-attendance/stats?year=${year}&month=${month + 1}`
      );
    },
  };

  const today = format(new Date(), "yyyy-MM-dd");
  const todayRecord = attendanceRecords.find((record) => record.date === today);
  const isArrivalDone = !!todayRecord?.arrivalTime;
  const isDepartureDone = !!todayRecord?.departureTime;

  // Сарын бүх өдрийг авах
  const allDaysInMonth = eachDayOfInterval({
    start: startOfMonth(new Date(selectedYear, selectedMonth)),
    end: endOfMonth(new Date(selectedYear, selectedMonth)),
  });

  // Ажлын өдрүүдийг тоолох (статистикт ашиглах)
  const workingDays = allDaysInMonth.filter((day) => !isWeekend(day));

  // Алдаа болон амжилтын мессежийг 5 секундын дараа арилгах
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Ирцын бүртгэл авах
  useEffect(() => {
    const fetchAttendance = async () => {
      if (!teacherId) return;

      try {
        setLoading(true);
        setError("");

        const response = await api.getAttendance(teacherId, selectedYear, selectedMonth);
        if (response.success && Array.isArray(response.data)) {
          setAttendanceRecords(response.data);
        } else {
          setAttendanceRecords([]);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch attendance";
        setError(errorMessage);
        console.error("Attendance fetch error:", err);
        setAttendanceRecords([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [teacherId, selectedYear, selectedMonth]);

  // Сарын статистик авах
  useEffect(() => {
    const fetchStats = async () => {
      if (!teacherId || attendanceRecords.length === 0) return;

      try {
        const response = await api.getMonthlyStats(teacherId, selectedYear, selectedMonth);
        if (response.success && response.data) {
          setMonthlyStats(response.data);
        } else {
          calculateLocalStats();
        }
      } catch (err) {
        console.warn("Stats fetch failed, calculating locally:", err);
        calculateLocalStats();
      }
    };

    const calculateLocalStats = () => {
      let totalHours = 0;
      let presentDays = 0;

      attendanceRecords.forEach((record) => {
        if (record.arrivalTime) {
          presentDays++;
          if (record.departureTime && record.arrivalTime) {
            try {
              const arrival = parse(record.arrivalTime, "HH:mm", new Date(record.date));
              const departure = parse(record.departureTime, "HH:mm", new Date(record.date));
              const minutes = differenceInMinutes(departure, arrival);
              if (minutes > 0) {
                totalHours += minutes / 60;
              }
            } catch (parseError) {
              console.warn("Time parsing error for record:", record, parseError);
            }
          }
        }
      });

      setMonthlyStats({
        totalHours: Math.round(totalHours * 10) / 10,
        totalDays: workingDays.length,
        presentDays,
        absentDays: workingDays.length - presentDays,
      });
    };

    fetchStats();
  }, [teacherId, attendanceRecords, selectedYear, selectedMonth, workingDays.length]);

  const handlePrevMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 0) {
        setSelectedYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 11) {
        setSelectedYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const recordAttendance = async () => {
    if (!teacherId) {
      setError("Teacher ID not found");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await api.recordAttendance(teacherId);

      if (response.success && response.data) {
        // Attendance records-г шинэчлэх
        setAttendanceRecords((prev) => {
          const existingIndex = prev.findIndex((r) => r.date === response.data.date);
          if (existingIndex >= 0) {
            const updated = [...prev];
            updated[existingIndex] = { ...updated[existingIndex], ...response.data };
            return updated;
          } else {
            return [...prev, response.data];
          }
        });

        setSuccess(response.message || "Attendance recorded successfully");
        setIsDialogOpen(false);
      } else {
        throw new Error("Invalid response data");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to record attendance";
      setError(errorMessage);
      console.error("Record attendance error:", err);
    } finally {
      setLoading(false);
    }
  };

  const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => i);

  if (loading && !attendanceRecords.length && !teacher) {
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
        <Card>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
              <p className="text-lg">Уншиж байна...</p>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative pt-30">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200/15 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-28 h-28 bg-indigo-200/15 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-purple-200/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-40 w-36 h-36 bg-pink-200/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-cyan-200/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-emerald-200/10 rounded-full animate-pulse"></div>
      </div>
      
   <div className="pt-8 px-4 md:px-10 pb-10 relative gap-10 flex flex-col">
       {/* Success Message */}
       {success && (
        <Alert className="border-green-200 bg-green-50">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <UserCircle className="h-6 w-6" />
            <CardTitle className="text-2xl font-medium text-black">
              Багш: {teacher?.firstName || "..........."} -ийн ирцын бүртгэл
            </CardTitle>
          </div>
        </CardHeader>

        <div className="p-4 border-b bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(+v)}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(+v)}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent >
                  {months.map((m) => (
                    <SelectItem key={m} value={m.toString()}>
                      {format(new Date(2000, m, 1), "MMMM", { locale: mn })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={handlePrevMonth} disabled={loading}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="px-2 font-medium min-w-[140px] text-center">
                  {format(new Date(selectedYear, selectedMonth), "MMMM yyyy", { locale: mn })}
                </div>
                <Button variant="outline" size="icon" onClick={handleNextMonth} disabled={loading}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading || (isArrivalDone && isDepartureDone)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {loading
                    ? "Уншиж байна..."
                    : isArrivalDone && isDepartureDone
                    ? "Бүртгэсэн"
                    : isArrivalDone && !isDepartureDone
                    ? "Явсан бүртгэл хийх"
                    : "Ирсэн бүртгэл хийх"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {isArrivalDone && !isDepartureDone
                      ? "Явсан цагаа бүртгүүлэхдээ итгэлтэй байна уу?"
                      : "Ирсэн цагаа бүртгүүлэхдээ итгэлтэй байна уу?"}
                  </DialogTitle>
                </DialogHeader>
                <DialogFooter className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    disabled={loading}
                  >
                    Цуцлах
                  </Button>
                  <Button
                    className="bg-blue-600 text-white"
                    onClick={recordAttendance}
                    disabled={loading}
                  >
                    {loading ? "Илгээж байна..." : "Бүртгэх"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <CardContent className="p-10">
          {loading ? (
            <div className="text-center py-8">Уншиж байна</div>
          ) : (
            <Table className="rounded-2xl border-2">
              <TableHeader>
                <TableRow className="bg-slate-100">
                  <TableHead className="w-1/3">Он сар өдөр</TableHead>
                  <TableHead className="w-1/3 text-center">Ирсэн цаг</TableHead>
                  <TableHead className="w-1/3 text-center">Явсан цаг</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allDaysInMonth.map((day) => {
                  const record = attendanceRecords.find((r) => r.date === format(day, "yyyy-MM-dd"));
                  const isToday = format(day, "yyyy-MM-dd") === today;
                  const isWeekendDay = isWeekend(day);
                  const dayOfWeek = format(day, "EEEE", { locale: mn });
                  
                  return (
                    <TableRow 
                      key={day.toString()} 
                      className={`${
                        isToday 
                          ? "bg-blue-50" 
                          : isWeekendDay 
                          ? "bg-gray-50" 
                          : undefined
                      }`}
                    >
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>
                            {format(day, "yyyy-MM-dd")} {isToday && "(Өнөөдөр)"}
                          </span>
                          <span className={`text-sm ${isWeekendDay ? "text-red-500" : "text-gray-500"}`}>
                            {dayOfWeek}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {record?.arrivalTime ? (
                          <span className={`px-3 py-1 rounded-full font-medium ${
                            isWeekendDay 
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                          }`}>
                            {record.arrivalTime}
                          </span>
                        ) : isWeekendDay ? (
                          <span className="text-gray-400">Амралтын өдөр</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {record?.departureTime ? (
                          <span className={`px-3 py-1 rounded-full font-medium ${
                            isWeekendDay 
                              ? "bg-purple-100 text-purple-800"
                              : "bg-orange-100 text-orange-800"
                          }`}>
                            {record.departureTime}
                          </span>
                        ) : isWeekendDay ? (
                          <span className="text-gray-400">Амралтын өдөр</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t p-4 bg-slate-50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <div className="text-center">
              <div className="text-sm text-slate-600">Нийт цаг</div>
              <div className="text-xl font-bold text-blue-600">{monthlyStats.totalHours} цаг</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-600">Ажилсан өдөр</div>
              <div className="text-xl font-bold text-green-600">{monthlyStats.presentDays} өдөр</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-600">Ажлаагүй өдөр</div>
              <div className="text-xl font-bold text-red-600">{monthlyStats.absentDays} өдөр</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-600">Нийт ажлын өдөр</div>
              <div className="text-xl font-bold text-slate-600">{monthlyStats.totalDays} өдөр</div>
            </div>
          </div>
        </CardFooter>
      </Card>
   </div>
    </div>
  );
}