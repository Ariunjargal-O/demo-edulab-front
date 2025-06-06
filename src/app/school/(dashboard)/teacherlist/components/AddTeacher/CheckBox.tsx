"use client";

import { useEffect, useState, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CheckSubjectDialogProps {
  availableSubjects: { id: string; name: string }[];
  selectedSubjects: string[];
  onSubjectsChange: (subjects: string[]) => void;
}

export default function CheckSubjectDialog({
  availableSubjects,
  selectedSubjects,
  onSubjectsChange,
}: CheckSubjectDialogProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(selectedSubjects);
  const closeRef = useRef<HTMLButtonElement>(null);

  // selectedSubjects өөрчлөгдөхөд selectedIds шинэчлэх
  useEffect(() => {
    setSelectedIds(selectedSubjects);
  }, [selectedSubjects]);

  const toggleSubject = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    onSubjectsChange(selectedIds);
    closeRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Хичээл сонгох
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50 border-0 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
            Хичээлүүдийг сонгох
          </DialogTitle>
        </DialogHeader>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="grid grid-cols-2 gap-4">
            {availableSubjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 col-span-2">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-lg text-gray-600">
                  Хичээлийн мэдээлэл ачаалагдаж байна...
                </p>
              </div>
            ) : (
              availableSubjects.map(({ id, name }) => (
                <label
                  key={id}
                  className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-gray-100 hover:border-blue-200"
                >
                  <Checkbox
                    checked={selectedIds.includes(id)}
                    onCheckedChange={() => toggleSubject(id)}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <span className="truncate text-sm font-medium text-gray-700">
                    {name}
                  </span>
                </label>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-200 mt-6">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-2 px-6 transition-all duration-200"
            >
              Цуцлах
            </Button>
          </DialogClose>

          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Хадгалах
          </Button>

          <DialogClose asChild>
            <button ref={closeRef} className="hidden" />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}