"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { User } from "../page";

interface DeleteStudentDialogProps {
  student: User;
  onConfirmAction: () => Promise<{ success: boolean; error?: string }>;
  onCloseAction: () => void;
}

export default function DeleteStudentDialog({
  student,
  onConfirmAction,
  onCloseAction,
}: DeleteStudentDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const result = await onConfirmAction();
      
      if (result.success) {
        onCloseAction();
      } else {
        setError(result.error || "Сурагч устгахад алдаа гарлаа");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      setError("Сурагч устгахад алдаа гарлаа");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => !isDeleting && onCloseAction()}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border border-white/60 shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Сурагчийн мэдээлэл устгах
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-base mt-2">
            Та уг үйлдлийг буцаах боломжгүй тул анхаарлыг хандуулна уу.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-red-50/70 border border-red-200/50 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-slate-600">
                  {student.firstname.charAt(0)}
                  {student.lastname.charAt(0)}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-semibold text-slate-800 mb-1">
                {student.firstname} {student.lastname}
              </h4>
              {student.email && (
                <p className="text-sm text-slate-600 mb-1">{student.email}</p>
              )}
              {student.contact && (
                <p className="text-sm text-slate-600">
                  Утас: {student.contact}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-amber-50/70 border border-amber-200/50 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Анхааруулга:</p>
              <ul className="list-disc list-inside space-y-1 text-amber-700">
                <li>Энэхүү үйлдлийг буцаах боломжгүй</li>
                <li>Сурагчийн бүх мэдээлэл бүрмөсөн устах болно</li>
                <li>Холбогдох бүх өгөгдөл алга болно</li>
              </ul>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50/70 border border-red-200/50 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <X className="w-4 h-4 text-red-600" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={onCloseAction}
            disabled={isDeleting}
            className="flex-1 border-slate-300 hover:bg-slate-50 transition-colors duration-200"
          >
            Цуцлах
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {isDeleting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Устгаж байна...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Trash2 className="w-4 h-4" />
                <span>Устгах</span>
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}