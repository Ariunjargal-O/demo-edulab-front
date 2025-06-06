"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExamCard } from "./components/ExamCard";
import { Exam } from "@/constants/type";
import { useForm } from "react-hook-form";
import { ConnectedExamDialogs } from "./components/ExamResult";

// Тусдаа interface-ууд тодорхойлох
interface ExamFormData {
  subject: string;
  content: string;
  duration: string;
  totalMarks: string;
}

interface ResultFormData {
  studentId: string;
  score: string;
  comment: string;
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
}

export default function Page() {
  // State variables
  const [midtermExams, setMidtermExams] = useState<Exam[]>([]);
  const [seasonalExams, setSeasonalExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState({
    exam: false,
    examResult: false,
  });

  // Form hooks
  const examForm = useForm();
  const resultForm = useForm();

  // Separate form data states
  const [examFormData, setExamFormData] = useState<ExamFormData>({
    subject: "",
    content: "",
    duration: "",
    totalMarks: "",
  });

  const [resultFormData, setResultFormData] = useState<ResultFormData>({
    studentId: "",
    score: "",
    comment: "",
  });

  // Sample students data
  const [students, setStudents] = useState<Student[]>([
    { id: 1, firstName: "Батбаяр", lastName: "Дорж" },
    { id: 2, firstName: "Сайханцэцэг", lastName: "Цэрэн" },
    { id: 3, firstName: "Болдбаяр", lastName: "Мөнх" },
    { id: 4, firstName: "Оюунцэцэг", lastName: "Гантөмөр" },
  ]);

  // Server Actions
  const setFormDataAction = (data: ExamFormData | ResultFormData) => {
    // Determine which form data to update based on the data structure
    if ("subject" in data) {
      setExamFormData(data as ExamFormData);
    } else {
      setResultFormData(data as ResultFormData);
    }
  };

  const setDialogOpenAction = (updater: (prev: any) => any) => {
    setDialogOpen(updater);
  };

  const handleSubmitAction = async (type: string) => {
    if (type === "exam") {
      await handleExamSubmit("midterm"); // or determine type dynamically
    }
    // Add other submit logic as needed
  };

  // Handle input changes for exam form
  const handleExamInputChange = (field: keyof ExamFormData, value: string) => {
    setExamFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle input changes for result form
  const handleResultInputChange = (
    field: keyof ResultFormData,
    value: string
  ) => {
    setResultFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Create exam function
  const createExam = async (
    examData: ExamFormData,
    type: "midterm" | "seasonal"
  ): Promise<Exam> => {
    setLoading(true);
    try {
      const response = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...examData,
          type,
          createdAt: new Date().toISOString(),
        }),
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

  // Delete exam function
  const deleteExam = async (
    examId: number | string,
    type: "midterm" | "seasonal"
  ) => {
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

  // Handle exam submission
  const handleExamSubmit = async (type: "midterm" | "seasonal") => {
    if (!examFormData.subject || !examFormData.content) {
      alert("Шалгалтын сэдэв болон агуулгыг бөглөнө үү!");
      return;
    }

    const newExam = await createExam(examFormData, type);

    if (type === "midterm") {
      setMidtermExams((prev) => [...prev, newExam]);
    } else {
      setSeasonalExams((prev) => [...prev, newExam]);
    }

    // Reset exam form
    setExamFormData({ subject: "", content: "", duration: "", totalMarks: "" });
    setDialogOpen((prev) => ({ ...prev, exam: false }));
  };

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

      <div className="pt-8 px-4 md:px-10 pb-10 relative flex flex-col gap-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold leading-8">
              Шалгалтын булан
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Midterm Exams Section */}
          <Card className="w-full lg:w-1/2">
            <CardHeader className="text-2xl font-bold px-5">
              Явцын шалгалт
            </CardHeader>
            <CardContent className="px-5 flex flex-col gap-4">
              <Card className="border-dashed border-2 border-red-500 hover:border-red-600 transition">
                <CardContent className="flex justify-center items-center p-8">
                  <ConnectedExamDialogs
                    type="exam"
                    title="Явцын шалгалт"
                    formData={examFormData}
                    setFormDataAction={setFormDataAction}
                    handleSubmitAction={() => handleExamSubmit("midterm")}
                    loading={loading}
                    dialogOpen={dialogOpen}
                    setDialogOpenAction={setDialogOpenAction}
                    examForm={examForm}
                    resultForm={resultForm}
                    students={students}
                  />
                </CardContent>
              </Card>

              <div className="flex flex-col gap-4">
                {midtermExams.map((exam) => (
                  <ExamCard
                    key={exam.id}
                    exam={exam}
                    type="midterm"
                    deleteExam={deleteExam}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Seasonal Exams Section */}
          <Card className="w-full lg:w-1/2">
            <CardHeader className="text-2xl font-bold px-5">
              Улирлын шалгалт
            </CardHeader>
            <CardContent className="px-5 flex flex-col gap-4">
              <Card className="border-dashed border-2 border-red-500 hover:border-red-600 transition">
                <CardContent className="flex justify-center items-center p-8">
                  <ConnectedExamDialogs
                    type="exam"
                    title="Улирлын шалгалт"
                    formData={examFormData}
                    setFormDataAction={setFormDataAction}
                    handleSubmitAction={() => handleExamSubmit("seasonal")}
                    loading={loading}
                    dialogOpen={dialogOpen}
                    setDialogOpenAction={setDialogOpenAction}
                    examForm={examForm}
                    resultForm={resultForm}
                    students={students}
                  />
                </CardContent>
              </Card>

              <div className="flex flex-col gap-4">
                {seasonalExams.map((exam) => (
                  <ExamCard
                    key={exam.id}
                    exam={exam}
                    type="seasonal"
                    deleteExam={deleteExam}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
