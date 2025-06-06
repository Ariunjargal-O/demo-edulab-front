"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Clock, FileText, Target } from "lucide-react";
import { ExamDialogProps } from "@/constants/type";
import { useState } from "react";

export const ExamDialog = ({
  type,
  title,
  formData,
  setFormData,
  handleSubmit,
  loading,
  dialogOpen,
  setDialogOpen,
}: ExamDialogProps) => {
  // Локал төлөв: амжилттай илгээсний дараа хэлбэрийг цэвэрлэхэд ашиглана
  const [submitted, setSubmitted] = useState(false);

  const handleLocalSubmit = async () => {
    await handleSubmit(type); // Илгээх
    setSubmitted(true);

    // Формыг хоосолж шинэ шалгалт бүртгэх боломжтой болгоно
    setFormData({
      subject: "",
      duration: "",
      content: "",
      totalMarks: "",
    });

    // Dialog-г нээлттэй хэвээр үлдээнэ (хаахгүй!)
    // Хэрвээ хаах бол дараах мөрийг нэм:
    // setDialogOpen((prev) => ({ ...prev, [type]: false }));
  };

  return (
    <>
      <Button
        onClick={() => setDialogOpen((prev) => ({ ...prev, [type]: true }))}
        className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
      >
        <Plus className="mr-2 h-5 w-5" />
        Шинэ {title}
      </Button>

      <Dialog
        open={dialogOpen[type]}
        onOpenChange={(open) =>
          setDialogOpen((prev) => ({ ...prev, [type]: open }))
        }
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-red-50 border-0 shadow-2xl">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent text-center">
              Шинэ {title} үүсгэх
            </DialogTitle>
            <div className="flex justify-center mt-4">
              <div className="p-3 bg-red-100 rounded-full">
                <BookOpen className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-red-100 rounded-full mr-4">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Шалгалтын мэдээлэл
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-red-600" />
                    Шалгалтын сэдэв *
                  </label>
                  <Input
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Шалгалтын сэдэв"
                    required
                    className="rounded-xl border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all duration-200"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-red-600" />
                    Үргэлжлэх хугацаа (минут)
                  </label>
                  <Input
                    type="number"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    placeholder="90"
                    className="rounded-xl border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-red-600" />
                    Шалгалтын агуулга *
                  </label>
                  <Input
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Агуулга"
                    required
                    className="rounded-xl border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all duration-200"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-red-600" />
                    Нийт оноо
                  </label>
                  <Input
                    type="number"
                    value={formData.totalMarks}
                    onChange={(e) =>
                      setFormData({ ...formData, totalMarks: e.target.value })
                    }
                    placeholder="100"
                    className="rounded-xl border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Success message when submitted */}
            {submitted && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-full mr-3">
                    <Target className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-green-800">
                      Амжилттай үүсгэлээ!
                    </h3>
                    <p className="text-xs text-green-600 mt-1">
                      Шинэ шалгалт оруулах боломжтой байна.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200 mt-6">
            <Button
              variant="outline"
              onClick={() =>
                setDialogOpen((prev) => ({ ...prev, [type]: false }))
              }
              className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-2 px-6 transition-all duration-200"
            >
              Цуцлах
            </Button>
            <Button
              onClick={handleLocalSubmit}
              disabled={loading}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Үүсгэж байна...
                </div>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Шалгалт үүсгэх
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};