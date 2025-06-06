"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExamCard } from "./components/ExamCard";
import { Exam, FormData } from "@/constants/type";
import { ExamDialog } from "./components/ExamDailog";
import { BookOpen, Calendar, Clock, Award, Plus, FileText } from "lucide-react";

interface ExamDialogProps {
  type: "midterm" | "seasonal";
  title: string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleInputChange: (field: keyof FormData, value: string) => void;
  handleSubmit: (type: "midterm" | "seasonal") => void;
  loading: boolean;
  dialogOpen: { midterm: boolean; seasonal: boolean };
  setDialogOpen: React.Dispatch<React.SetStateAction<{ midterm: boolean; seasonal: boolean }>>;
}

// Animated Card Component
const AnimatedCard = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function Page() {
  const [midtermExams, setMidtermExams] = useState<Exam[]>([]);
  const [seasonalExams, setSeasonalExams] = useState<Exam[]>([]);
  const [dialogOpen, setDialogOpen] = useState({ midterm: false, seasonal: false });

  // Ensure the form data matches the FormData type
  const [formData, setFormData] = useState<FormData>({
    subject: "",
    content: "",
    duration: "",
    totalMarks: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change correctly based on the FormData type
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const createExam = async (
    examData: FormData,
    type: "midterm" | "seasonal"
  ): Promise<Exam> => {
    setLoading(true);
    try {
      const response = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...examData, type, createdAt: new Date().toISOString() }),
      });

      if (!response.ok) throw new Error("Failed to create exam");
      const newExam = await response.json();
      return newExam;
    } catch (error) {
      console.error("Error creating exam:", error);
      return {
        id: Date.now(),
        ...examData,
        type,
        createdAt: new Date().toISOString(),
      };
    } finally {
      setLoading(false);
    }
  };

  const deleteExam = async (examId: number | string, type: "midterm" | "seasonal") => {
    try {
      await fetch(`/api/exams/${examId}`, { method: "DELETE" });

      if (type === "midterm") {
        setMidtermExams((prev) => prev.filter((exam) => exam.id !== examId));
      } else {
        setSeasonalExams((prev) => prev.filter((exam) => exam.id !== examId));
      }
    } catch (error) {
      console.error("Failed to delete exam:", error);
    }
  };

  const handleSubmit = async (type: "midterm" | "seasonal") => {
    if (!formData.subject || !formData.content) {
      alert("Шалгалтын сэдэв болон агуулгыг бөглөнө үү!");
      return;
    }

    const newExam = await createExam(formData, type);

    if (type === "midterm") {
      setMidtermExams((prev) => [...prev, newExam]);
    } else {
      setSeasonalExams((prev) => [...prev, newExam]);
    }

    setFormData({ subject: "", content: "", duration: "", totalMarks: "" });
    setDialogOpen((prev) => ({ ...prev, [type]: false }));
  };

  const totalExams = midtermExams.length + seasonalExams.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden pt-30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-indigo-200/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200/20 rounded-full animate-ping"></div>
        <div className="absolute top-1/4 right-1/3 w-20 h-20 bg-emerald-200/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-amber-200/20 rounded-full animate-bounce"></div>
      </div>

      <div className="pt-8 px-4 md:px-10 pb-10 relative z-10">
        {/* Header Section */}
        <AnimatedCard>
          <Card className="bg-gradient-to-r from-slate-100 via-blue-50 to-indigo-100 border border-white/60 shadow-lg mb-8">
            <CardHeader className="p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500/70 to-indigo-500/80 rounded-xl backdrop-blur-sm shadow-md">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
                      Шалгалтын булан
                    </h1>
                    <p className="text-slate-600 text-lg">
                      Явцын болон улирлын шалгалтуудыг удирдах
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </AnimatedCard>

        {/* Stats Cards */}
        <AnimatedCard delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      Нийт шалгалт
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      {totalExams}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      Явцын шалгалт
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      {midtermExams.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      Улирлын шалгалт
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      {seasonalExams.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      Идэвхтэй
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      {totalExams}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedCard>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Midterm Exams Section */}
          <AnimatedCard delay={200} className="w-full lg:w-1/2">
            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-xl h-fit">
              <CardHeader className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800">
                    Явцын шалгалт
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 flex flex-col gap-4">
                <Card className="border-dashed border-2 border-emerald-300 hover:border-emerald-400 transition-all duration-300 hover:shadow-md bg-gradient-to-br from-emerald-50/50 to-teal-50/50">
                  <CardContent className="flex justify-center items-center p-8">
                    <ExamDialog
                      type="midterm"
                      title="явцын шалгалт"
                      formData={formData}
                      setFormData={setFormData}
                      handleInputChange={handleInputChange}
                      handleSubmit={handleSubmit}
                      loading={loading}
                      dialogOpen={dialogOpen}
                      setDialogOpen={setDialogOpen}
                    />
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
                  {midtermExams.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-emerald-500" />
                      </div>
                      <p className="text-slate-500 text-sm">
                        Одоогоор явцын шалгалт байхгүй байна
                      </p>
                    </div>
                  ) : (
                    midtermExams.map((exam) => (
                      <ExamCard key={exam.id} exam={exam} type="midterm" deleteExam={deleteExam} />
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>

          {/* Seasonal Exams Section */}
          <AnimatedCard delay={300} className="w-full lg:w-1/2">
            <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-xl h-fit">
              <CardHeader className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800">
                    Улирлын шалгалт
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 flex flex-col gap-4">
                <Card className="border-dashed border-2 border-purple-300 hover:border-purple-400 transition-all duration-300 hover:shadow-md bg-gradient-to-br from-purple-50/50 to-indigo-50/50">
                  <CardContent className="flex justify-center items-center p-8">
                    <ExamDialog
                      type="seasonal"
                      title="улирлын шалгалт"
                      formData={formData}
                      setFormData={setFormData}
                      handleInputChange={handleInputChange}
                      handleSubmit={handleSubmit}
                      loading={loading}
                      dialogOpen={dialogOpen}
                      setDialogOpen={setDialogOpen}
                    />
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
                  {seasonalExams.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-purple-500" />
                      </div>
                      <p className="text-slate-500 text-sm">
                        Одоогоор улирлын шалгалт байхгүй байна
                      </p>
                    </div>
                  ) : (
                    seasonalExams.map((exam) => (
                      <ExamCard key={exam.id} exam={exam} type="seasonal" deleteExam={deleteExam} />
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}